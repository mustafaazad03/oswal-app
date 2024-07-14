import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	FlatList,
	RefreshControl,
	Alert,
	Linking,
	Platform,
	Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FilterComponent from "../components/FilterComponent";
import BottomNavigation from "../components/BottomNavigation";
import { postService } from "../api/feed";
import { useAuth } from "../context/AuthContext";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Clipboard from "expo-clipboard";
import SkeletonLoading from "../components/SkeletonLoading";

export default function FeedScreen() {
	const navigation = useNavigation();
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const [likedPosts, setLikedPosts] = useState(new Set());
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [activeFilter, setActiveFilter] = useState(null);

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
			const likedPostIds = new Set(
				posts
					.filter((post) =>
						post.likes.some((like) => like.username === user.username)
					)
					.map((post) => post._id)
			);
			setLikedPosts(likedPostIds);
		}
	}, [posts, user]);

	useEffect(() => {
		if (posts) {
			let sorted = [...posts].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
			setFilteredPosts(sorted);
		}
	}, [posts]);

	const applyFilter = useCallback(
		(filter) => {
			setActiveFilter(filter);
			if (!posts) return;

			let filtered = [...posts].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);

			const userState = "new_york";
			const userCity = "Near IGI, New Delhi"
				?.split(",")
				.pop()
				.trim()
				.toLowerCase();

			switch (filter) {
				case "myCity":
					// Implement city filter logic here
					filtered = filtered.filter((post) => {
						const postCity = post.user.businessDetails?.address?.city
							?.split(",")
							.pop()
							.trim()
							.toLowerCase();
						return postCity === userCity;
					});
					break;
				case "nearby":
					// Implement nearby filter logic here
					filtered = filtered.filter((post) => {
						const postState =
							post.user.businessDetails?.address?.state?.toLowerCase();
						return postState === userState;
					});
					break;
				case "mostLiked":
					filtered.sort((a, b) => b.likes.length - a.likes.length);
					break;
				case "today":
					filtered = filtered.filter(
						(post) =>
							new Date(post.createdAt).toDateString() ===
							new Date().toDateString()
					);
					break;
				case "lastWeek":
					const oneWeekAgo = new Date();
					oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
					filtered = filtered.filter(
						(post) => new Date(post.createdAt) >= oneWeekAgo
					);
					break;
				case "lastMonth":
					const oneMonthAgo = new Date();
					oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
					filtered = filtered.filter(
						(post) => new Date(post.createdAt) >= oneMonthAgo
					);
					break;
				default:
					break;
			}

			setFilteredPosts(filtered);
		},
		[posts]
	);

	const toggleLikeMutation = useMutation({
		mutationFn: ({ postId, username, isLiked }) =>
			isLiked
				? postService.unlikePost(postId, username)
				: postService.likePost(postId, username),
		onMutate: ({ postId, isLiked }) => {
			const previousPosts = queryClient.getQueryData(["posts"]);
			queryClient.setQueryData(["posts"], (old) =>
				old.map((post) =>
					post._id === postId
						? {
								...post,
								likes: isLiked
									? post.likes.filter((like) => like.username !== user.username)
									: [...post.likes, { username: user.username }],
						  }
						: post
				)
			);
			setLikedPosts((prev) => {
				const newSet = new Set(prev);
				if (isLiked) {
					newSet.delete(postId);
				} else {
					newSet.add(postId);
				}
				return newSet;
			});
			return { previousPosts };
		},
		onError: (err, { postId }, context) => {
			queryClient.setQueryData(["posts"], context.previousPosts);
			setLikedPosts((prev) => {
				const newSet = new Set(prev);
				if (newSet.has(postId)) {
					newSet.delete(postId);
				} else {
					newSet.add(postId);
				}
				return newSet;
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries(["posts"]);
		},
	});

	const handleToggleLike = useCallback(
		(postId) => {
			if (user) {
				const isLiked = likedPosts.has(postId);
				toggleLikeMutation.mutate({
					postId,
					username: user.username,
					isLiked,
				});
			} else {
				// Handle the case when the user is not logged in
				Alert.alert("Error", "Please log in to like posts");
			}
		},
		[user, likedPosts, toggleLikeMutation]
	);

	const handleDownloadImage = useCallback(async (imageUrl) => {
		try {
			const { status } = await MediaLibrary.requestPermissionsAsync();
			if (status === "granted") {
				const fileUri = `${FileSystem.cacheDirectory}temp_image.jpg`;
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
	}, []);

	const handleWhatsAppRedirect = useCallback((phoneNumber) => {
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
	}, []);

	const handlePhoneCall = useCallback((phoneNumber) => {
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
	}, []);

	const handleShare = async (postId) => {
		try {
			const url = `https://www.freathers.com/post/${postId}`;

			try {
				const result = await Share.share({
					message: `Check out this post: ${url}`,
					url: url, // iOS only
				});
				if (result.action === Share.sharedAction) {
					if (result.activityType) {
					} else {
					}
				} else if (result.action === Share.dismissedAction) {
					// dismissed by user
					return;
				}
			} catch (error) {
				console.log("Error with native share:", error.message);

				// If native share fails, fall back to copying to clipboard
				await Clipboard.setStringAsync(url);
				Alert.alert(
					"Link Copied",
					"The post link has been copied to your clipboard."
				);
			}
		} catch (error) {
			console.error("Error sharing:", error);
			Alert.alert("Error", "Failed to share the post");
		}
	};

	const renderItem = useCallback(
		({ item }) => (
			<View className="mb-4 mx-3">
				<View className="flex-row items-center p-4 px-0 justify-between">
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("CommonProfile", { userId: item.user._id })
						}
					>
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
					</TouchableOpacity>
					<TouchableOpacity>
						<Image
							source={require("../assets/menu_icon.png")}
							className="w-6 h-6"
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("ParticularPost", {
							postId: item?._id,
						})
					}
				>
					<Image
						source={{ uri: item.imageUrl }}
						className="w-full h-80 object-cover"
					/>
				</TouchableOpacity>
				<View className="flex-row justify-between p-2 pt-4">
					<View className="flex-row items-center space-x-4">
						<TouchableOpacity onPress={() => handleToggleLike(item._id)}>
							<Image
								source={
									likedPosts.has(item._id)
										? require("../assets/like_colored.png")
										: require("../assets/like_icon.png")
								}
								className="w-6 h-6"
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleShare(item._id)}>
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
		[
			handleToggleLike,
			likedPosts,
			handleDownloadImage,
			handleWhatsAppRedirect,
			handlePhoneCall,
		]
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
				data={filteredPosts}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
				contentContainerStyle={{ flexGrow: 1 }}
				ListHeaderComponent={ListHeaderComponent}
				ListEmptyComponent={
					isLoading ? <SkeletonLoading /> : ListEmptyComponent
				}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={refetch} />
				}
				windowSize={5}
				maxToRenderPerBatch={10}
				removeClippedSubviews={true}
			/>
			<FilterComponent onFilterChange={applyFilter} />
			<BottomNavigation notify={true} />
		</SafeAreaView>
	);
}
