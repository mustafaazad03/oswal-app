import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import FilterComponent from "../components/FilterComponent";
import ExpandableButton from "../components/ExtendeblePlusButton";
import BottomNavigation from "../components/BottomNavigation";

const posts = [
  {
    id: "1",
    username: "Alias Grace",
    handle: "@alias_grace21",
    image: require("../assets/random.png"),
    description: "Lorem Ipsum Dolor sit",
    likes: "abcd and others",
  },
  {
    id: "2",
    username: "Kevin Smith",
    handle: "@smith_kevin",
    image: require("../assets/random.png"),
    description: "Another post description",
    likes: "xyz and others",
  },
];

export default function FeedScreen() {
  const renderItem = ({ item }) => (
    <View className="mb-4">
      <View className="flex-row items-center p-4 px-0 justify-between">
        <View className="flex-row items-center">
          <Image
            source={require("../assets/random2.png")}
            className="w-10 h-10 rounded-full mr-2 border border-primary"
          />
          <View>
            <Text className="font-bold">{item.username}</Text>
            <Text className="text-gray-500">{item.handle}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={require("../assets/menu_icon.png")}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
      <Image source={item.image} className="w-full h-80 object-cover" />
      <View className="flex-row justify-between p-2 pt-4">
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity>
            <Image
              source={require("../assets/like_icon.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/share_icon.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity>
            {/* Download Icon */}
            <Image
              source={require("../assets/download_icon.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            {/* Whatsapp Icon */}
            <Image
              source={require("../assets/whatsapp_icon.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            {/* Call Icon */}
            <Image
              source={require("../assets/call_icon.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-2">
        <Text className="text-xs">
          Liked by <Text className="font-semibold">{item.likes}</Text>
        </Text>
        <Text className="font-extrabold">
          {item.username}{" "}
          <Text className="font-normal">{item.description}</Text>
        </Text>
      </View>
    </View>
  );

  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4 bg-primary pt-8">
        <Image source={require("../assets/icon.png")} className="w-10 h-10" />
        <Text className="text-lg font-bold">Freathers</Text>
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
            <Image
              source={require("../assets/user_icon.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
      <FilterComponent />
      <BottomNavigation notify={true} />
    </SafeAreaView>
  );
}
