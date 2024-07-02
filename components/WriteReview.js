import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import InputField from "./InputField";
const WriteReview = () => {
  const [openReview, setOpenReview] = useState(false);
  const toggleReview = () => {
    setOpenReview(!openReview);
  };
  return (
    <View>
      <Pressable
        onPress={toggleReview}
        className="flex flex-row justify-start items-center space-x-1"
      >
        <FontAwesome name="edit" size={14} color="black" />
        <Text className="text-base">Write a Review</Text>
      </Pressable>
      {openReview && (
        <View className="flex flex-col space-y-2">
          <View
            className={`px-3 h-14 border border-primary rounded-lg flex items-center flex-row mt-3`}
          >
            <TextInput
              placeholder={"Write your review"}
              placeholderTextColor="gray"
              className=" placeholder:pl-2 pr-8 placeholder:text-dark w-full h-full text-dark bg-transparent placeholder:flex placeholder:flex-row placeholder:items-center placeholder:justify-center"
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Pressable className="self-start bg-primary rounded-lg">
            <Text className="px-4 py-3 text-black">Submit</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default WriteReview;
