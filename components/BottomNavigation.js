import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import ExpandableButton from "./ExtendeblePlusButton";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
export default function BottomNavigation({ notify }) {
	const navigation = useNavigation();
	const route = useRoute();
	const { colorScheme } = useColorScheme();
	return (
		<View className="flex-row justify-around items-center p-4 py-2 border-t border-gray-300 bg-[#FCF2F4] dark:bg-[#040D12]">
			<TouchableOpacity
				className={`rounded-full p-3 z-40 ${
					route.name == "Home" ? "bg-primary " : ""
				}`}
				onPress={() => navigation.navigate("Home")}
			>
				<Octicons
					name="home"
					size={18}
					color={
						colorScheme === "dark"
							? route.name == "Home"
								? "black"
								: "white"
							: "black"
					}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				className={`rounded-full p-3 z-40 ${
					route.name == "Search" ? "bg-primary " : ""
				}`}
				onPress={() => navigation.navigate("Search")}
			>
				<Ionicons
					name="search"
					size={18}
					color={
						colorScheme === "dark"
							? route.name == "Search"
								? "black"
								: "white"
							: "black"
					}
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
				<Feather
					name="info"
					size={18}
					color={
						colorScheme === "dark"
							? route.name == "Info"
								? "black"
								: "white"
							: "black"
					}
				/>
			</TouchableOpacity>
			{notify ? (
				<TouchableOpacity
					className={`rounded-full p-3 ${
						route.name == "NotificationUser" ? "bg-primary " : ""
					}`}
					onPress={() => navigation.navigate("NotificationUser")}
				>
					<MaterialIcons
						name="notifications-none"
						size={18}
						color={
							colorScheme === "dark"
								? route.name == "NotificationUser"
									? "black"
									: "white"
								: "black"
						}
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
						route.name == "ExploreSetting" ||
						route.name == "NotificationSetting" ||
						route.name == "PasswordSecurity"
							? "bg-primary "
							: ""
					}`}
					onPress={() => navigation.navigate("Setting")}
				>
					<Octicons
						name="person"
						size={18}
						color={
							colorScheme === "dark"
								? route.name == "Setting" ||
								  route.name == "EditProfile" ||
								  route.name == "AccountPrivacy" ||
								  route.name === "DeactivationDeletion" ||
								  route.name == "EnquiriesSetting" ||
								  route.name == "ExploreSetting" ||
								  route.name == "NotificationSetting" ||
								  route.name == "PasswordSecurity"
									? "black"
									: "white"
								: "black"
						}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
}
