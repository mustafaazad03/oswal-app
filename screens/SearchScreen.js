import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ExpandableButton from "../components/ExtendeblePlusButton";
import BottomNavigation from "../components/BottomNavigation";

const sampleData = [
  { id: "1", image: require("../assets/random.png") },
  { id: "2", image: require("../assets/random2.png") },
  { id: "3", image: require("../assets/random.png") },
  // Add more sample data as needed
];

export default function SearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState("");

  const renderItem = ({ item }) => (
    <TouchableOpacity className="w-1/3 aspect-square p-1">
      <Image source={item.image} className="w-full h-full rounded-lg" />
    </TouchableOpacity>
  );

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

      <View className="flex-row justify-around p-4">
        <TouchableOpacity className="bg-primary px-4 py-2 rounded-full">
          <Text>Profiles</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-primary px-4 py-2 rounded-full">
          <Text>Feeds</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-primary px-4 py-2 rounded-full">
          <Image
            source={require("../assets/funnel_icon.png")}
            className="w-4 h-4 mr-2"
          />
          <Text>Filter Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sampleData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={{ padding: 4 }}
      />

      <BottomNavigation notify={false} />
    </SafeAreaView>
  );
}
