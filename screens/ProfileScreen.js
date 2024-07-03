import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome6, Entypo } from "@expo/vector-icons";
import BottomNavigation from "../components/BottomNavigation";
import CarouselComponent from "../components/Carousel";
import ReviewTab from "../components/ReviewTab";
import BottomModal from "../components/BottomModal";
import ProfileTabs from "../components/ProfileTabs";

export default function ProfileScreen() {
	const navigation = useNavigation();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const toggleModal = () => setIsModalVisible(!isModalVisible);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-row justify-between items-center p-4 bg-primary pt-8">
				<Image source={require("../assets/icon.png")} className="w-10 h-10" />
				<Text className="text-lg font-bold">Freathers</Text>
				<TouchableOpacity onPress={() => navigation.navigate("Setting")}>
					<Image
						source={require("../assets/menu_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
			</View>
			<ScrollView>
				<CarouselComponent />
				<View className="p-4">
					{/* Profile information */}
					<View className="flex-row items-center space-x-4">
						<Image
							source={require("../assets/random2.png")}
							className="w-20 h-20 rounded-full"
						/>
						<View className="flex flex-row justify-evenly items-center space-x-5 flex-1">
							<View className="items-center">
								<Text className="font-bold text-2xl">123</Text>
								<Text className="text-gray-600">followers</Text>
							</View>
							<View className="items-center">
								<Text className="font-bold text-2xl">123</Text>
								<Text className="text-gray-600">following</Text>
							</View>
							<View className="items-center">
								<Text className="font-bold text-2xl">5★</Text>
								<Text className="text-gray-600">rating</Text>
							</View>
						</View>
					</View>

					<View className="flex-col justify-between mt-2">
						<Text className="text-lg font-bold">Viraj Shah</Text>
						<Text className="text-gray-600">@imvirajshah</Text>
					</View>

					<Text className="mt-4 text-gray-600">
						Lorem ipsum dolor sit. Repellat enim adipisci. Aliquam.
					</Text>

					<View className="mt-4 flex-1 flex flex-row justify-center items-center space-x-2">
						<TouchableOpacity className="bg-[#FFD1DC] px-4 py-2 rounded-xl flex-1">
							<Text className="font-semibold text-base text-center">
								Edit Profile
							</Text>
						</TouchableOpacity>
						<TouchableOpacity className="border border-black px-4 py-2 rounded-xl flex-1">
							<Text className="font-semibold text-base text-center">Share</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="border border-[#FFD1DC] px-2 py-2 rounded-xl"
							onPress={toggleModal}
						>
							<Text className="font-semibold">
								<Entypo name="dots-three-vertical" size={18} color="black" />
							</Text>
						</TouchableOpacity>
					</View>

					{/* Contact information */}
					<View className="mt-4 bg-[#FFD1DC]/60 p-4 flex flex-col space-y-3 rounded-lg">
						<Text className="font-bold text-base">Contact business at:</Text>
						<View className="text-gray-800 flex flex-row justify-start items-center space-x-2">
							<Ionicons name="person-sharp" size={18} color="black" />
							<Text className="text-sm">Sr. Manager</Text>
						</View>
						<View className="text-gray-800 flex flex-row justify-start items-center space-x-2">
							<FontAwesome6 name="ranking-star" size={18} color="black" />
							<Text className="text-sm"> Sr. Manager</Text>
						</View>
						<View className="text-gray-800 flex flex-row justify-start items-center space-x-2">
							<Entypo name="phone" size={18} color="black" />
							<Text className="text-sm">+325 123 456 78790</Text>
						</View>
						<View className="text-gray-800 flex flex-row justify-start items-center space-x-2">
							<Entypo name="mail" size={18} color="black" />
							<Text className="text-sm"> dummyemail@email.com</Text>
						</View>
					</View>

					<Image
						source={require("../assets/map.png")}
						className="w-full h-40 mt-4 rounded-lg"
					/>

					<ProfileTabs />
				</View>
			</ScrollView>
			<BottomNavigation notify={true} />
			<BottomModal isVisible={isModalVisible} onClose={toggleModal} />
		</SafeAreaView>
	);
}
