import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ExpandableButton from "../components/ExtendeblePlusButton";
import BottomNavigation from "../components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const SettingItem = ({ icon, title, onPress, colorScheme }) => (
  <TouchableOpacity
    className="flex-row items-center py-3 border-b border-gray-200 space-x-3"
    onPress={onPress}
  >
    <Text>{icon}</Text>
    <Text className="flex-1 dark:text-white">{title}</Text>
    <Entypo
      name="chevron-right"
      size={16}
      color={
        colorScheme === "dark"
          ? "white"
          : colorScheme === "dark"
          ? "white"
          : "black"
      }
    />
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#222831]">
      <View className="flex-row justify-start space-x-3 items-center p-4 bg-primary pt-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Settings</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <SettingItem
          icon={
            <Ionicons
              name="person-circle-outline"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")}
          colorScheme={colorScheme}
        />
        <SettingItem
          icon={
            <MaterialIcons
              name="travel-explore"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
          title="Explore Feed"
          onPress={() => {
            navigation.navigate("ExploreSetting");
          }}
          colorScheme={colorScheme}
        />
        {/* <SettingItem
          icon={<FontAwesome5 name="bell" size={20} color={colorScheme==="dark"?"white":"black"} />}
          title="Notifications"
          onPress={() => {
            navigation.navigate("NotificationSetting");
          }}
        /> */}
        <SettingItem
          icon={
            <AntDesign
              name="exclamationcircleo"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
          title="Enquiries"
          onPress={() => {
            navigation.navigate("EnquiriesSetting");
          }}
          colorScheme={colorScheme}
        />
        <SettingItem
          icon={
            <Octicons
              name="shield-lock"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
          title="Password & Security"
          onPress={() => {
            navigation.navigate("PasswordSecurity");
          }}
          colorScheme={colorScheme}
        />
        <SettingItem
          icon={
            <MaterialIcons
              name="privacy-tip"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
          title="Account Privacy"
          onPress={() => {
            navigation.navigate("AccountPrivacy");
          }}
          colorScheme={colorScheme}
        />
        {/* <SettingItem
          icon={
            <Ionicons name="chatbox-ellipses-outline" size={20} color={colorScheme==="dark"?"white":"black"} />
          }
          title="Messages"
          onPress={() => {}}
        /> */}
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="delete-clock-outline"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
          title="Deleted Feeds"
          onPress={() => {
            navigation.navigate("DeletedFeed");
          }}
          colorScheme={colorScheme}
        />
        <SettingItem
          icon={
            <MaterialIcons
              name="block"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
          title="Blocked Accounts"
          onPress={() => {
            navigation.navigate("BlockedAccounts");
          }}
          colorScheme={colorScheme}
        />
        <SettingItem
          icon={
            <Ionicons
              name="person-remove-outline"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
          title="Deactivation & Deletion"
          onPress={() => {
            navigation.navigate("DeactivationDeletion");
          }}
          colorScheme={colorScheme}
        />
        {/* <SettingItem
          icon={
            <MaterialIcons name="workspace-premium" size={20} color={colorScheme==="dark"?"white":"black"} />
          }
          title="Premium"
          onPress={() => {}}
        /> */}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation notify={false} />
    </SafeAreaView>
  );
}
