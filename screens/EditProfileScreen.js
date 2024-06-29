import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import ExpandableButton from "../components/ExtendeblePlusButton";

const EditProfileItem = ({ title, onPress }) => (
	<TouchableOpacity
		className="flex-row items-center justify-between py-4 border-b border-gray-200"
		onPress={onPress}
	>
		<Text>{title}</Text>
		<Image
			source={require("../assets/chevron_right.png")}
			className="w-4 h-4"
		/>
	</TouchableOpacity>
);

export default function EditProfileScreen() {
	const navigation = useNavigation();
	const route = useRoute();

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="bg-[#FFD1DC] p-4 flex-row items-center pt-8">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/arrow_back.png")}
						className="w-6 h-6 mr-3"
					/>
				</TouchableOpacity>
				<Text className="text-xl font-bold">Edit Profile</Text>
			</View>

			<ScrollView className="flex-1 p-4">
				<EditProfileItem
					title="Personal Details"
					onPress={() => {
						navigation.navigate("PersonalDetailSetting");
					}}
				/>
				<EditProfileItem
					title="Business Details"
					onPress={() => {
						navigation.navigate("BusinessDetailSetting");
					}}
				/>
				<EditProfileItem
					title="Contact Details"
					onPress={() => {
						navigation.navigate("ContactDetailSetting");
					}}
				/>
				<EditProfileItem
					title="My Album"
					onPress={() => {
						navigation.navigate("MyAlbum");
					}}
				/>
			</ScrollView>

			{/* Bottom Navigation */}
			<View className="flex-row justify-around items-center p-4 py-2 border-t border-gray-300 bg-[#FCF2F4]">
				<TouchableOpacity
					className={`rounded-full p-3 ${
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
				{/* Info  */}
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
						route.name == "Setting" || route.name == "EditProfile"
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
