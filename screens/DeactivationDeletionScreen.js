import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNavigation from "../components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";

export default function DeactivationDeletionScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#222831]">
      <View className="bg-[#FFD1DC] p-4 flex-row items-center pt-8">
        <View className="flex flex-row space-x-2 justify-center items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Deactivation & Deletion</Text>
        </View>
      </View>

      <View className="flex-1 items-center justify-center p-4">
        <View className="bg-[#FFE5E5] rounded-full p-4 mb-4">
          <Image
            source={require("../assets/Settings/error.png")}
            className="w-12 h-12"
          />
        </View>
        <Text className="text-center mb-4 dark:text-white">
          To deactivate or delete your account, you need to login through
          desktop browser
        </Text>
      </View>

      {/* Bottom Navigation */}
      {/* <BottomNavigation notify={false} /> */}
    </SafeAreaView>
  );
}
