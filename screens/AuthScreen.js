import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export default function AuthScreen() {
	const navigation = useNavigation();
	return (
		<SafeAreaView className=" bg-white h-screen px-4">
			<Header />
			<TouchableOpacity
				className=" p-3 bg-primary rounded-lg mt-6"
				onPress={() => navigation.navigate("Login")}
			>
				<Text className=" text-dark text-center font-bold text-base">
					Log in
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className=" p-3 bg-white border border-primary rounded-lg mt-6"
				onPress={() => navigation.navigate("Register")}
			>
				<Text className=" text-dark text-center font-bold text-base">
					Sign Up
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
