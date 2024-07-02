import React from "react";
import { Image, Text, View } from "react-native";

export default function Header() {
  return (
    <View className="bg-white h-16 flex items-center justify-center flex-1">
      <Image source={require("../assets/icon.png")} className="w-24 h-24" />
      <Text className="text-black font-bold text-xl">Freathers</Text>
    </View>
  );
}
