import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import RatingComponent from "./RatingComponent";
import SingleReview from "./SingleReview";
import WriteReview from "./WriteReview";
import { userService } from "../api/user";
import { useAuth } from "../context/AuthContext";

const ReviewTab = ({ user, reviews, isSelfUser }) => {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [userRating, setUserRating] = useState(0);

  const { data: review, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["ratings", user?._id],
    queryFn: () => userService.getAllRating(user?._id),
    enabled: !!user?._id,
  });

  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / reviews.length).toFixed(2);
  };

  const countRatings = () => {
    const counts = [0, 0, 0, 0, 0];
    reviews?.forEach((r) => {
      counts[Math.floor(r.rating) - 1]++;
    });
    return counts.reverse();
  };

  const averageRating = calculateAverageRating();
  const ratingCounts = countRatings();

  const createRatingMutation = useMutation({
    mutationFn: (ratingData) => userService.createRating(user?._id, ratingData),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user?.username]);
      Alert.alert("Success", "Your review has been submitted.");
    },
    onError: (error) => {
      console.error("Error submitting review:", error);
      Alert.alert("Error", "Failed to submit review. Please try again.");
    },
  });

  const handleSubmitReview = (review) => {
    if (currentUser.userId === user?._id) {
      Alert.alert("Error", "You cannot review your own profile.");
      return;
    }

    if (userRating === 0) {
      Alert.alert(
        "Error",
        "Please select a rating before submitting your review."
      );
      return;
    }

    createRatingMutation.mutate({
      rating: userRating,
      review: review,
      reviewerId: currentUser.userId,
      reviewerName: currentUser.username,
      reviewerProfilePic: currentUser.profilePic,
    });
  };
  // console.log(reviews);
  return (
    <ScrollView className="flex flex-col space-y-5">
      {isSelfUser && (
        <View>
          <View>
            <Text className="font-bold text-xl">Rate this Business</Text>
            <Text className="font-light">Tell others what you think</Text>
          </View>
          <RatingComponent rating={userRating} onRatingChange={setUserRating} />
          <WriteReview
            onSubmit={handleSubmitReview}
            isLoading={createRatingMutation.isLoading}
          />
        </View>
      )}
      <View>
        <Text className="font-bold text-xl dark:text-white">
          Ratings & Reviews
        </Text>
        <Text className="font-light dark:text-white">
          Ratings and Reviews are Verified
        </Text>
      </View>
      <View className="flex flex-row space-x-5 flex-1">
        <View className="items-center justify-center">
          <Text className="text-5xl font-bold dark:text-white">
            {averageRating}
          </Text>
          <Text className="text-primary">{reviews?.length || 0} ratings</Text>
        </View>
        <View className="flex flex-1 justify-center">
          {ratingCounts.map((count, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 1,
              }}
            >
              <Text className="dark:text-white">{5 - index}</Text>
              <View className="flex-1 h-3 justify-center rounded-xl mx-2 overflow-hidden bg-gray-100 ">
                <View
                  className="bg-primary"
                  style={[
                    {
                      height: 10,
                      borderRadius: 8,
                      width: `${(count / (reviews?.length || 1)) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text className="dark:text-white">{count}</Text>
            </View>
          ))}
        </View>
      </View>
      <ScrollView className="">
        {review?.userRating?.map((singleReview, index) => (
          <SingleReview key={index} review={singleReview} />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default ReviewTab;
