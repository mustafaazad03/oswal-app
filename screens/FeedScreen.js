import React, { useCallback } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	FlatList,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FilterComponent from "../components/FilterComponent";
import BottomNavigation from "../components/BottomNavigation";
import { postService } from "../api/feed";
import { useAuth } from "../context/AuthContext";

export default function FeedScreen() {
	const navigation = useNavigation();
	const queryClient = useQueryClient();
	// get user from context
	const { user } = useAuth();

	const {
		data: posts,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: postService.getAllFeed,
		select: (data) => data,
	});

	const likeMutation = useMutation({
		mutationFn: ({ postId, userId }) => postService.likePost(postId, userId),
		onSuccess: () => {
			queryClient.invalidateQueries("posts");
		},
	});

	const handleLikePost = useCallback(
		(postId) => {
			if (user) {
				likeMutation.mutate({ postId, userId: user._id });
			} else {
				// Handle case when user is not logged in
				navigation.navigate("Login");
			}
		},
		[user, likeMutation, navigation]
	);

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
						<TouchableOpacity onPress={() => handleLikePost(item._id)}>
							<Image
								source={require("../assets/like_icon.png")}
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
						<TouchableOpacity>
							<Image
								source={require("../assets/download_icon.png")}
								className="w-6 h-6"
							/>
						</TouchableOpacity>
						<TouchableOpacity>
							<Image
								source={require("../assets/whatsapp_icon.png")}
								className="w-6 h-6"
							/>
						</TouchableOpacity>
						<TouchableOpacity>
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
			{isLoading && (
				<View className="absolute inset-0 justify-center items-center bg-black bg-opacity-50">
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			)}
			<FilterComponent />
			<BottomNavigation notify={true} />
		</SafeAreaView>
	);
}
