import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/user";
import { useAuth } from "../context/AuthContext";
import { convertISODateToNormal } from "../functions/IsotoNormal";
import BottomNavigation from "../components/BottomNavigation";
import { Entypo } from "@expo/vector-icons";

export default function NotificationScreen() {
  const navigation = useNavigation();
  const { user: authUser } = useAuth();

  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications", authUser?.userId],
    queryFn: () => userService.getUserNotifications(authUser?.userId),
    enabled: !!authUser?.userId,
    retry: 1,
  });

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-center p-4 border-b border-gray-200"
      onPress={() =>
        navigation.navigate("ParticularPost", { postId: item.post._id })
      }
    >
      <Image
        source={{ uri: item.sender.profilePic }}
        className="w-12 h-12 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-gray-600">{item.content}</Text>
      </View>
      <Text className="text-xs text-gray-400">
        {convertISODateToNormal(item.createdAt)}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Loading notifications...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Error loading notifications</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4 bg-primary pt-8">
        <Image source={require("../assets/icon.png")} className="w-10 h-10" />
        <Text className="text-lg font-bold">Freathers</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
          <Entypo name="dots-three-vertical" size={16} color="black" />
        </TouchableOpacity>
      </View>
      <Text className="text-2xl font-bold p-4">Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item._id}
      />
      <BottomNavigation notify={true} />
    </SafeAreaView>
  );
}
