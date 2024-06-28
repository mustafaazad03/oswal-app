import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ScrollView,
	Switch,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const NotificationOption = ({ title, options, selectedOption, onSelect }) => (
	<View className="mb-4">
		<Text className="font-bold mb-2">{title}</Text>
		{options.map((option, index) => (
			<TouchableOpacity
				key={index}
				className="flex-row items-center mb-2"
				onPress={() => onSelect(option)}
			>
				<View
					className={`w-5 h-5 rounded-full border-2 border-primary mr-2 ${
						selectedOption === option ? "bg-primary" : ""
					}`}
				/>
				<Text>{option}</Text>
			</TouchableOpacity>
		))}
	</View>
);

export default function NotificationsSettingScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);
	const [likesOption, setLikesOption] = useState("Off");
	const [tagsOption, setTagsOption] = useState("Off");
	const [followerRequests, setFollowerRequests] = useState("On");
	const [acceptedFollowing, setAcceptedFollowing] = useState("On");
	const [accountSuggestions, setAccountSuggestions] = useState("On");
	const [notificationBySMS, setNotificationBySMS] = useState("On");

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="bg-[#FFD1DC] p-4 flex-row items-center">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/arrow_back.png")}
						className="w-6 h-6 mr-3"
					/>
				</TouchableOpacity>
				<Text className="text-xl font-bold">Notifications</Text>
				<TouchableOpacity className="ml-auto">
					<Image source={require("../assets/check.png")} className="w-6 h-6" />
				</TouchableOpacity>
			</View>

			<ScrollView className="flex-1 p-4">
				<View className="flex-row justify-between items-center mb-4">
					<Text className="font-bold">Turn off notifications</Text>
					<Switch
						value={notificationsEnabled}
						onValueChange={setNotificationsEnabled}
						trackColor={{ false: "#767577", true: "#FFD1DC" }}
						thumbColor={notificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
					/>
				</View>

				<NotificationOption
					title="Likes"
					options={["Off", "From people you follow", "From everyone"]}
					selectedOption={likesOption}
					onSelect={setLikesOption}
				/>

				<NotificationOption
					title="Tags"
					options={["Off", "From people you follow", "From everyone"]}
					selectedOption={tagsOption}
					onSelect={setTagsOption}
				/>

				<NotificationOption
					title="Follower Requests"
					options={["On", "Off"]}
					selectedOption={followerRequests}
					onSelect={setFollowerRequests}
				/>

				<NotificationOption
					title="Accepted Following Request"
					options={["On", "Off"]}
					selectedOption={acceptedFollowing}
					onSelect={setAcceptedFollowing}
				/>

				<NotificationOption
					title="Account Suggestions"
					options={["On", "Off"]}
					selectedOption={accountSuggestions}
					onSelect={setAccountSuggestions}
				/>

				<NotificationOption
					title="Notification by SMS"
					options={["On", "Off"]}
					selectedOption={notificationBySMS}
					onSelect={setNotificationBySMS}
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
						route.name == "Setting" || route.name == "NotificationSetting"
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
