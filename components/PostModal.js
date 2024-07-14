import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { postService } from "../api/feed";
import { useAuth } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const PostModal = ({ onClose, isVisible, data, user }) => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [imageOrientation, setImageOrientation] = useState("contain");
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { user: authUser } = useAuth();
  const { data: post, isPostLoading } = useQuery({
    queryKey: ["post", authUser?.username],
    queryFn: () => userService.getAllPostsFromUser(authUser?.userId),
    enabled: !!authUser,
  });
  useEffect(() => {
    if (user && post) {
      // console.log(
      //   post
      //     .filter((post) =>
      //       post.likes.some((like) => like.username === user.username)
      //     )
      //     .map((post) => post._id)
      // );
      const likedPostIds = new Set(
        post
          .filter((post) =>
            post.likes.some((like) => like.username === user.username)
          )
          .map((post) => post._id)
      );
      setLikedPosts(likedPostIds);
    }
  }, [post, user]);
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
        Alert.alert("Error", "Please log in to like posts");
      }
    },
    [user, likedPosts, toggleLikeMutation]
  );

  const toggleLikeMutation = useMutation({
    mutationFn: ({ postId, username, isLiked }) =>
      isLiked
        ? postService.unlikePost(postId, username)
        : postService.likePost(postId, username),
    onMutate: ({ postId, isLiked }) => {
      const previousPosts = queryClient.getQueryData(["post"]);
      queryClient.setQueryData(["post"], (old) =>
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
      queryClient.invalidateQueries(["post"]);
    },
  });
  if (!data) return null;
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Pressable
        style={{ flex: 1 }}
        className="justify-center items-center bg-primary/60"
        onPress={onClose}
      >
        <Pressable
          className="w-11/12 bg-white rounded-lg py-3 shadow-lg space-y-3"
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
                <Text className="text-black">{user?.name}</Text>
                <Text className="text-black text-xs">
                  {`@` + user?.username}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={16} color="black" />
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
              <TouchableOpacity onPress={() => handleToggleLike(data._id)}>
                {likedPosts.has(data._id) ? (
                  <Feather name="thumbs-up" size={20} color="pink" />
                ) : (
                  <Feather name="thumbs-up" size={20} color="black" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
              //  onPress={() => handleShare(item._id)}
              >
                <Octicons name="paper-airplane" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity
              // onPress={() => handleDownloadImage(item.imageUrl)}
              >
                <AntDesign name="download" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
              // onPress={() =>
              //   handleWhatsAppRedirect(
              //     item.user.contactDetails.contactNumber?.whatsapp
              //   )
              // }
              >
                <FontAwesome name="whatsapp" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
              // onPress={() =>
              //   handlePhoneCall(
              //     item.user.contactDetails.contactNumber?.mobile
              //   )
              // }
              >
                <Feather name="phone" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="px-2">
            <Text className="text-xs">
              Liked by{" "}
              <Text className="font-semibold">{data.likes.length} people</Text>
            </Text>
            <Text className="font-extrabold">
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
