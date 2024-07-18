import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome6, Entypo } from "@expo/vector-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BottomNavigation from "../components/BottomNavigation";
import CarouselComponent from "../components/Carousel";
import * as Clipboard from "expo-clipboard";
import BottomModal from "../components/BottomModal";
import ProfileTabs from "../components/ProfileTabs";
import { userService } from "../api/user";
import { useAuth } from "../context/AuthContext";
import { useColorScheme } from "nativewind";
import MapView, { Marker } from "react-native-maps";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const { user: authUser } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { colorScheme } = useColorScheme();
  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  function extractCoordinatesFromLink(link) {
    const markerRegex = /marker=([\d.]+),([\d.]+)/;
    const match = link.match(markerRegex);
    if (match) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
      return { latitude, longitude };
    }
    return null;
  }

  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", authUser?.username],
    queryFn: () => userService.getSingleUser(authUser?.userId),
    enabled: !!authUser,
    onSuccess: (data) => {
      console.log("this is the data logged", data);
      const coordinates = extractCoordinatesFromLink(
        data.businessDetails.address.googleMapLink
      );
      if (coordinates) {
        setLocation({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        });
      }
    },
  });

  const { data: post, isPostLoading } = useQuery({
    queryKey: ["post", authUser?.username],
    queryFn: () => userService.getAllPostsFromUser(authUser?.userId),
    enabled: !!authUser,
  });
  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };
  const handleShare = async (userId) => {
    try {
      const url = `https://www.freathers.com/user/${userId}`;
      try {
        const result = await Share.share({
          message: `Check out this profile on freathers: ${url}`,
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
    <SafeAreaView className="flex-1 bg-white dark:bg-[#222831]">
      <View className="flex-row justify-between items-center p-4 bg-primary pt-8">
        <Image
          source={require("../assets/icon.png")}
          className="w-10 h-10 bg-white rounded-full "
        />
        <Text className="text-lg font-bold">Freathers</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
          <Entypo name="dots-three-vertical" size={16} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {user?.album && user?.album.length > 0 && (
          <CarouselComponent images={user?.album.map((item) => item.url)} />
        )}
        <View className="p-4">
          {/* Profile information */}
          <View className="flex-row items-center space-x-4">
            <Image
              source={{ uri: user?.profilePic }}
              className="w-20 h-20 rounded-full"
            />
            <View className="flex flex-row justify-evenly items-center space-x-5 flex-1">
              <View className="items-center">
                <Text className="font-bold text-2xl dark:text-white">
                  {user?.followers?.length}
                </Text>
                <Text className="text-gray-600 dark:text-gray-300">
                  followers
                </Text>
              </View>
              <View className="items-center">
                <Text className="font-bold text-2xl dark:text-white">
                  {user?.followings?.length}
                </Text>
                <Text className="text-gray-600 dark:text-gray-300">
                  following
                </Text>
              </View>
              <View className="items-center">
                <Text className="font-bold text-2xl dark:text-white">
                  {user?.ratings.length > 0
                    ? (
                        user.ratings.reduce(
                          (acc, curr) => acc + curr.rating,
                          0
                        ) / user.ratings.length
                      ).toFixed(1)
                    : "0.0"}
                  ★
                </Text>
                <Text className="text-gray-600 dark:text-gray-300">rating</Text>
              </View>
            </View>
          </View>

          <View className="flex-col justify-between mt-2">
            <Text className="text-lg font-bold dark:text-white">
              {user?.name}
            </Text>
            <Text className="text-gray-600 dark:text-gray-300">
              @{user?.username}
            </Text>
          </View>

          <Text className="mt-4 text-gray-600 dark:text-gray-300">
            {user?.bio}
          </Text>

          <View className="mt-4 flex-1 flex flex-row justify-center items-center space-x-2">
            <TouchableOpacity
              className="bg-[#FFD1DC] px-4 py-2 rounded-xl flex-1 border-primary/90 border"
              onPress={handleEditProfile}
            >
              <Text className="font-semibold text-base text-center">
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-black dark:border-white px-4 py-2 rounded-xl flex-1"
              onPress={() => handleShare(user?._id)}
            >
              <Text className="font-semibold text-base text-center dark:text-white">
                Share
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-primary/60 px-2 py-2 rounded-xl"
              onPress={toggleModal}
            >
              <Text className="font-semibold">
                <Entypo
                  name="dots-three-vertical"
                  size={18}
                  color={colorScheme === "light" ? "black" : "white"}
                />
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contact information */}
          <View className="mt-4 bg-[#FFD1DC]/60 dark:bg-[#FFD1DC] p-4 flex flex-col space-y-3 rounded-lg">
            <Text className="font-bold text-base">Contact business at:</Text>
            <View className="text-gray-800 flex flex-row justify-start items-center space-x-2">
              <Ionicons name="person-sharp" size={18} color="black" />
              <Text className="text-sm">
                {user?.contactDetails?.designation || "N/A"}
              </Text>
            </View>
            <View className="text-gray-800 flex flex-row justify-start items-center space-x-2">
              <FontAwesome6 name="ranking-star" size={18} color="black" />
              <Text className="text-sm">
                {user?.contactDetails?.workingSince || "N/A"}
              </Text>
            </View>
            <View className="text-gray-800 flex flex-row justify-start items-center space-x-2">
              <Entypo name="phone" size={18} color="black" />
              <Text className="text-sm">
                {user?.contactDetails?.contactNumber?.mobile || "N/A"}
              </Text>
            </View>
            <View className="text-gray-800 flex flex-row justify-start items-center space-x-2">
              <Entypo name="mail" size={18} color="black" />
              <Text className="text-sm">{user?.email}</Text>
            </View>
          </View>

          {/* <Image
            source={require("../assets/map.png")}
            className="w-full h-40 mt-4 rounded-lg"
          /> */}
          <MapView
            style={{ width: -32, height: 200, borderRadius: 10 }}
            pitchEnabled={true}
            rotateEnabled={false}
            scrollEnabled={true}
            zoomEnabled={true}
            // mapType="satellite"
            className="w-full h-40 mt-4 rounded-lg"
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={location} />
          </MapView>
          {/* <MapComponent /> */}
          {/* <WebView
            source={{ uri: "https://www.youtube.com/embed/cqyziA30whE" }}
            style={{ marginTop: 20 }}
          /> */}

          <ProfileTabs user={user} post={post} />
        </View>
      </ScrollView>
      <BottomNavigation notify={true} />
      <BottomModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </SafeAreaView>
  );
}
