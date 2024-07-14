import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ExpandableButton from "../components/ExtendeblePlusButton";
import BottomNavigation from "../components/BottomNavigation";

const NotificationOption = ({ title, options, selectedOption, onSelect }) => (
  <View className="mb-4">
    <Text className="font-bold mb-2">{title}</Text>
    {options.map((option, index) => (
      <TouchableOpacity
        key={index}
        className="flex-row items-center mb-2"
        onPress={() => onSelect(option)}
      >
        <View
          className={`w-5 h-5 rounded-full border-2 border-primary mr-2 ${
            selectedOption === option ? "bg-primary" : ""
          }`}
        />
        <Text>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default function NotificationsSettingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [likesOption, setLikesOption] = useState("Off");
  const [tagsOption, setTagsOption] = useState("Off");
  const [followerRequests, setFollowerRequests] = useState("On");
  const [acceptedFollowing, setAcceptedFollowing] = useState("On");
  const [accountSuggestions, setAccountSuggestions] = useState("On");
  const [notificationBySMS, setNotificationBySMS] = useState("On");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-primary py-4 px-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/arrow_back.png")}
            className="w-6 h-6"
          />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-4">Notifications</Text>

        <TouchableOpacity className="ml-auto">
          <Image source={require("../assets/check.png")} className="w-6 h-6" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="font-bold">Turn off notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#767577", true: "#FFD1DC" }}
            thumbColor={notificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
          />
        </View>

        <NotificationOption
          title="Likes"
          options={["Off", "From people you follow", "From everyone"]}
          selectedOption={likesOption}
          onSelect={setLikesOption}
        />

        <NotificationOption
          title="Tags"
          options={["Off", "From people you follow", "From everyone"]}
          selectedOption={tagsOption}
          onSelect={setTagsOption}
        />

        <NotificationOption
          title="Follower Requests"
          options={["On", "Off"]}
          selectedOption={followerRequests}
          onSelect={setFollowerRequests}
        />

        <NotificationOption
          title="Accepted Following Request"
          options={["On", "Off"]}
          selectedOption={acceptedFollowing}
          onSelect={setAcceptedFollowing}
        />

        <NotificationOption
          title="Account Suggestions"
          options={["On", "Off"]}
          selectedOption={accountSuggestions}
          onSelect={setAccountSuggestions}
        />

        <NotificationOption
          title="Notification by SMS"
          options={["On", "Off"]}
          selectedOption={notificationBySMS}
          onSelect={setNotificationBySMS}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation notify={false} />
    </SafeAreaView>
  );
}
