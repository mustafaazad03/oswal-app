import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DeleteFeedModal from "../components/DeletedFeedModal";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { postService } from "../api/feed";

const DeletedFeedItem = ({ item, onPress }) => (
  <TouchableOpacity
    className="w-[48%] aspect-square rounded-lg mb-4 overflow-hidden"
    onPress={() => onPress(item)}
  >
    <Image
      source={{ uri: item?.imageUrl }}
      className="w-full h-full"
      resizeMode="cover"
    />
  </TouchableOpacity>
);

export default function DeletedFeedsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const [deletedFeedsData, setDeletedFeedsData] = useState([]);
  const [item, setItem] = useState(null);

  const mutation = useMutation({
    mutationFn: () => postService.getDeletedPosts(user?.userId),
    onSuccess: (data) => {
      setDeletedFeedsData(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const postDeletedMutation = useMutation({
    mutationFn: (mutationData) =>
      postService.updatePost(mutationData.postId, {
        isPermanentlyDeleted: true,
      }),
    onSuccess: () => {
      Alert.alert("Success", "Post Deleted successfully");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const postRestoreMutation = useMutation({
    mutationFn: (mutationData) =>
      postService.updatePost(mutationData.postId, { isDeleted: false }),
    onSuccess: () => {
      Alert.alert("Success", "Post Restored successfully");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const openDeletedScreenModal = (item) => {
    setItem(item);
    setModalVisible(true);
  };

  const handleOnDelete = () => {
    postDeletedMutation.mutate({ postId: item?._id });
    setModalVisible(false);
  };

  const handleOnRestore = () => {
    postRestoreMutation.mutate({ postId: item?._id });
    setModalVisible(false);
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white dark:bg-[#222831]">
        <View className="bg-[#FFD1DC] p-4 flex-row items-center pt-8">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/arrow_back.png")}
              className="w-6 h-6 mr-3"
            />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Deleted Feeds</Text>
        </View>

        <ScrollView className="flex-1 p-4">
          <Text className="text-sm mb-4 dark:text-gray-300">
            Deleted feed items will be permanently deleted after 60 days in the
            deleted bin.
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {deletedFeedsData.map((item) => (
              <DeletedFeedItem
                key={item?.imageUrl}
                item={item}
                onPress={openDeletedScreenModal}
              />
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
      </SafeAreaView>
      <DeleteFeedModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={handleOnDelete}
        onRestore={handleOnRestore}
        item={item}
      />
    </>
  );
}
