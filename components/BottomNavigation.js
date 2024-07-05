import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import ExpandableButton from "./ExtendeblePlusButton";

export default function BottomNavigation({ notify }) {
	const navigation = useNavigation();
	const route = useRoute();
	return (
		<View className="flex-row justify-around items-center p-4 py-2 border-t border-gray-300 bg-[#FCF2F4]">
			<TouchableOpacity
				className={`rounded-full p-3 z-40 ${
					route.name == "Home" ? "bg-primary " : ""
				}`}
				onPress={() => navigation.navigate("Home")}
			>
				<Image
					source={require("../assets/home_icon.png")}
					className={`w-6 h-6`}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				className={`rounded-full p-3 z-40 ${
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
					navigation.navigate("CreateFeed");
				}}
				onUploadPDF={() => {
					// Handle Upload PDF
					navigation.navigate("EnquirySetting");
				}}
			/>
			{/* Info  */}
			<TouchableOpacity
				className={`rounded-full p-3 z-40 ${
					route.name == "Info" ? "bg-primary " : ""
				}`}
				onPress={() => navigation.navigate("Info")}
			>
				<Image
					source={require("../assets/info_icon.png")}
					className="w-6 h-6"
				/>
			</TouchableOpacity>
			{notify ? (
				<TouchableOpacity
					className={`rounded-full p-3 ${
						route.name == "Notify" ? "bg-primary " : ""
					}`}
				>
					<Image
						source={require("../assets/notify_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					className={`rounded-full p-3 z-40 ${
						route.name == "Setting" ||
						route.name == "EditProfile" ||
						route.name == "AccountPrivacy" ||
						route.name === "DeactivationDeletion" ||
						route.name == "EnquiriesSetting" ||
						route.name == "NotificationSetting" ||
						route.name == "PasswordSecurity"
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
			)}
		</View>
	);
}
