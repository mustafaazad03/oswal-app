import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/InputField";
import Header from "../components/Header";

export default function CreateAccount() {
	const navigation = useNavigation();
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	return (
		<SafeAreaView className=" bg-white h-screen ">
			<Header />
			<View className="space-y-2 mb-6 text-dark flex flex-col justify-center text-center">
				<Text className="font-bold capitalize text-base text-center">
					sign up
				</Text>
				<Text className="text-xs text-center">
					Sign up to start using the app.
				</Text>
			</View>
			<View className="mx-4">
				<InputField
					placeholder="Sign up with E-mail/Mobile"
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
				<Text className=" text-xs text-gray-500 mt-2 w-full text-justify">
					Password must be at least{" "}
					<Text className="font-medium">8 Characters</Text> and must contain at
					least a <Text className="font-medium">Capital Letter</Text>, a{" "}
					<Text className="font-medium">Number</Text> and a{" "}
					<Text className="font-medium">Special Character</Text>.
				</Text>
				<TouchableOpacity className=" p-3 bg-primary rounded-lg mt-6">
					<Text className=" text-dark text-center font-bold text-base">
						Sign up
					</Text>
				</TouchableOpacity>
				<View className=" mt-3 mx-3 flex-row items-center space-x-2 justify-center">
					<Text className=" text-grayish text-xs">
						Already have an account?
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate("Login")}>
						<Text className=" text-grayish text-xs">Login</Text>
					</TouchableOpacity>
				</View>
				<View className="flex items-center space-x-3 flex-row justify-center my-6">
					<View className="w-2/5 h-0.5 bg-gray-400"></View>
					<Text className="text-gray-400 mx-2">Or</Text>
					<View className="w-2/5 h-0.5 bg-gray-400"></View>
				</View>
				<View className=" flex items-center">
					<View className="flex-row items-center space-x-3">
						<TouchableOpacity className="w-full flex flex-row items-center p-4 bg-primary rounded-lg">
							<Image
								source={require("../assets/Logo/google-9646e5e7.png")}
								className="w-6 h-6"
							/>
							<Text className=" text-dark font-bold text-sm w-11/12 text-center">
								Sign up with Google
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
