import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Button({ onPress, title }) {
	return (
		<TouchableOpacity
			className=" p-3 bg-primary rounded-lg my-6"
			onPress={onPress}
		>
			<Text className=" text-dark text-center font-bold text-base">
				{title}
			</Text>
		</TouchableOpacity>
	);
}
