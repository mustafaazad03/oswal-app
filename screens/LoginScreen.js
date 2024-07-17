import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
	const navigation = useNavigation();
	const { login: userLogin } = useAuth();
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const mutation = useMutation({
		mutationFn: login,
		onSuccess: async (data) => {
			if (data.jwtToken === undefined || data.jwtToken === null) {
				console.error("Login Failed");
				return;
			}
			userLogin(data.jwtToken);
		},
		onError: (error) => {
			console.error("Error submitting form:", error);
			// Handle login error (e.g., show an error message)
		},
	});

	const handleSubmit = () => {
		mutation.mutate({
			email: data.email,
			password: data.password,
		});
	};

	return (
		<SafeAreaView className=" bg-white h-screen ">
			{/* Back Icon */}
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				className="absolute top-12 left-5 z-50"
			>
				<Image
					source={require("../assets/arrow_back.png")}
					className="w-6 h-6"
				/>
			</TouchableOpacity>
			<Header />
			<View className="space-y-2 mb-6 text-dark flex flex-col justify-center text-center">
				<Text className="font-bold capitalize text-base text-center">
					Log in
				</Text>
				<Text className="text-xs text-center">
					Log In to start using the app.
				</Text>
			</View>
			<View className="mx-4">
				<InputField
					placeholder="Log in with E-mail/Mobile"
					Icon={require("../assets/passkey.png")}
					onChange={(val) =>
						setData({
							...data,
							email: val.nativeEvent.text,
						})
					}
					value={data.email}
					keyboardType="email-address"
				/>
				<InputField
					placeholder="Enter Password"
					Icon={require("../assets/vpn_key.png")}
					onChange={(val) =>
						setData({
							...data,
							password: val.nativeEvent.text,
						})
					}
					value={data.password}
					keyboardType="default"
				/>
				{/* Forget Password */}
				<View className="flex items-start justify-end mt-2">
					<TouchableOpacity
						onPress={() => navigation.navigate("ForgotPassword")}
					>
						<Text className="text-xs text-gray-500">Forget Password?</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					className=" p-3 bg-primary rounded-lg mt-6"
					onPress={handleSubmit}
					disabled={mutation.isLoading || !data.email || !data.password}
				>
					<Text className=" text-dark text-center font-bold text-base">
						Log in
					</Text>
				</TouchableOpacity>
				<View className=" mt-3 mx-3 flex-row items-center space-x-2 justify-center">
					<Text className=" text-grayish text-xs">Don’t have an account ?</Text>
					<TouchableOpacity onPress={() => navigation.navigate("Register")}>
						<Text className=" text-grayish text-xs">Sign up</Text>
					</TouchableOpacity>
				</View>
				<View className="flex items-center space-x-3 flex-row justify-center my-6">
					<View className="w-2/5 h-0.5 bg-gray-400"></View>
					<Text className="text-gray-400 mx-2">Or</Text>
					<View className="w-2/5 h-0.5 bg-gray-400"></View>
				</View>
				<View className=" flex items-center">
					<View className="flex-row items-center space-x-3">
						<TouchableOpacity className="w-full flex flex-row items-center p-4 bg-primary rounded-lg mb-4">
							<Image
								source={require("../assets/Logo/google-9646e5e7.png")}
								className="w-6 h-6"
							/>
							<Text className=" text-dark font-bold text-sm w-11/12 text-center">
								Log in with Google
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
