import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Linking,
  Platform,
  Share,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "../api/feed";
import { useAuth } from "../context/AuthContext";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Clipboard from "expo-clipboard";
import { useColorScheme } from "nativewind";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function ParticularPostScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { postId } = route.params;
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(false);
  const { colorScheme } = useColorScheme();
  const [likedPosts, setLikedPosts] = useState(new Set());
  const {
    data: post,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => postService.getSinglePost(postId),
    onSuccess: (data) => {
      setIsLiked(data.likes.some((like) => like.username === user?.username));
    },
  });

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

  const handleShare = async () => {
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

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white dark:bg-[#222831]">
        <ActivityIndicator size="large" color="#FFD1DC" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white dark:bg-[#222831]">
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
    <SafeAreaView className="flex-1 bg-white pt-12 dark:bg-[#222831]">
      <ScrollView>
        <TouchableOpacity
          className="absolute top-0 left-4 z-50"
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>

        <View className="mb-4 mt-8 mx-3">
          <View className="flex-row items-center p-4 px-0 justify-between">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CommonProfile", { userId: post.user._id })
              }
            >
              <View className="flex-row items-center">
                <Image
                  source={{ uri: post.user.profilePic }}
                  className="w-10 h-10 rounded-full mr-2 border border-primary"
                />
                <View>
                  <Text className="font-bold dark:text-white">
                    {post.user.name}
                  </Text>
                  <Text className="text-gray-500 dark:text-gray-200">
                    @{post.user.username}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionsPress(item)}>
              <Entypo
                name="dots-three-vertical"
                size={16}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity>
							<Image
								source={require("../assets/menu_icon.png")}
								className="w-6 h-6"
							/>
						</TouchableOpacity> */}
          </View>
          <Image
            source={{ uri: post.imageUrl }}
            className="w-full h-80 object-cover"
          />
          <View className="flex-row justify-between p-2 pt-4">
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity onPress={() => handleToggleLike(post._id)}>
                {likedPosts.has(post._id) ? (
                  <Feather name="thumbs-up" size={20} color="pink" />
                ) : (
                  <Feather
                    name="thumbs-up"
                    size={20}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare}>
                <Image
                  source={require("../assets/share_icon.png")}
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity
                onPress={() => handleDownloadImage(post.imageUrl)}
              >
                <Image
                  source={require("../assets/download_icon.png")}
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleWhatsAppRedirect(
                    post.user.contactDetails.contactNumber?.whatsapp
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
                  handlePhoneCall(
                    post.user.contactDetails.contactNumber?.mobile
                  )
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
              <Text className="font-semibold">{post.likes.length} people</Text>
            </Text>
            <Text className="font-extrabold">
              {post.user.name}{" "}
              <Text className="font-normal">{post.caption}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
