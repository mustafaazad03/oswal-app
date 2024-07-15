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
	Pressable,
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
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SideModal from "../components/sideModal";
import ReportProblemModal from "../components/reportProblemModal";
import { userService } from "../api/user";

export default function FeedScreen() {
	const navigation = useNavigation();
	const queryClient = useQueryClient();
	const { user, fullUser } = useAuth();
	const [likedPosts, setLikedPosts] = useState(new Set());
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [sideModalVisible, setSideModalVisible] = useState(false);
	const [reportModalVisible, setReportModalVisible] = useState(false);
	const [selectedPost, setSelectedPost] = useState(null);
	const [followingUsers, setFollowingUsers] = useState(new Set());

	useEffect(() => {
		if (fullUser) {
			setFollowingUsers(new Set(fullUser.followings));
		}
	}, [fullUser]);

	const handleOptionsPress = (item) => {
		setSelectedPost(item);
		setSideModalVisible(true);
	};

	const handleOptionSelect = (option) => {
		setSideModalVisible(false);
		switch (option) {
			case "Rate":
				navigation.navigate("CommonProfile", { userId: selectedPost.user._id });
				break;
			case "Review":
				navigation.navigate("CommonProfile", { userId: selectedPost.user._id });
				break;
			case "View Profile":
				navigation.navigate("CommonProfile", { userId: selectedPost.user._id });
				break;
			case "Follow":
				followUserMutation.mutate(selectedPost.user._id);
				break;
			case "Unfollow":
				unFollowMutation.mutate(selectedPost.user._id);
				break;
			case "Block":
				blockUserMutation.mutate(selectedPost.user.username);
				break;
			case "Report a problem":
				setReportModalVisible(true);
				break;
			default:
				break;
		}
	};

	const blockUserMutation = useMutation({
		mutationFn: (username) => userService.blockUser(username),
		onMutate: (username) => {
			const previousPosts = queryClient.getQueryData(["posts"]);
			queryClient.setQueryData(["posts"], (old) =>
				old.filter((post) => post.user.username !== username)
			);
			return { previousPosts };
		},
		onError: (err, userId, context) => {
			queryClient.setQueryData(["posts"], context.previousPosts);
		},
		onSettled: () => {
			queryClient.invalidateQueries(["posts"]);
		},
	});

	const unFollowMutation = useMutation({
		mutationFn: (userId) => userService.unfollowUser(user?.userId, userId),
		onMutate: (userId) => {
			const previousPosts = queryClient.getQueryData(["posts"]);
			queryClient.setQueryData(["posts"], (old) =>
				old.filter((post) => post.user._id !== userId)
			);
			return { previousPosts };
		},
		onError: (err, userId, context) => {
			queryClient.setQueryData(["posts"], context.previousPosts);
		},
		onSettled: () => {
			queryClient.invalidateQueries(["posts"]);
		},
	});

	const followUserMutation = useMutation({
		mutationFn: (userId) => userService.followUser(user?.userId, userId),
		onSuccess: (data, userId) => {
			setFollowingUsers((prev) => new Set(prev).add(userId));
			queryClient.invalidateQueries(["posts"]);
		},
	});

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
			let sorted = [...posts]
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
				.map((post) => ({ ...post, imageOrientation: "contain" }));
			setFilteredPosts(sorted);
		}
	}, [posts]);

	const applyFilter = useCallback(
		(filter) => {
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
		({ item }) => {
			const toggleImageOrientation = () => {
				setFilteredPosts((prevPosts) =>
					prevPosts.map((post) =>
						post._id === item._id
							? {
									...post,
									imageOrientation:
										post.imageOrientation === "contain" ? "cover" : "contain",
							  }
							: post
					)
				);
			};
			return (
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
						<TouchableOpacity onPress={() => handleOptionsPress(item)}>
							<Entypo name="dots-three-vertical" size={16} color="black" />
						</TouchableOpacity>
					</View>
					<View className="relative">
						<Pressable className="absolute right-0 w-10 h-10 top-6 z-10">
							{item.imageOrientation === "contain" ? (
								<TouchableOpacity onPress={toggleImageOrientation}>
									<FontAwesome name="expand" size={18} color="pink" />
								</TouchableOpacity>
							) : (
								<TouchableOpacity onPress={toggleImageOrientation}>
									<FontAwesome5 name="expand" size={18} color="pink" />
								</TouchableOpacity>
							)}
						</Pressable>
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
								resizeMode={item.imageOrientation}
							/>
						</TouchableOpacity>
					</View>
					<View className="flex-row justify-between p-2 pt-4">
						<View className="flex-row items-center space-x-4">
							<TouchableOpacity onPress={() => handleToggleLike(item._id)}>
								{likedPosts.has(item._id) ? (
									<Feather name="thumbs-up" size={20} color="pink" />
								) : (
									<Feather name="thumbs-up" size={20} color="black" />
								)}
							</TouchableOpacity>
							<TouchableOpacity onPress={() => handleShare(item._id)}>
								<Octicons name="paper-airplane" size={20} color="black" />
							</TouchableOpacity>
						</View>
						<View className="flex-row items-center space-x-4">
							<TouchableOpacity
								onPress={() => handleDownloadImage(item.imageUrl)}
							>
								<AntDesign name="download" size={20} color="black" />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									handleWhatsAppRedirect(
										item.user.contactDetails.contactNumber?.whatsapp
									)
								}
							>
								<FontAwesome name="whatsapp" size={20} color="black" />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									handlePhoneCall(
										item.user.contactDetails.contactNumber?.mobile
									)
								}
							>
								<Feather name="phone" size={20} color="black" />
							</TouchableOpacity>
						</View>
					</View>
					<View className="p-2">
						<Text className="text-xs">
							Liked by{" "}
							<Text className="font-semibold">{item.likes.length} people</Text>
						</Text>
						<Text className="font-extrabold">
							{item.user.name}{" "}
							<Text className="font-normal">{item.caption}</Text>
						</Text>
					</View>
				</View>
			);
		},
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
					<Octicons name="person" size={24} color="black" />
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
			<SideModal
				isVisible={sideModalVisible}
				onClose={() => setSideModalVisible(false)}
				onOptionPress={handleOptionSelect}
				isFollowing={selectedPost && followingUsers.has(selectedPost.user._id)}
			/>
			<ReportProblemModal
				isVisible={reportModalVisible}
				onClose={() => setReportModalVisible(false)}
				userId={user?.userId}
			/>
			<FilterComponent onFilterChange={applyFilter} />
			<BottomNavigation notify={true} />
		</SafeAreaView>
	);
}
