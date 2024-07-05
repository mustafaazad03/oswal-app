import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const BlockedAccount = ({ name, username, avatarUrl, onUnblock }) => {
	return (
		<View className="flex-row items-center justify-between py-4 px-4">
			<View className="flex-row items-center">
				<Image source={avatarUrl} className="w-12 h-12 rounded-full mr-3" />
				<View>
					<Text className="font-bold text-base">{name}</Text>
					<Text className="text-gray-600">@{username}</Text>
				</View>
			</View>
			<TouchableOpacity
				onPress={onUnblock}
				className="bg-white border border-gray-300 rounded-xl px-4 py-2"
			>
				<Text className="text-black font-semibold">Unblock</Text>
			</TouchableOpacity>
		</View>
	);
};

export default BlockedAccount;
