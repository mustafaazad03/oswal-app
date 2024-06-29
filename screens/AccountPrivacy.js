import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	Switch,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ExpandableButton from "../components/ExtendeblePlusButton";
import BottomNavigation from "../components/BottomNavigation";

export default function AccountPrivacyScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const [isLocked, setIsLocked] = useState(false);

	const toggleLock = () => setIsLocked((previousState) => !previousState);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="bg-pink-200 p-4 flex-row items-center pt-8">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/arrow_back.png")}
						className="w-6 h-6 mr-3"
					/>
				</TouchableOpacity>
				<Text className="text-xl font-bold">Account Privacy</Text>
			</View>

			<View className="p-4 flex-1">
				<View className="flex-row justify-between items-center mb-4">
					<Text className="text-lg font-bold">Lock Account</Text>
					<Switch
						trackColor={{ false: "#767577", true: "#EEC0C8" }}
						thumbColor={isLocked ? "#EEB0C0" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggleLock}
						value={isLocked}
					/>
				</View>
				<Text className="text-gray-600">
					When your account is locked, only the followers that you approve can
					see what you share, including your album and feed, and your followers
					& following lists.
				</Text>
			</View>

			<BottomNavigation notify={false} />
		</SafeAreaView>
	);
}
