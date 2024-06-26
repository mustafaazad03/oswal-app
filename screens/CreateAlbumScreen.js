import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";

export default function CreateAlbumScreen() {
	const navigation = useNavigation();
	const [selectedImages, setSelectedImages] = useState([]);

	const handleImagePicker = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [1, 1],
			quality: 1,
			allowsMultipleSelection: true,
			selectionLimit: 10,
		});

		if (!result.canceled) {
			const newImages = result.assets.map((asset) => asset.uri);
			setSelectedImages([...selectedImages, ...newImages].slice(0, 10));
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-white h-screen">
			<TouchableOpacity
				className="absolute top-10 left-4 z-50"
				onPress={() => navigation.goBack()}
			>
				<Image
					source={require("../assets/arrow_back.png")}
					className="w-6 h-6"
				/>
			</TouchableOpacity>

			<ScrollView className="mt-16 w-full p-4">
				<Text className="text-2xl font-bold mb-2">Create Album</Text>
				<Text className="text-sm text-gray-500 mb-4">
					You can upload up to 10 photos/videos.
				</Text>

				<View className="flex-row flex-wrap justify-between h-[80vh]">
					{[...Array(10)].map((_, index) => (
						<TouchableOpacity
							key={index}
							className="w-[45%] h-fit aspect-square mb-4 border-2 border-primary rounded-lg flex items-center justify-center"
							onPress={handleImagePicker}
						>
							{selectedImages[index] ? (
								<Image
									source={{ uri: selectedImages[index] }}
									className="w-full h-full rounded-lg"
								/>
							) : (
								<Image
									source={require("../assets/upload.png")}
									className="w-12 h-12"
								/>
							)}
						</TouchableOpacity>
					))}
				</View>
				<Button title="Next" onPress={() => navigation.navigate("Home")} />
			</ScrollView>
		</SafeAreaView>
	);
}
