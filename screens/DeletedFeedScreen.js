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
import DeleteFeedModal from "../components/DeletedFeedModal";

const DeletedFeedItem = ({ item, onPress }) => (
	<TouchableOpacity
		className="w-[48%] aspect-square rounded-lg mb-4 overflow-hidden"
		onPress={() => onPress(item)}
	>
		<Image source={item.image} className="w-full h-full" resizeMode="cover" />
	</TouchableOpacity>
);

export default function DeletedFeedsScreen() {
	const navigation = useNavigation();
	const route = useRoute();

	// Sample data array
	const deletedFeedsData = [
		{ id: 1, image: require("../assets/random.png"), daysLeft: 30 },
		{ id: 2, image: require("../assets/random.png"), daysLeft: 45 },
		{ id: 3, image: require("../assets/random.png"), daysLeft: 20 },
		{ id: 4, image: require("../assets/random.png"), daysLeft: 55 },
		{ id: 5, image: require("../assets/random.png"), daysLeft: 15 },
		{ id: 6, image: require("../assets/random.png"), daysLeft: 40 },
	];

	const [isModalVisible, setModalVisible] = React.useState(false);

	const openDeletedScreenModal = (item) => {
		setModalVisible(true);
	};

	return (
		<>
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
						{deletedFeedsData.map((item) => (
							<DeletedFeedItem
								key={item.id}
								item={item}
								onPress={openDeletedScreenModal}
							/>
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
			<DeleteFeedModal
				isVisible={isModalVisible}
				onClose={() => setModalVisible(false)}
				onDelete={() => {
					// Handle delete logic
					setModalVisible(false);
				}}
				onRestore={() => {
					// Handle restore logic
					setModalVisible(false);
				}}
			/>
		</>
	);
}
