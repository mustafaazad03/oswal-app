import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { enquiryService } from "../api/enquiry";

export default function EnquirySettingScreen(enquiry) {
  const navigation = useNavigation();
  //   const route = useRoute();
  //   const { enquiryId = "6673f838210595f4c4cfd6f8" } = route.params;
  const queryClient = useQueryClient();

  //   const {
  //     data: enquiry,
  //     isLoading,
  //     isError,
  //     error,
  //   } = useQuery({
  //     queryKey: ["enquiry", enquiryId],
  //     queryFn: () => enquiryService.getSingleEnquiry(enquiryId),
  //   });
  console.log(enquiry);
  const deleteMutation = useMutation({
    mutationFn: enquiryService.deleteEnquiry,
    onSuccess: () => {
      queryClient.invalidateQueries(["enquiries"]);
      navigation.goBack();
    },
  });

  const handleDelete = () => {
    Alert.alert(
      "Delete Enquiry",
      "Are you sure you want to delete this enquiry?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteMutation.mutate(enquiry._Id) },
      ]
    );
  };

  const handleConnect = () => {
    // Implement your connect logic here
    Alert.alert("Connect", "Connecting with user...");
  };

//   if (isLoading) {
//     return (
//       <SafeAreaView className="flex-1 justify-center items-center bg-white">
//         <ActivityIndicator size="large" color="#FFD1DC" />
//       </SafeAreaView>
//     );
//   }

//   if (isError) {
//     return (
//       <SafeAreaView className="flex-1 justify-center items-center bg-white">
//         <Text>Error: {error.message}</Text>
//       </SafeAreaView>
//     );
//   }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-primary py-4 px-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/arrow_back.png")}
            className="w-6 h-6"
          />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-4">Enquiry Details</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="flex-row items-center mb-6">
          <Image
            source={{ uri: enquiry?.fromUser.profilePic }}
            className="w-12 h-12 rounded-full"
          />
          <View className="ml-4">
            <Text className="font-semibold">{enquiry.fromUser.name}</Text>
            <Text className="text-gray-500">@{enquiry.fromUser.username}</Text>
          </View>
        </View>

        <View className="space-y-4">
          <InfoItem label="Category" value={enquiry.category} />
          <InfoItem label="Sub-Category" value={enquiry.subCategory} />
          <InfoItem
            label="Address"
            value={`${enquiry.city}, ${enquiry.state}, ${enquiry.country}`}
          />
          <InfoItem label="Gender" value={enquiry.gender} />
          <InfoItem label="Age Group" value={enquiry.ageGroup} />
          <InfoItem label="Description" value={enquiry.description} />
        </View>

        <TouchableOpacity
          className="bg-primary rounded-md py-3 mt-6 flex-row items-center justify-center"
          onPress={handleConnect}
        >
          <Ionicons name="chatbubble-ellipses" size={24} color="black" />
          <Text className="text-dark text-center font-semibold ml-2">
            Connect
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border border-primary rounded-md py-3 mt-4 mb-8 flex-row items-center justify-center"
          onPress={handleDelete}
        >
          <Ionicons name="trash" size={24} color="black" />
          <Text className="text-center font-semibold ml-2">Delete Enquiry</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoItem = ({ label, value }) => (
  <View>
    <Text className="text-gray-600 mb-1">{label}</Text>
    <Text className="border border-primary rounded-md p-2">{value}</Text>
  </View>
);
