import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNavigation from "../components/BottomNavigation";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../api/user";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function AccountPrivacyScreen() {
  const navigation = useNavigation();
  const [isLocked, setIsLocked] = useState(false);
  const { user, fullUser } = useAuth();

  const toggleLock = () => setIsLocked((previousState) => !previousState);

  const mutation = useMutation({
    mutationFn: () => userService.updatePrivacy(user.userId, { isLocked }),
    onSuccess: () => {
      Alert.alert("Success", "Account privacy updated successfully.");
      navigation.goBack();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const updatePrivacy = () => {
    toggleLock();
    if (isLocked === fullUser.isLocked) {
      return;
    }
    mutation.mutate();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-pink-200 p-4 flex-row items-center pt-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Account Privacy</Text>
      </View>

      <View className="p-4 flex-1">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">Lock Account</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#EEC0C8" }}
            thumbColor={isLocked ? "#EEB0C0" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={updatePrivacy}
            value={isLocked}
          />
        </View>
        <Text className="text-gray-600">
          When your account is locked, only the followers that you approve can
          see what you share, including your album and feed, and your followers
          & following lists.
        </Text>
      </View>

      <BottomNavigation notify={false} />
    </SafeAreaView>
  );
}
