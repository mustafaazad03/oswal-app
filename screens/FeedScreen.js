import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	FlatList,
	ActivityIndicator,
	RefreshControl,
	Alert,
	Linking,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FilterComponent from "../components/FilterComponent";
import BottomNavigation from "../components/BottomNavigation";
import { postService } from "../api/feed";
import { useAuth } from "../context/AuthContext";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export default function FeedScreen() {
	const navigation = useNavigation();
	const queryClient = useQueryClient();
	// get user from context
	const { user } = useAuth();
	const [likedPosts, setLikedPosts] = useState(new Set());

	const {
		data: posts,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: postService.getAllFeed,
	});

	useEffect(() => {
		if (user && posts) {
			const likedPostIds = posts
				.filter((post) =>
					post.likes.some((like) => like.username === user.username)
				)
				.map((post) => post._id);
			setLikedPosts(new Set(likedPostIds));
		}
	}, [posts, user]);

	const likeMutation = useMutation({
		mutationFn: ({ postId, username }) =>
			postService.likePost(postId, username),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"]);
		},
	});

	const dislikeMutation = useMutation({
		mutationFn: ({ postId, username }) =>
			postService.unlikePost(postId, username),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"]);
		},
	});

	const handleLikePost = useCallback(
		(postId) => {
			if (user) {
				likeMutation.mutate(
					{ postId, username: user.username },
					{
						onSuccess: () => {
							setLikedPosts((prev) => {
								const newSet = new Set(prev);
								if (newSet.has(postId)) {
									newSet.delete(postId);
								} else {
									newSet.add(postId);
								}
								return newSet;
							});
							// Invalidate and refetch to update the likes count
							queryClient.invalidateQueries(["posts"]);
						},
					}
				);
			} else {
				navigation.navigate("Login");
			}
		},
		[user, likeMutation, navigation, queryClient]
	);

	const handleDislikePost = useCallback(
		(postId) => {
			if (user) {
				dislikeMutation.mutate(
					{ postId, username: user.username },
					{
						onSuccess: () => {
							setLikedPosts((prev) => {
								const newSet = new Set(prev);
								if (newSet.has(postId)) {
									newSet.delete(postId);
								} else {
									newSet.add(postId);
								}
								return newSet;
							});
							// Invalidate and refetch to update the likes count
							queryClient.invalidateQueries(["posts"]);
						},
					}
				);
			} else {
				navigation.navigate("Login");
			}
		},
		[user, dislikeMutation, navigation, queryClient]
	);

	const handleDownloadImage = async (imageUrl) => {
		try {
			const { status } = await MediaLibrary.requestPermissionsAsync();
			if (status === "granted") {
				const fileUri = FileSystem.documentDirectory + "temp_image.jpg";
				const downloadResumable = FileSystem.createDownloadResumable(
					imageUrl,
					fileUri,
					{}
				);
				const { uri } = await downloadResumable.downloadAsync();
				const asset = await MediaLibrary.createAssetAsync(uri);
				await MediaLibrary.createAlbumAsync("Freathers", asset, false);
				Alert.alert("Success", "Image saved to gallery!");
			}
		} catch (error) {
			console.error("Error downloading image:", error);
			Alert.alert("Error", "Failed to save image");
		}
	};

	const handleWhatsAppRedirect = (phoneNumber) => {
		const url = `whatsapp://send?phone=${phoneNumber}`;
		Linking.canOpenURL(url)
			.then((supported) => {
				if (supported) {
					return Linking.openURL(url);
				} else {
					Alert.alert("Error", "WhatsApp is not installed on this device");
				}
			})
			.catch((err) => console.error("Error opening WhatsApp:", err));
	};

	const handlePhoneCall = (phoneNumber) => {
		console.log(phoneNumber);
		const url =
			Platform.OS === "android"
				? `tel:${phoneNumber}`
				: `telprompt:${phoneNumber}`;
		Linking.canOpenURL(url)
			.then((supported) => {
				if (supported) {
					return Linking.openURL(url);
				} else {
					Alert.alert("Error", "Phone call not supported on this device");
				}
			})
			.catch((err) => console.error("Error making phone call:", err));
	};

	const renderItem = useCallback(
		({ item }) => (
			<View className="mb-4 mx-3">
				<View className="flex-row items-center p-4 px-0 justify-between">
					<View className="flex-row items-center">
						<Image
							source={{ uri: item.user.profilePic }}
							className="w-10 h-10 rounded-full mr-2 border border-primary"
						/>
						<View>
							<Text className="font-bold">{item.user.name}</Text>
							<Text className="text-gray-500">@{item.user.username}</Text>
						</View>
					</View>
					<TouchableOpacity>
						<Image
							source={require("../assets/menu_icon.png")}
							className="w-6 h-6"
						/>
					</TouchableOpacity>
				</View>
				<Image
					source={{ uri: item.imageUrl }}
					className="w-full h-80 object-cover"
				/>
				<View className="flex-row justify-between p-2 pt-4">
					<View className="flex-row items-center space-x-4">
						<TouchableOpacity
							onPress={
								likedPosts.has(item._id)
									? () => handleLikePost(item._id)
									: () => handleDislikePost(item._id)
							}
						>
							<Image
								source={
									likedPosts.has(item._id)
										? require("../assets/like_colored.png")
										: require("../assets/like_icon.png")
								}
								className="w-6 h-6"
							/>
						</TouchableOpacity>
						<TouchableOpacity>
							<Image
								source={require("../assets/share_icon.png")}
								className="w-6 h-6"
							/>
						</TouchableOpacity>
					</View>
					<View className="flex-row items-center space-x-4">
						<TouchableOpacity
							onPress={() => handleDownloadImage(item.imageUrl)}
						>
							<Image
								source={require("../assets/download_icon.png")}
								className="w-6 h-6"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								handleWhatsAppRedirect(
									item.user.contactDetails.contactNumber?.whatsapp
								)
							}
						>
							<Image
								source={require("../assets/whatsapp_icon.png")}
								className="w-6 h-6"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								handlePhoneCall(item.user.contactDetails.contactNumber?.mobile)
							}
						>
							<Image
								source={require("../assets/call_icon.png")}
								className="w-6 h-6"
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View className="p-2">
					<Text className="text-xs">
						Liked by{" "}
						<Text className="font-semibold">{item.likes.length} people</Text>
					</Text>
					<Text className="font-extrabold">
						{item.user.name} <Text className="font-normal">{item.caption}</Text>
					</Text>
				</View>
			</View>
		),
		[handleLikePost]
	);

	const ListEmptyComponent = useCallback(
		() => (
			<View className="flex-1 justify-center items-center">
				<Text>No posts available</Text>
			</View>
		),
		[]
	);

	const ListHeaderComponent = useCallback(
		() => (
			<View className="flex-row justify-between items-center p-4 bg-primary pt-8">
				<Image source={require("../assets/icon.png")} className="w-10 h-10" />
				<Text className="text-lg font-bold">Freathers</Text>
				<TouchableOpacity onPress={() => navigation.navigate("Setting")}>
					<Image
						source={require("../assets/user_icon.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
			</View>
		),
		[navigation]
	);

	if (isError) {
		return (
			<SafeAreaView className="flex-1 justify-center items-center">
				<Text>Error: {error.message}</Text>
				<TouchableOpacity
					onPress={refetch}
					className="mt-4 bg-primary p-2 rounded"
				>
					<Text className="text-white">Try Again</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<FlatList
				data={posts}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
				contentContainerStyle={{ flexGrow: 1 }}
				ListHeaderComponent={ListHeaderComponent}
				ListEmptyComponent={isLoading ? null : ListEmptyComponent}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={refetch} />
				}
			/>
			<FilterComponent />
			<BottomNavigation notify={true} />
		</SafeAreaView>
	);
}
