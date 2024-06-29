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

			<View className="flex-row justify-around items-center p-4 py-2 border-t border-gray-300 bg-[#FCF2F4]">
				<TouchableOpacity
					className={`rounded-full p-3 ${
						route.name == "Home" ? "bg-primary " : ""
					}`}
					onPress={() => navigation.navigate("Home")}
				>
					<Image
						source={require("../assets/home_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					className={`rounded-full p-3 ${
						route.name == "Search" ? "bg-primary " : ""
					}`}
					onPress={() => navigation.navigate("Search")}
				>
					<Image
						source={require("../assets/search_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
				<ExpandableButton
					onRaiseEnquiry={() => {
						// Handle Raise Enquiry
						navigation.navigate("RaiseEnquiry");
					}}
					onUploadMedia={() => {
						// Handle Upload Media
						navigation.navigate("UploadMedia");
					}}
					onUploadPDF={() => {
						// Handle Upload PDF
						navigation.navigate("EnquirySetting");
					}}
				/>
				<TouchableOpacity
					className={`rounded-full p-3 ${
						route.name == "Info" ? "bg-primary " : ""
					}`}
					onPress={() => navigation.navigate("Info")}
				>
					<Image
						source={require("../assets/info_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					className={`rounded-full p-3 ${
						route.name == "Setting" || route.name == "AccountPrivacy"
							? "bg-primary "
							: ""
					}`}
					onPress={() => navigation.navigate("Setting")}
				>
					<Image
						source={require("../assets/user_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
