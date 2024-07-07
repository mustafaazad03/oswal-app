import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import ReviewTab from "./ReviewTab";
import HomeProfileFeed from "./HomeProfileFeed";
import { Entypo } from "@expo/vector-icons";

const ProfileTabs = ({ user }) => {
	const [activeTab, setActiveTab] = useState("Home");

	const tabs = [
		{
			tab: "Home",
			icon: "home",
		},
		{
			tab: "Feed",
			icon: "grid",
		},
		{
			tab: "Ratings & Reviews",
			icon: "star",
		},
	];

	const renderTabContent = () => {
		switch (activeTab) {
			case "Home":
				return (
					<HomeProfileFeed
						businessDetails={user?.businessDetails}
						contactDetails={user?.contactDetails}
						socials={user?.socials}
					/>
				);
			case "Feed":
				return (
					<View className="mt-4">
						{user.album && user.album.length === 0 && (
							<>
								<Text className="font-bold mb-2">My Album</Text>
								<View className="flex-row flex-wrap gap-1">
									{user.album?.map((item, index) => (
										<Image
											key={index}
											source={{ uri: item.url }}
											className="w-[32%] h-32 p-1"
										/>
									))}
								</View>
							</>
						)}
					</View>
				);
			case "Ratings & Reviews":
				return <ReviewTab review={user?.ratings} />;
			default:
				return null;
		}
	};

	return (
		<View className="mt-4">
			<View className="flex-row justify-around border-b border-gray-200">
				{tabs.map((tab) => (
					<TouchableOpacity
						key={tab.tab}
						onPress={() => setActiveTab(tab.tab)}
						className={`py-2 pr-3 flex-row items-center gap-2 ${
							activeTab === tab.tab ? "border-b-2 border-black" : ""
						}`}
					>
						<Entypo name={tab.icon} size={16} color="black" />
						<Text
							className={`font-semibold ${
								activeTab === tab.tab ? "text-dark" : "text-gray-600"
							}`}
						>
							{tab.tab}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			<ScrollView className="mt-4">{renderTabContent()}</ScrollView>
		</View>
	);
};

export default ProfileTabs;
