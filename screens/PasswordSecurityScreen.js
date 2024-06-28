import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PasswordSecurityScreen() {
	const navigation = useNavigation();
	const route = useRoute();

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="bg-pink-200 p-4 flex-row items-center pt-8">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/arrow_back.png")}
						className="w-6 h-6 mr-3"
					/>
				</TouchableOpacity>
				<Text className="text-xl font-bold">Password & Security</Text>
			</View>

			<View className="p-4 flex-1">
				<View className="flex-row items-center bg-pink-100 p-4 rounded-lg">
					<Image
						source={require("../assets/random2.png")}
						className="w-16 h-16 rounded-full mr-4"
					/>
					<View className="flex-1">
						<Text className="text-lg font-bold">Viraj Shah</Text>
						<Text className="text-gray-600">@iamvirajshah</Text>
					</View>
					<TouchableOpacity>
						<Image
							source={require("../assets/chevron_right.png")}
							className="w-6 h-6"
						/>
					</TouchableOpacity>
				</View>
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
						route.name == "Setting" || route.name == "PasswordSecurity"
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
