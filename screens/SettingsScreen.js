import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const SettingItem = ({ icon, title, onPress }) => (
	<TouchableOpacity
		className="flex-row items-center py-3 border-b border-gray-200"
		onPress={onPress}
	>
		<Image source={icon} className="w-6 h-6 mr-3" />
		<Text className="flex-1">{title}</Text>
		<Image
			source={require("../assets/chevron_right.png")}
			className="w-4 h-4"
		/>
	</TouchableOpacity>
);

export default function SettingsScreen() {
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
				<Text className="text-xl font-bold">Settings</Text>
				<TouchableOpacity className="ml-auto">
					<Image
						source={require("../assets/menu_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
			</View>

			<ScrollView className="flex-1 p-4">
				<SettingItem
					icon={require("../assets/Settings/account_circle.png")}
					title="Edit Profile"
					onPress={() => navigation.navigate("EditProfile")}
				/>
				<SettingItem
					icon={require("../assets/Settings/travel_explore.png")}
					title="Explore Feed"
					onPress={() => {}}
				/>
				<SettingItem
					icon={require("../assets/Settings/notifications.png")}
					title="Notifications"
					onPress={() => {}}
				/>
				<SettingItem
					icon={require("../assets/Settings/error.png")}
					title="Enquiries"
					onPress={() => {}}
				/>
				<SettingItem
					icon={require("../assets/Settings/encrypted.png")}
					title="Password & Security"
					onPress={() => {}}
				/>
				<SettingItem
					icon={require("../assets/Settings/shield_person.png")}
					title="Account Privacy"
					onPress={() => {}}
				/>
				<SettingItem
					icon={require("../assets/Settings/comment.png")}
					title="Messages"
					onPress={() => {}}
				/>
				<SettingItem
					icon={require("../assets/Settings/auto_delete.png")}
					title="Deleted Feeds"
					onPress={() => {}}
				/>
				<SettingItem
					icon={require("../assets/Settings/block.png")}
					title="Blocked Accounts"
					onPress={() => {}}
				/>
				<SettingItem
					icon={require("../assets/Settings/person_remove.png")}
					title="Deactivation & Deletion"
					onPress={() => {}}
				/>
				<SettingItem
					icon={require("../assets/Settings/workspace_premium.png")}
					title="Premium"
					onPress={() => {}}
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
				<TouchableOpacity
					className={`rounded-full p-3 ${
						route.name == "Add" ? "bg-primary " : ""
					}`}
				>
					<Image
						source={require("../assets/add_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
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
						route.name == "Setting" ? "bg-primary " : ""
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
