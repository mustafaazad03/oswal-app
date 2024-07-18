import React, { useState, useCallback, useEffect } from "react";
import {
	View,
	Text,
	Modal,
	Pressable,
	Image,
	TouchableOpacity,
	Alert,
	Share,
	Linking,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { postService } from "../api/feed";
import { useAuth } from "../context/AuthContext";
import {
	FontAwesome,
	FontAwesome5,
	Entypo,
	Octicons,
	Feather,
	AntDesign,
} from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Clipboard from "expo-clipboard";

const PostModal = ({ onClose, isVisible, data, user }) => {
	const [imageOrientation, setImageOrientation] = useState("contain");
	const queryClient = useQueryClient();
	const { colorScheme } = useColorScheme();
	// const { user } = useAuth();

	const postId = data?._id;

	const [isLiked, setIsLiked] = useState(false);
	const [totalLikes, setTotalLikes] = useState(data?.likes.length);

	// const {
	// 	data: post,
	// 	isLoading,
	// 	isError,
	// 	error,
	// 	refetch,
	// } = useQuery({
	// 	queryKey: ["post", postId],
	// 	queryFn: () => postService.getSinglePost(postId),
	// 	onSuccess: (data) => {
	// 		setIsLiked(data.likes.some((like) => like.username === user?.username));
	// 	},
	// });

	useEffect(() => {
		if (data) {
			setIsLiked(data.likes.some((like) => like.username === user?.username));
		}
	}, [data, user]);

	const toggleLikeMutation = useMutation({
		mutationFn: ({ postId, username, isLiked }) =>
			isLiked
				? postService.unlikePost(postId, username)
				: postService.likePost(postId, username),
		onMutate: ({ isLiked }) => {
			const previousPost = queryClient.getQueryData(["post", postId]);
			queryClient.setQueryData(["post", postId], (old) => ({
				...old,
				likes: isLiked
					? old.likes.filter((like) => like.username !== user.username)
					: [...old.likes, { username: user.username }],
			}));
			setIsLiked(!isLiked);
			setTotalLikes((prev) => (isLiked ? prev - 1 : prev + 1));
			return { previousPost };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData(["post", postId], context.previousPost);
			setIsLiked(!variables.isLiked);
		},
		onSettled: () => {
			queryClient.invalidateQueries(["post", postId]);
		},
	});

	const handleToggleLike = useCallback(() => {
		if (user) {
			toggleLikeMutation.mutate({
				postId,
				username: user.username,
				isLiked,
			});
		} else {
			Alert.alert("Error", "Please log in to like posts");
		}
	}, [user, isLiked, postId, toggleLikeMutation]);

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
			const result = await Share.share({
				message: `Check out this post: ${url}`,
				url: url, // iOS only
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			console.error("Error sharing:", error);
			try {
				const url = `https://www.freathers.com/post/${postId}`;
				await Clipboard.setStringAsync(url);
				Alert.alert(
					"Link Copied",
					"The post link has been copied to your clipboard."
				);
			} catch (clipboardError) {
				console.error("Error copying to clipboard:", clipboardError);
				Alert.alert("Error", "Failed to share the post");
			}
		}
	};

	if (!data) return null;

	return (
		<Modal animationType="slide" transparent={true} visible={isVisible}>
			<Pressable
				style={{ flex: 1 }}
				className="justify-center items-center bg-primary/60"
				onPress={onClose}
			>
				<Pressable
					className="w-11/12 bg-white dark:bg-[#222831] rounded-lg py-3 shadow-lg space-y-3"
					onPress={(e) => e.stopPropagation()} // Prevent closing when pressing inside the modal
				>
					<View className="flex flex-row justify-between items-center px-3">
						<View className="flex-row items-center justify-start space-x-2">
							<Image
								source={{ uri: user?.profilePic }} // Change this from profilePic to imageUrl
								className="w-10 h-10 rounded-full"
								resizeMode="cover"
							/>
							<View className="flex flex-col space-y-px">
								<Text className="text-black dark:text-white">{user?.name}</Text>
								<Text className="text-black text-xs dark:text-gray-200">
									{`@` + user?.username}
								</Text>
							</View>
						</View>
						<TouchableOpacity>
							<Entypo
								name="dots-three-vertical"
								size={16}
								color={colorScheme === "dark" ? "white" : "black"}
							/>
						</TouchableOpacity>
					</View>
					<View className="relative">
						<Pressable className="absolute right-5 top-2 z-10 transition duration-200">
							{imageOrientation === "contain" ? (
								<TouchableOpacity onPress={() => setImageOrientation("cover")}>
									<FontAwesome name="expand" size={18} color="pink" />
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									onPress={() => setImageOrientation("contain")}
								>
									<FontAwesome5 name="expand" size={18} color="pink" />
								</TouchableOpacity>
							)}
						</Pressable>
						<Image
							source={{ uri: data?.imageUrl }} // Change this from profilePic to imageUrl
							className="w-full h-72 "
							resizeMode={imageOrientation === "contain" ? "contain" : "cover"}
						/>
					</View>
					<View className="flex-row justify-between px-3">
						<View className="flex-row items-center space-x-4">
							<TouchableOpacity onPress={handleToggleLike}>
								{isLiked ? (
									<Feather name="thumbs-up" size={20} color="pink" />
								) : (
									<Feather
										name="thumbs-up"
										size={20}
										color={colorScheme === "dark" ? "white" : "black"}
									/>
								)}
							</TouchableOpacity>
							<TouchableOpacity onPress={() => handleShare(data._id)}>
								<Octicons
									name="paper-airplane"
									size={20}
									color={colorScheme === "dark" ? "white" : "black"}
								/>
							</TouchableOpacity>
						</View>
						<View className="flex-row items-center space-x-4">
							<TouchableOpacity
								onPress={() => handleDownloadImage(data.imageUrl)}
							>
								<AntDesign
									name="download"
									size={20}
									color={colorScheme === "dark" ? "white" : "black"}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									handleWhatsAppRedirect(
										data.user.contactDetails.contactNumber?.whatsapp
									)
								}
							>
								<FontAwesome
									name="whatsapp"
									size={20}
									color={colorScheme === "dark" ? "white" : "black"}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									handlePhoneCall(
										data.user.contactDetails.contactNumber?.mobile
									)
								}
							>
								<Feather
									name="phone"
									size={20}
									color={colorScheme === "dark" ? "white" : "black"}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<View className="px-2">
						<Text className="text-xs dark:text-white">
							Liked by{" "}
							<Text className="font-semibold">{totalLikes} people</Text>
						</Text>
						<Text className="font-extrabold dark:text-white">
							{data.user.name}{" "}
							<Text className="font-normal">{data.caption}</Text>
						</Text>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
};

export default PostModal;
