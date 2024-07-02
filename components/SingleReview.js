import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const SingleReview = () => {
  return (
    <View className="flex flex-col space-y-3 py-2">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row space-x-4 justify-center items-center">
          <Image
            source={require("../assets/Logo/google-9646e5e7.png")}
            className="w-6 h-6 rounded-full bg-white"
          />
          <Text className="font-bold text-lg">John Mike</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require("../assets/menu_icon.png")}
            className="w-6 h-6 rounded-full"
          />
        </TouchableOpacity>
      </View>
      <Text className="">
        ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Seddignissi mme tus nec fringilla
        accumsan
      </Text>
      <Text className="">06/05/2024</Text>
    </View>
  );
};

export default SingleReview;
