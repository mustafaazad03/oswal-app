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
const SettingItem = ({ icon, title, onPress }) => (
  <TouchableOpacity
    className="flex-row items-center py-3 border-b border-gray-200 space-x-3"
    onPress={onPress}
  >
    <Text>{icon}</Text>
    <Text className="flex-1">{title}</Text>
    <Entypo name="chevron-right" size={16} color="black" />
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-start space-x-3 items-center p-4 bg-primary pt-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Settings</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <SettingItem
          icon={
            <Ionicons name="person-circle-outline" size={20} color="black" />
          }
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <SettingItem
          icon={<MaterialIcons name="travel-explore" size={20} color="black" />}
          title="Explore Feed"
          onPress={() => {
            navigation.navigate("ExploreSetting");
          }}
        />
        <SettingItem
          icon={<FontAwesome5 name="bell" size={20} color="black" />}
          title="Notifications"
          onPress={() => {
            navigation.navigate("NotificationSetting");
          }}
        />
        <SettingItem
          icon={<AntDesign name="exclamationcircleo" size={20} color="black" />}
          title="Enquiries"
          onPress={() => {
            navigation.navigate("EnquiriesSetting");
          }}
        />
        <SettingItem
          icon={<Octicons name="shield-lock" size={20} color="black" />}
          title="Password & Security"
          onPress={() => {
            navigation.navigate("PasswordSecurity");
          }}
        />
        <SettingItem
          icon={<MaterialIcons name="privacy-tip" size={20} color="black" />}
          title="Account Privacy"
          onPress={() => {
            navigation.navigate("AccountPrivacy");
          }}
        />
        <SettingItem
          icon={
            <Ionicons name="chatbox-ellipses-outline" size={20} color="black" />
          }
          title="Messages"
          onPress={() => {}}
        />
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="delete-clock-outline"
              size={20}
              color="black"
            />
          }
          title="Deleted Feeds"
          onPress={() => {
            navigation.navigate("DeletedFeed");
          }}
        />
        <SettingItem
          icon={<MaterialIcons name="block" size={20} color="black" />}
          title="Blocked Accounts"
          onPress={() => {
            navigation.navigate("BlockedAccounts");
          }}
        />
        <SettingItem
          icon={
            <Ionicons name="person-remove-outline" size={20} color="black" />
          }
          title="Deactivation & Deletion"
          onPress={() => {
            navigation.navigate("DeactivationDeletion");
          }}
        />
        <SettingItem
          icon={
            <MaterialIcons name="workspace-premium" size={20} color="black" />
          }
          title="Premium"
          onPress={() => {}}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation notify={false} />
    </SafeAreaView>
  );
}
