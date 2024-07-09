import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNavigation from "../components/BottomNavigation";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/user";

export default function PasswordSecurityScreen() {
	const navigation = useNavigation();
	const { user } = useAuth();

	const {
		data: userData,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["user", user?.username],
		queryFn: () => userService.getSingleUser(user?.userId),
		enabled: !!user,
	});

	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 bg-white justify-center items-center">
				<ActivityIndicator size="large" color="#FFD1DC" />
			</SafeAreaView>
		);
	}

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
						source={{ uri: userData?.profilePic }}
						className="w-16 h-16 rounded-full mr-4"
					/>
					<View className="flex-1">
						<Text className="text-lg font-bold">{userData?.name}</Text>
						<Text className="text-gray-600">@{userData?.username}</Text>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("ChangePassword")}
					>
						<Image
							source={require("../assets/chevron_right.png")}
							className="w-6 h-6"
						/>
					</TouchableOpacity>
				</View>
			</View>

			<BottomNavigation notify={false} />
		</SafeAreaView>
	);
}
