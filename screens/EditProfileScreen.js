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
import BottomNavigation from "../components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Entypo } from "@expo/vector-icons";

const EditProfileItem = ({ title, onPress, colorScheme }) => (
	<TouchableOpacity
		className="flex-row items-center justify-between py-4 border-b border-gray-200"
		onPress={onPress}
	>
		<Text className="dark:text-white">{title}</Text>
		<Entypo
			name="chevron-right"
			size={16}
			color={
				colorScheme === "dark"
					? "white"
					: colorScheme === "dark"
					? "white"
					: "black"
			}
		/>
	</TouchableOpacity>
);

export default function EditProfileScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const { colorScheme } = useColorScheme();

	return (
		<SafeAreaView className="flex-1 bg-white dark:bg-[#222831]">
			<View className="bg-[#FFD1DC] p-4 flex-row items-center pt-8">
				<View className="flex flex-row space-x-2 justify-center items-center">
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Ionicons name="arrow-back" size={20} color="black" />
					</TouchableOpacity>
					<Text className="text-xl font-bold">Edit Profile</Text>
				</View>
			</View>

			<ScrollView className="flex-1 p-4">
				<EditProfileItem
					title="Personal Details"
					onPress={() => {
						navigation.navigate("PersonalDetailSetting");
					}}
					colorScheme={colorScheme}
				/>
				<EditProfileItem
					title="Business Details"
					onPress={() => {
						navigation.navigate("BusinessDetailSetting");
					}}
					colorScheme={colorScheme}
				/>
				<EditProfileItem
					title="Contact Details"
					onPress={() => {
						navigation.navigate("ContactDetailSetting");
					}}
					colorScheme={colorScheme}
				/>
				<EditProfileItem
					title="My Album"
					onPress={() => {
						navigation.navigate("MyAlbum");
					}}
					colorScheme={colorScheme}
				/>
			</ScrollView>

			{/* Bottom Navigation */}
			{/* <BottomNavigation notify={false} /> */}
		</SafeAreaView>
	);
}
