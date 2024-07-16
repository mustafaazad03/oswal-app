import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import ExpandableButton from "../components/ExtendeblePlusButton";
import BottomNavigation from "../components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";

const EditProfileItem = ({ title, onPress }) => (
  <TouchableOpacity
    className="flex-row items-center justify-between py-4 border-b border-gray-200"
    onPress={onPress}
  >
    <Text>{title}</Text>
    <Image
      source={require("../assets/chevron_right.png")}
      className="w-4 h-4"
    />
  </TouchableOpacity>
);

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-[#FFD1DC] p-4 flex-row items-center pt-8">
        <View className="flex flex-row space-x-2 justify-center items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Edit Profile</Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        <EditProfileItem
          title="Personal Details"
          onPress={() => {
            navigation.navigate("PersonalDetailSetting");
          }}
        />
        <EditProfileItem
          title="Business Details"
          onPress={() => {
            navigation.navigate("BusinessDetailSetting");
          }}
        />
        <EditProfileItem
          title="Contact Details"
          onPress={() => {
            navigation.navigate("ContactDetailSetting");
          }}
        />
        <EditProfileItem
          title="My Album"
          onPress={() => {
            navigation.navigate("MyAlbum");
          }}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation notify={false} />
    </SafeAreaView>
  );
}
