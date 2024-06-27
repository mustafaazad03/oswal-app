import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ProfileScreen() {
	const navigation = useNavigation();
	const route = useRoute();

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="bg-[#FFD1DC] p-4 pt-8 flex flex-row items-center justify-between">
				<Text className="text-xl font-bold">LoremIpsum</Text>
				<TouchableOpacity className="">
					<Image
						source={require("../assets/menu_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
			</View>

			<ScrollView>
				<View className="p-4">
					<View className="flex-row items-center">
						<Image
							source={require("../assets/random2.png")}
							className="w-20 h-20 rounded-full"
						/>
						<View className="ml-4">
							<Text className="text-lg font-bold">Viraj Shah</Text>
							<Text className="text-gray-600">@imvirajshah</Text>
						</View>
					</View>

					<View className="flex-row justify-between mt-4">
						<View className="items-center">
							<Text className="font-bold">123</Text>
							<Text className="text-gray-600">followers</Text>
						</View>
						<View className="items-center">
							<Text className="font-bold">123</Text>
							<Text className="text-gray-600">following</Text>
						</View>
						<View className="items-center">
							<Text className="font-bold">5★</Text>
							<Text className="text-gray-600">rating</Text>
						</View>
					</View>

					<Text className="mt-4 text-gray-600">
						Lorem ipsum dolor sit. Repellat enim adipisci. Aliquam.
					</Text>

					<View className="flex-row mt-4">
						<TouchableOpacity className="bg-[#FFD1DC] px-4 py-2 rounded-full mr-2">
							<Text className="font-semibold">Edit Profile</Text>
						</TouchableOpacity>
						<TouchableOpacity className="border border-[#FFD1DC] px-4 py-2 rounded-full">
							<Text className="font-semibold">Share</Text>
						</TouchableOpacity>
					</View>

					<View className="mt-4">
						<Text className="font-bold">Contact business at:</Text>
						<Text className="text-gray-600">Sr. Manager</Text>
						<Text className="text-gray-600">+325 123 456 78790</Text>
						<Text className="text-gray-600">dummyemail@email.com</Text>
					</View>

					<Image
						source={require("../assets/map.png")}
						className="w-full h-40 mt-4 rounded-lg"
					/>

					<View className="mt-4">
						<Text className="font-bold mb-2">My Album</Text>
						<View className="flex-row flex-wrap gap-1">
							{[...Array(15)].map((_, index) => (
								<Image
									key={index}
									source={require("../assets/random.png")}
									className="w-[32%] h-32 p-1"
								/>
							))}
						</View>
					</View>
				</View>
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
						route.name == "Notify" ? "bg-primary " : ""
					}`}
				>
					<Image
						source={require("../assets/notify_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
