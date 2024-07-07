import React, { useState } from "react";
import {
	View,
	Text,
	Pressable,
	TextInput,
	ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const WriteReview = ({ onSubmit, isLoading }) => {
	const [openReview, setOpenReview] = useState(false);
	const [review, setReview] = useState("");

	const toggleReview = () => {
		setOpenReview(!openReview);
	};

	const handleSubmit = () => {
		if (review.trim()) {
			onSubmit(review);
			setReview("");
			setOpenReview(false);
		}
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
							value={review}
							onChangeText={setReview}
							placeholder="Write your review"
							placeholderTextColor="gray"
							className="placeholder:pl-2 pr-8 placeholder:text-dark w-full h-full text-dark bg-transparent placeholder:flex placeholder:flex-row placeholder:items-center placeholder:justify-center"
							multiline={true}
							numberOfLines={4}
						/>
					</View>
					<Pressable
						className="self-start bg-primary rounded-lg"
						onPress={handleSubmit}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator
								size="small"
								color="#eec0c8"
								style={{ padding: 10 }}
							/>
						) : (
							<Text className="px-4 py-3 text-black">Submit</Text>
						)}
					</Pressable>
				</View>
			)}
		</View>
	);
};

export default WriteReview;
