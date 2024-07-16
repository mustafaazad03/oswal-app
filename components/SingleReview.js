import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const SingleReview = ({ review }) => {
  return (
    <View className="flex flex-col space-y-3 py-2">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row space-x-4 justify-center items-center">
          {review?.user.profilePic && (
            <Image
              source={{
                uri: review.user.profilePic,
              }}
              className="w-6 h-6 rounded-full bg-white"
            />
          )}
          <View className="flex flex-col ">
            <Text className="font-bold text-base">{review?.user?.name}</Text>
            <Text className="font-light text-xs">
              @{review?.user?.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={12} color="black" />
        </TouchableOpacity>
      </View>
      <Text>{review?.review}</Text>
      <Text>{new Date(review?.timestamp).toLocaleDateString()}</Text>
    </View>
  );
};

export default SingleReview;
