import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/user";
import { useAuth } from "../context/AuthContext";
import BottomNavigation from "../components/BottomNavigation";

export default function SavedPostsScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const {
    data: savedPosts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["savedPosts", user?.username],
    queryFn: () => userService.getSavedPosts(user?.username),
    enabled: !!user,
    retry: 1,
  });

  const onPressFeed = (item) => {
    navigation.navigate("ParticularPost", {
      postId: item?._id,
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="w-1/3 aspect-square p-1"
      onPress={() => onPressFeed(item)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        className="w-full h-full rounded-lg"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#222831]">
      <View className="flex-row justify-between items-center p-4 bg-primary pt-8">
        <Image
          source={require("../assets/icon.png")}
          className="w-10 h-10 bg-white rounded-full"
        />
        <Text className="text-lg font-bold">Saved Posts</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Setting")}
        ></TouchableOpacity>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="pink" />
        </View>
      ) : (
        <FlatList
          data={savedPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={3}
          contentContainerStyle={{ padding: 4 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center h-[70vh]">
              <Text>No saved posts found</Text>
            </View>
          }
        />
      )}

      <BottomNavigation notify={false} />
    </SafeAreaView>
  );
}
