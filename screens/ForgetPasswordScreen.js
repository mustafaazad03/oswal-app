import React, { useState } from "react";
import { Text, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { authService } from "../api/settings";

export default function ForgetPasswordScreen() {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [useEmail, setUseEmail] = useState(true);

	const forgetPasswordMutation = useMutation({
		mutationFn: (data) => authService.forgetPassword(data),
		onSuccess: () => {
			Alert.alert("Success", "OTP sent successfully");
			navigation.navigate("OTPVerification", {
				email: useEmail ? email : phoneNumber,
			});
		},
		onError: (error) => {
			Alert.alert("Error", error.message || "Failed to send OTP");
		},
	});

	const handleSubmit = () => {
		if (useEmail && !email) {
			Alert.alert("Error", "Please enter your email");
			return;
		}
		if (!useEmail && !phoneNumber) {
			Alert.alert("Error", "Please enter your phone number");
			return;
		}

		forgetPasswordMutation.mutate(useEmail ? { email } : { phoneNumber });
	};

	return (
		<SafeAreaView className="flex-1 bg-white p-4">
			<Text className="text-2xl font-bold mb-4">Forget Password</Text>
			<Text className="text-sm text-gray-500 mb-4">
				Enter your {useEmail ? "email" : "phone number"} to receive an OTP
			</Text>

			{useEmail ? (
				<InputField
					placeholder="Enter your email"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
				/>
			) : (
				<InputField
					placeholder="Enter your phone number"
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					keyboardType="phone-pad"
				/>
			)}

			<TouchableOpacity
				className="mt-2 mb-4"
				onPress={() => setUseEmail(!useEmail)}
			>
				<Text className="text-primary">
					Use {useEmail ? "phone number" : "email"} instead
				</Text>
			</TouchableOpacity>

			<Button
				title={forgetPasswordMutation.isLoading ? "Sending OTP..." : "Send OTP"}
				onPress={handleSubmit}
				disabled={forgetPasswordMutation.isLoading}
			/>
		</SafeAreaView>
	);
}
