import React, { useState, useCallback, useEffect, useRef } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	TextInput,
	FlatList,
	ActivityIndicator,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNavigation from "../components/BottomNavigation";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "../api/client";

export default function SearchScreen() {
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState("");
	const [allData, setAllData] = useState([]);
	const [filteredResults, setFilteredResults] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [activeTab, setActiveTab] = useState("profiles");
	const [isLoading, setIsLoading] = useState(false);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const searchInputRef = useRef(null);

	const fetchAllData = useCallback(async () => {
		setIsLoading(true);
		try {
			const profilesResponse = await axios.get(`${API_URL}/user`);
			const feedsResponse = await axios.get(`${API_URL}/post/all`);
			setAllData({
				profiles: profilesResponse.data,
				feeds: feedsResponse.data,
			});
			setFilteredResults(
				activeTab === "profiles" ? profilesResponse.data : feedsResponse.data
			);
		} catch (error) {
			console.error("Error fetching all data:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAllData();
	}, [fetchAllData]);

	const filterData = useCallback(
		(query) => {
			const currentData =
				allData[activeTab === "profiles" ? "profiles" : "feeds"];
			if (query.length > 2) {
				const filtered = currentData.filter((item) => {
					const searchableText =
						activeTab === "profiles"
							? `${item.name} ${item.username}`.toLowerCase()
							: `${item.caption}`.toLowerCase();
					return searchableText.includes(query.toLowerCase());
				});
				setFilteredResults(filtered);
				setSuggestions(
					filtered.slice(0, 5).map((item) => item.name || item.caption)
				);
				setShowSuggestions(true);
			} else {
				setFilteredResults(currentData);
				setSuggestions([]);
				setShowSuggestions(false);
			}
		},
		[allData, activeTab]
	);

	useEffect(() => {
		filterData(searchQuery);
	}, [searchQuery, filterData]);

	const handleSearch = (text) => {
		setSearchQuery(text);
		if (text.length > 2) {
			setShowSuggestions(true);
		} else {
			setShowSuggestions(false);
		}
	};

	const handleTabChange = (tab) => {
		setActiveTab(tab);
		setSearchQuery("");
		setShowSuggestions(false);
		setFilteredResults(allData[tab === "profiles" ? "profiles" : "feeds"]);
	};

	const handleFilterPress = () => {
		// Implement filter logic here
		console.log("Filter pressed");
	};

	const handleSuggestionPress = (suggestion) => {
		setSearchQuery(suggestion);
		setShowSuggestions(false);
		Keyboard.dismiss();
		filterData(suggestion);
	};

	const dismissSuggestions = () => {
		setShowSuggestions(false);
		Keyboard.dismiss();
	};

	const onPressFeed = (item) => {
		if (activeTab === "feeds") {
			navigation.navigate("ParticularPost", {
				postId: item?._id,
			});
		} else {
			navigation.navigate("CommonProfile", { userId: item._id });
		}
	};

	const renderItem = ({ item }) => {
		if (activeTab === "profiles") {
			return (
				<TouchableOpacity
					className="relative flex flex-row items-center justify-between p-4 hover:bg-gray-50"
					onPress={() => onPressFeed(item)}
				>
					<View className="flex-row items-center">
						<Image
							source={{ uri: item?.profilePic }}
							className="h-12 w-12 rounded-full"
						/>
						<View className="ml-4">
							<Text className="text-sm font-semibold text-dark dark:text-white">
								{item?.name || item.username}
							</Text>
							<Text className="mt-1 text-xs text-gray-500 dark:text-gray-300">
								{item.email}
							</Text>
						</View>
					</View>
					<View className="flex items-center">
						<Text className="text-sm text-dark dark:text-white">
							{item.contactDetails?.designation || "User"}
						</Text>
						{item.socials?.website ? (
							<Text className="mt-1 text-xs text-gray-500">
								Visit: {item.socials?.website}
							</Text>
						) : (
							<View className="mt-1 flex-row items-center">
								<View
									className={`h-1.5 w-1.5 rounded-full ${
										item.isActive ? "bg-emerald-500" : "bg-red-500"
									} mr-1`}
								/>
								<Text className="text-xs text-gray-500 dark:text-gray-300">
									{item.isActive ? "Active" : "Inactive"}
								</Text>
							</View>
						)}
					</View>
				</TouchableOpacity>
			);
		} else {
			// Original grid layout for feeds
			return (
				<TouchableOpacity
					className="w-1/3 aspect-square p-1"
					onPress={() => onPressFeed(item)}
				>
					<Image
						source={{ uri: item.imageUrl }}
						className="w-full h-full rounded-lg"
					/>
				</TouchableOpacity>
			);
		}
	};

	const renderSuggestion = ({ item }) => (
		<TouchableOpacity
			className="p-2 border-b border-gray-200"
			onPress={() => handleSuggestionPress(item)}
		>
			<Text>{item}</Text>
		</TouchableOpacity>
	);

	return (
		<TouchableWithoutFeedback onPress={dismissSuggestions}>
			<SafeAreaView className="flex-1 bg-white dark:bg-[#222831]">
				<View className="flex-row justify-between items-center p-4 bg-primary pt-8">
					<Image
						source={require("../assets/icon.png")}
						className="w-10 h-10 bg-white rounded-full"
					/>
					<Text className="text-lg font-bold">Freathers</Text>
					<TouchableOpacity onPress={() => navigation.navigate("Setting")}>
						<Octicons name="person" size={24} color="black" />
					</TouchableOpacity>
				</View>

				<View className="bg-white dark:bg-primary border border-primary rounded-full flex-row items-center px-4 py-2 mt-4 mx-4">
					<Image
						source={require("../assets/search_icon.png")}
						className="w-5 h-5 mr-2"
					/>
					<TextInput
						ref={searchInputRef}
						placeholder="Search"
						value={searchQuery}
						onChangeText={handleSearch}
						onFocus={() => setShowSuggestions(searchQuery.length > 2)}
						className="flex-1"
					/>
				</View>

				{showSuggestions && suggestions.length > 0 && (
					<View className="absolute top-40 left-4 right-4 bg-white z-10 rounded-lg shadow-md max-h-40">
						<FlatList
							data={suggestions}
							renderItem={renderSuggestion}
							keyExtractor={(item, index) => index.toString()}
						/>
					</View>
				)}

				<View className="flex-row justify-around p-4">
					<TouchableOpacity
						className={`px-4 py-2 rounded-full ${
							activeTab === "profiles" ? "bg-primary" : "bg-gray-200"
						}`}
						onPress={() => handleTabChange("profiles")}
					>
						<Text>Profiles</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className={`px-4 py-2 rounded-full ${
							activeTab === "feeds" ? "bg-primary" : "bg-gray-200"
						}`}
						onPress={() => handleTabChange("feeds")}
					>
						<Text>Feeds</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="flex-row items-center bg-primary px-4 py-2 rounded-full"
						onPress={handleFilterPress}
					>
						<Image
							source={require("../assets/funnel_icon.png")}
							className="w-4 h-4 mr-2"
						/>
						<Text>Filter Search</Text>
					</TouchableOpacity>
				</View>

				{isLoading ? (
					<View className="flex-1 justify-center items-center">
						<ActivityIndicator size="large" color="pink" />
					</View>
				) : (
					<FlatList
						data={filteredResults}
						renderItem={renderItem}
						keyExtractor={(item) => item._id}
						numColumns={activeTab === "feeds" ? 3 : 1}
						key={activeTab} // This forces the FlatList to re-render when switching tabs
						contentContainerStyle={{ padding: 4 }}
						ItemSeparatorComponent={() =>
							activeTab === "profiles" ? (
								<View className="h-px bg-gray-200" />
							) : null
						}
						ListEmptyComponent={
							<View className="flex-1 justify-center items-center">
								<Text>No results found</Text>
							</View>
						}
					/>
				)}

				<BottomNavigation notify={false} />
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}
