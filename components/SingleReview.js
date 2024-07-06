import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const SingleReview = ({ review }) => {
	return (
		<View className="flex flex-col space-y-3 py-2">
			<View className="flex flex-row justify-between items-center">
				<View className="flex flex-row space-x-4 justify-center items-center">
					<Image
						source={{
							uri:
								review.reviewerProfilePic ||
								require("../assets/Logo/google-9646e5e7.png"),
						}}
						className="w-6 h-6 rounded-full bg-white"
					/>
					<Text className="font-bold text-lg">{review.reviewerName}</Text>
				</View>
				<TouchableOpacity>
					<Image
						source={require("../assets/menu_icon.png")}
						className="w-6 h-6 rounded-full"
					/>
				</TouchableOpacity>
			</View>
			<Text>{review.review}</Text>
			<Text>{new Date(review.createdAt).toLocaleDateString()}</Text>
		</View>
	);
};

export default SingleReview;
