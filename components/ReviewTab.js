import { View, Text } from "react-native";
import React from "react";
import RatingComponent from "./RatingComponent";
import SingleReview from "./SingleReview";
import WriteReview from "./WriteReview";

const ReviewTab = () => {
  return (
    <View className="flex flex-col space-y-5">
      <View className="">
        <Text className="font-bold text-xl">Rate this Business</Text>
        <Text className="font-light">Tell others what you think</Text>
      </View>
      <RatingComponent />
      <WriteReview />
      <View className="">
        <Text className="font-bold text-xl">Ratings & Reviews</Text>
        <Text className="font-light">Ratings and Reviews are Verified</Text>
      </View>
      <View className="flex flex-row space-x-5 flex-1">
        <View className="items-center justify-center">
          <Text className="text-5xl font-bold">4.52</Text>
          <Text className="text-primary">5 ratings</Text>
        </View>
        <View
          className="flex flex-1 justify-center"
          // style={{
          //   flex: 4,
          //   justifyContent: "center",
          // }}
        >
          {[...Array(5)].map((count, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 1,
              }}
            >
              <Text>{5 - index}</Text>
              <View className="flex-1 h-5 justify-center rounded-sm mx-2 overflow-hidden">
                <View
                  className="bg-gray-100"
                  style={[
                    {
                      height: 10,
                      // backgroundColor: "#ff8c00",
                      borderRadius: 8,
                      width: `${
                        (count / 5) * 100
                        // reviews.userRating.length
                      }%`,
                    },
                  ]}
                />
              </View>
              <Text>{count}</Text>
            </View>
          ))}
        </View>
      </View>
      <SingleReview />
    </View>
  );
};

export default ReviewTab;
