import React, { useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enquiryService } from "../api/enquiry";
import { useColorScheme } from "nativewind";

export default function EnquirySettingScreen() {
  const navigation = useNavigation();
  const router = useRoute();
  const { enquiry } = router.params;
  const queryClient = useQueryClient();
  const { colorScheme } = useColorScheme();
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

  const handleConnect = () => {
    handleWhatsAppRedirect(enquiry?.fromUser?.phone);
    Alert.alert("Connect", "Connecting with user...");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#222831]">
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CommonProfile", {
              userId: enquiry?.fromUser?._id,
            })
          }
          className="flex-row items-center mb-6"
        >
          <Image
            source={{ uri: enquiry?.fromUser?.profilePic }}
            className="w-12 h-12 rounded-full"
          />
          <View className="ml-4">
            <Text className="font-semibold dark:text-white">
              {enquiry.fromUser?.name}
            </Text>
            <Text className="text-gray-500 dark:text-gray-200">
              @{enquiry.fromUser?.username}
            </Text>
          </View>
        </TouchableOpacity>

        <View className=" flex flex-col flex-1">
          <InfoItem label="Category" value={enquiry?.category} />
          <InfoItem label="Sub-Category" value={enquiry?.subCategory} />
          <InfoItem
            label="Address"
            value={`${enquiry?.city}, ${enquiry?.state}, ${enquiry?.country}`}
          />
          <InfoItem label="Gender" value={enquiry?.gender} />
          <InfoItem label="Age Group" value={enquiry?.ageGroup} />
          <InfoItem label="Description" value={enquiry?.description} />
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
          <Ionicons
            name="trash"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text className="text-center font-semibold ml-2 dark:text-white">
            Delete Enquiry
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoItem = ({ label, value }) => (
  <View className="flex flex-col space-y-1 my-2">
    <Text className="text-gray-600 mb-1 dark:text-white">{label}</Text>
    <Text className="border border-primary rounded-md px-2 dark:text-white py-3">
      {value}
    </Text>
  </View>
);
