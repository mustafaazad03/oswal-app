import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	Modal,
	FlatList,
	Alert,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { postService } from "../api/feed";
import { useAuth } from "../context/AuthContext";

const CreateFeedScreen = () => {
	const navigation = useNavigation();
	const [image, setImage] = useState(null);
	const [feedText, setFeedText] = useState("");
	const [isRefineModalVisible, setIsRefineModalVisible] = useState(false);
	const [selectedTags, setSelectedTags] = useState([]);
	const { user } = useAuth();

	const tags = [
		"Nature",
		"Travel",
		"Food",
		"Fashion",
		"Technology",
		"Art",
		"Music",
		"Sports",
		"Lifestyle",
		"Fitness",
		"Books",
		"Movies",
		"Photography",
		"Business",
		"Education",
	];

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const toggleTag = (tag) => {
		setSelectedTags((prevTags) =>
			prevTags.includes(tag)
				? prevTags.filter((t) => t !== tag)
				: [...prevTags, tag]
		);
	};

	const renderTagItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => toggleTag(item)}
			className={`m-1 p-2 rounded-full ${
				selectedTags.includes(item) ? "bg-primary" : "bg-gray-200"
			}`}
		>
			<Text
				className={selectedTags.includes(item) ? "text-dark" : "text-dark/90"}
			>
				{item}
			</Text>
		</TouchableOpacity>
	);

	const createPostMutation = useMutation({
		mutationFn: (postData) => postService.createPost(postData),
		onSuccess: () => {
			// Handle successful post creation
			Alert.alert("Success", "Post created successfully");
			navigation.navigate("Home");
		},
		onError: (error) => {
			console.error("Error creating post:", error);
			Alert.alert("Error", "Failed to create post");
		},
	});

	const handleSubmitPost = () => {
		if (!image) {
			Alert.alert("Error", "Please select an image");
			return;
		}

		const postData = {
			user: user?.userId,
			imageUrl: image,
			caption: feedText,
			tags: selectedTags,
		};

		createPostMutation.mutate(postData);
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-row items-center  bg-primary p-4 border-b border-gray-200">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name="arrow-back" size={24} color="black" />
				</TouchableOpacity>
				<Text className="text-lg font-semibold ml-4">Create Feed</Text>
			</View>

			<ScrollView className="flex-1 p-4">
				<TouchableOpacity
					onPress={pickImage}
					className="w-full aspect-square bg-primary/50 items-center justify-center mb-4"
				>
					{image ? (
						<Image source={{ uri: image }} className="w-full h-full" />
					) : (
						<Text className="text-gray-500">Tap to select an image</Text>
					)}
				</TouchableOpacity>

				<TextInput
					className="bg-white p-3 rounded-md mb-4"
					placeholder="Write something about your feed"
					multiline
					numberOfLines={4}
					value={feedText}
					onChangeText={setFeedText}
				/>

				<TouchableOpacity
					onPress={() => setIsRefineModalVisible(true)}
					className="flex-row justify-between items-center border border-primary bg-white p-4 rounded-lg mb-4"
				>
					<Text className="font-medium">Refine Feed</Text>
					<Ionicons name="chevron-forward" size={20} color="black" />
				</TouchableOpacity>

				<TouchableOpacity
					className="bg-primary p-4 rounded-md items-center"
					onPress={handleSubmitPost}
					disabled={createPostMutation.isLoading}
				>
					<Text className="text-dark font-semibold">
						{createPostMutation.isLoading ? "Creating Post..." : "Create Post"}{" "}
						{createPostMutation.isLoading && (
							<ActivityIndicator
								size="large"
								color="#FFD1DC"
								style={{ marginTop: 20 }}
							/>
						)}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity className="border border-primary p-4 rounded-md items-center mt-4">
					<Text className="text-dark font-semibold">Buy Premium</Text>
				</TouchableOpacity>
			</ScrollView>

			<Modal
				animationType="slide"
				transparent={true}
				visible={isRefineModalVisible}
				onRequestClose={() => setIsRefineModalVisible(false)}
			>
				<View className="flex-1 justify-end">
					<View className="bg-white rounded-t-3xl p-6 h-3/4">
						<View className="flex-row justify-between items-center mb-4">
							<Text className="text-xl font-bold">Refine Your Feed</Text>
							<TouchableOpacity onPress={() => setIsRefineModalVisible(false)}>
								<Ionicons name="close" size={24} color="black" />
							</TouchableOpacity>
						</View>
						<Text className="mb-4">Select tags to refine your feed:</Text>
						<FlatList
							data={tags}
							renderItem={renderTagItem}
							keyExtractor={(item) => item}
							numColumns={3}
							className="mb-4"
						/>
						<TouchableOpacity
							onPress={() => setIsRefineModalVisible(false)}
							className="bg-primary p-4 rounded-md items-center"
						>
							<Text className="text-dark font-semibold">Apply Refinements</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default CreateFeedScreen;
