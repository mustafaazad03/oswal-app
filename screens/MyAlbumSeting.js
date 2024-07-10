import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ScrollView,
	Alert,
	ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../api/user";

export default function MyAlbumScreen() {
	const navigation = useNavigation();
	const { user: authUser } = useAuth();
	const [selectedImages, setSelectedImages] = useState(
		authUser?.album?.map((item) => item.url) || []
	);

	const updateUserMutation = useMutation({
		mutationFn: (updateData) =>
			userService.updateUser(authUser?.userId, updateData),
		onSuccess: () => {
			Alert.alert("Success", "Album updated successfully");
			navigation.goBack();
		},
		onError: (error) => {
			console.error("Error updating user:", error);
			Alert.alert("Error", "Failed to update album");
		},
	});

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
			setSelectedImages((prevImages) =>
				[...prevImages, ...newImages].slice(0, 10)
			);
		}
	};

	const handleSubmit = async () => {
		const albumData = selectedImages.map((imageUrl, index) => ({
			url: imageUrl,
			title: `Image ${index + 1}`,
		}));

		const updateData = {
			album: albumData,
		};

		updateUserMutation.mutate(updateData);
	};

	return (
		<SafeAreaView className="flex-1 bg-white h-screen">
			<View className="bg-[#FFD1DC] p-4 flex-row items-center pt-8">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/arrow_back.png")}
						className="w-6 h-6 mr-3"
					/>
				</TouchableOpacity>
				<Text className="text-xl font-bold">My Album</Text>
				<TouchableOpacity
					className="ml-auto"
					onPress={handleSubmit}
					disabled={updateUserMutation.isLoading}
				>
					<Image source={require("../assets/check.png")} className="w-6 h-6" />{" "}
					{updateUserMutation.isLoading && (
						<ActivityIndicator
							size="large"
							color="#FFD1DC"
							style={{ marginTop: 20 }}
						/>
					)}
				</TouchableOpacity>
			</View>

			<ScrollView className=" w-full p-4">
				<Text className="text-2xl font-bold mb-2">Create Album</Text>
				<Text className="text-sm text-gray-500 mb-4">
					You can upload up to 10 photos/videos.
				</Text>

				<View className="flex-row flex-wrap justify-between h-[80vh]">
					{[...Array(10)].map((_, index) => (
						<TouchableOpacity
							key={index}
							className="w-[45%] h-fit aspect-square mb-4 border-2 border-primary rounded-lg flex items-center justify-center relative"
							onPress={selectedImages[index] ? null : handleImagePicker}
						>
							{selectedImages[index] ? (
								<>
									<Image
										source={{ uri: selectedImages[index] }}
										className="w-full h-full rounded-lg"
									/>
									<TouchableOpacity
										className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
										onPress={() => {
											setSelectedImages((prevImages) =>
												prevImages.filter((_, i) => i !== index)
											);
										}}
									>
										<Text className="text-white">X</Text>
									</TouchableOpacity>
								</>
							) : (
								<Image
									source={require("../assets/upload.png")}
									className="w-12 h-12"
								/>
							)}
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
