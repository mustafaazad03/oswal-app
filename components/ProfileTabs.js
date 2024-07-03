import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import ReviewTab from "./ReviewTab";
import HomeProfileFeed from "./HomeProfileFeed";

const ProfileTabs = () => {
	const [activeTab, setActiveTab] = useState("Home");

	const tabs = ["Home", "Feed", "Ratings & Reviews"];

	const renderTabContent = () => {
		switch (activeTab) {
			case "Home":
				return <HomeProfileFeed />;
			case "Feed":
				return (
					<View className="mt-4">
						<Text className="font-bold mb-2">My Album</Text>
						<View className="flex-row flex-wrap gap-1">
							{[...Array(15)].map((_, index) => (
								<Image
									key={index}
									source={require("../assets/random.png")}
									className="w-[32%] h-32 p-1"
								/>
							))}
						</View>
					</View>
				);
			case "Ratings & Reviews":
				return <ReviewTab />;
			default:
				return null;
		}
	};

	return (
		<View className="mt-4">
			<View className="flex-row justify-around border-b border-gray-200">
				{tabs.map((tab) => (
					<TouchableOpacity
						key={tab}
						onPress={() => setActiveTab(tab)}
						className={`py-2 px-4 ${
							activeTab === tab ? "border-b-2 border-black" : ""
						}`}
					>
						<Text
							className={`font-semibold ${
								activeTab === tab ? "text-dark" : "text-gray-600"
							}`}
						>
							{tab}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			<ScrollView className="mt-4">{renderTabContent()}</ScrollView>
		</View>
	);
};

export default ProfileTabs;
