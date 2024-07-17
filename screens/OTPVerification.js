import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import InputField from "../components/InputField";
import Header from "../components/Header";
import Button from "../components/Button";
import { API_URL } from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const verifyOTP = async (formData) => {
	const response = await axios.post(`${API_URL}/auth/register`, formData);
	return response.data;
};

export default function OTPVerification() {
	const navigation = useNavigation();
	const route = useRoute();
	const { email, username, password, otpData } = route.params;
	const [otp, setOtp] = useState("");
	const { signUp } = useAuth();

	const mutation = useMutation({
		mutationFn: verifyOTP,
		onSuccess: (data) => {
			if (data.statusCode === 201) {
				if (data.jwtToken === undefined || data.jwtToken === null) {
					console.error("Login Failed");
					return;
				}
				// Handle successful registration (e.g., store token, navigate to home)
				console.log("Registration successful");
				// store token
				signUp(data.jwtToken);
				navigation.navigate("PersonalDetails");
			} else {
				// Handle error (e.g., show an error message)
				console.error(data.message);
			}
		},
		onError: (error) => {
			console.error("Error verifying OTP:", error);
		},
	});

	const handleSubmit = () => {
		if (!otp && otpData !== otp) {
			return;
		}
		mutation.mutate({
			email,
			username,
			password,
		});
	};

	return (
		<SafeAreaView className="bg-white h-screen">
			<Header />
			<View className="space-y-2 mb-10 text-dark flex flex-col justify-center text-center">
				<Text className="font-bold capitalize text-base text-center">
					Verify OTP
				</Text>
				<Text className="text-xs text-center">
					Enter the OTP sent to your email.
				</Text>
			</View>
			<View className="mx-4">
				<InputField
					placeholder="Enter OTP"
					Icon={require("../assets/vpn_key.png")}
					onChange={(val) => setOtp(val.nativeEvent.text)}
					value={otp}
					keyboardType="numeric"
				/>
				<Button
					title="Verify OTP"
					onPress={handleSubmit}
					disabled={mutation.isLoading || !otp}
				/>
				<TouchableOpacity onPress={() => navigation.goBack()} className="mt-4">
					<Text className="text-center text-primary">Resend OTP</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
