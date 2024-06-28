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

const DeletedFeedItem = () => (
	<View className="w-[48%] aspect-square bg-[#FFF1F1] rounded-lg mb-4" />
);

export default function DeletedFeedsScreen() {
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
				<Text className="text-xl font-bold">Deleted Feeds</Text>
			</View>

			<ScrollView className="flex-1 p-4">
				<Text className="text-sm mb-4">
					Deleted feed items will be permanently deleted after 60 days in the
					deleted bin.
				</Text>
				<View className="flex-row flex-wrap justify-between">
					{[...Array(6)].map((_, index) => (
						<DeletedFeedItem key={index} />
					))}
				</View>
			</ScrollView>

			{/* Bottom Navigation */}
			<View className="flex-row justify-around items-center p-4 py-2 border-t border-gray-300 bg-[#FCF2F4]">
				<TouchableOpacity
					className={`rounded-full p-3 ${
						route.name === "Home" ? "bg-primary" : ""
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
						route.name === "Search" ? "bg-primary" : ""
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
						route.name === "Add" ? "bg-primary" : ""
					}`}
				>
					<Image
						source={require("../assets/add_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					className={`rounded-full p-3 ${
						route.name === "Info" ? "bg-primary" : ""
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
						route.name === "Setting" || route.name === "DeletedFeed"
							? "bg-primary"
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
