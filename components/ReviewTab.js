import React from "react";
import { View, Text, ScrollView } from "react-native";
import RatingComponent from "./RatingComponent";
import SingleReview from "./SingleReview";
import WriteReview from "./WriteReview";

const ReviewTab = ({ review }) => {
	const calculateAverageRating = () => {
		if (!review || review.length === 0) return 0;
		const sum = review.reduce((acc, curr) => acc + curr.rating, 0);
		return (sum / review.length).toFixed(2);
	};

	const countRatings = () => {
		const counts = [0, 0, 0, 0, 0];
		review?.forEach((r) => {
			counts[Math.floor(r.rating) - 1]++;
		});
		return counts.reverse();
	};

	const averageRating = calculateAverageRating();
	const ratingCounts = countRatings();

	return (
		<ScrollView className="flex flex-col space-y-5">
			<View>
				<Text className="font-bold text-xl">Rate this Business</Text>
				<Text className="font-light">Tell others what you think</Text>
			</View>
			<RatingComponent />
			<WriteReview />
			<View>
				<Text className="font-bold text-xl">Ratings & Reviews</Text>
				<Text className="font-light">Ratings and Reviews are Verified</Text>
			</View>
			<View className="flex flex-row space-x-5 flex-1">
				<View className="items-center justify-center">
					<Text className="text-5xl font-bold">{averageRating}</Text>
					<Text className="text-primary">{review?.length || 0} ratings</Text>
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
							<Text>{5 - index}</Text>
							<View className="flex-1 h-3 justify-center rounded-xl mx-2 overflow-hidden bg-gray-100">
								<View
									className="bg-primary"
									style={[
										{
											height: 10,
											borderRadius: 8,
											width: `${(count / (review?.length || 1)) * 100}%`,
										},
									]}
								/>
							</View>
							<Text>{count}</Text>
						</View>
					))}
				</View>
			</View>
			{review?.map((singleReview, index) => (
				<SingleReview key={index} review={singleReview} />
			))}
		</ScrollView>
	);
};

export default ReviewTab;
