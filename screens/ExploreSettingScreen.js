import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	FlatList,
	Animated,
	Alert,
	ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { categoriesOptions } from "../functions/categories";
import { exploreItems } from "../functions/subCategories";
import { useColorScheme } from "nativewind";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../api/user";
import { useAuth } from "../context/AuthContext";

const ANIMATION_DURATION = 200;

export default function ExploreSettingScreen() {
	const navigation = useNavigation();
	const { fullUser } = useAuth();
	const queryClient = useQueryClient();

	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [selectedCategories, setSelectedCategories] = useState({});

	// Initialize selections from fullUser
	useEffect(() => {
		if (fullUser?.selections) {
			const initialSelections = fullUser.selections.reduce((acc, selection) => {
				acc[selection.topic] = true;
				return acc;
			}, {});
			setSelectedCategories(initialSelections);

			// Set initial category and subCategory
			if (fullUser.selections.length > 0) {
				setCategory(fullUser.selections[0].category || "");
				setSubCategory(fullUser.selections[0].subCategory || "");
			}
		}
	}, [fullUser]);

	const updateUserMutation = useMutation({
		mutationFn: (updateData) =>
			userService.updateUser(fullUser?._id, updateData),
		onSuccess: () => {
			Alert.alert("Success", "Explore preferences updated successfully");
			queryClient.invalidateQueries(["user", fullUser?._id]);
		},
		onError: (error) => {
			console.error("Error updating user:", error);
			Alert.alert("Error", "Failed to update explore preferences");
		},
	});

	const toggleCategory = useCallback((title) => {
		setSelectedCategories((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	}, []);

	const handleSave = useCallback(() => {
		const selectedCategoriesArray = Object.entries(selectedCategories)
			.filter(([_, isSelected]) => isSelected)
			.map(([title]) => ({
				category,
				subCategory,
				topic: title,
			}));

		const updateData = {
			selections: selectedCategoriesArray,
		};

		updateUserMutation.mutate(updateData);
	}, [selectedCategories, category, subCategory, updateUserMutation]);

	const filteredItems = useMemo(() => {
		return exploreItems.filter((item) => {
			if (category && item.category !== category) return false;
			if (subCategory && item.subCategory !== subCategory) return false;
			return true;
		});
	}, [category, subCategory]);

	const renderCategory = useCallback(
		({ item }) => {
			const isSelected = selectedCategories[item.title] || false;
			const scaleValue = new Animated.Value(isSelected ? 1 : 0);

			const animateSelection = () => {
				Animated.spring(scaleValue, {
					toValue: isSelected ? 0 : 1,
					duration: ANIMATION_DURATION,
					useNativeDriver: true,
				}).start();
				toggleCategory(item.title);
			};

			return (
				<TouchableOpacity
					className="w-[48%] aspect-square mb-4 rounded-lg overflow-hidden"
					onPress={animateSelection}
					activeOpacity={0.7}
				>
					<Image
						source={{ uri: item.image }}
						className="w-full h-full"
						resizeMode="cover"
					/>
					<View className="absolute bottom-0 left-0 right-0 bg-black/20 h-full bg-opacity-50 p-2 flex justify-end">
						<Text className="text-white font-bold">{item.title}</Text>
					</View>
					<Animated.View
						className="absolute top-2 right-2 bg-primary rounded-full p-1"
						style={{
							transform: [{ scale: scaleValue }],
							opacity: scaleValue,
						}}
					>
						<Image
							source={require("../assets/check.png")}
							className="w-4 h-4"
						/>
					</Animated.View>
				</TouchableOpacity>
			);
		},
		[selectedCategories, toggleCategory]
	);

	const subCategoryItems = useMemo(() => {
		return (
			categoriesOptions[category]?.map((subCat) => ({
				label: subCat,
				value: subCat,
			})) || [{ label: "Select", value: "" }]
		);
	}, [category]);

	const handleCategoryChange = useCallback((value) => {
		setCategory(value);
		setSubCategory("");
	}, []);

	const ListHeader = useCallback(() => {
		return (
			<>
				<PickerSection
					label="Product/Service Category"
					value={category}
					onValueChange={handleCategoryChange}
					items={[
						{ label: "Select", value: "" },
						{ label: "Doctor", value: "doctor" },
						{ label: "Engineer", value: "engineer" },
						{ label: "Musician", value: "musician" },
						{ label: "Other", value: "other" },
						{ label: "Scientist", value: "scientist" },
						{ label: "Artist", value: "artist" },
						{ label: "Athlete", value: "athlete" },
						{ label: "Writer", value: "writer" },
						{ label: "Business", value: "business" },
						{ label: "Educator", value: "educator" },
						{ label: "Healthcare", value: "healthcare" },
						{ label: "Technology", value: "technology" },
					]}
				/>
				<PickerSection
					label="Product/Service Sub-Category"
					value={subCategory}
					onValueChange={setSubCategory}
					items={subCategoryItems}
				/>
			</>
		);
	}, [category, subCategory, subCategoryItems, handleCategoryChange]);

	return (
		<SafeAreaView className="flex-1 bg-white dark:bg-[#222831]">
			<StatusBar style="dark" />
			<View className="bg-[#FFD1DC] p-4 flex-row items-center pt-8">
				<TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
					<Image
						source={require("../assets/arrow_back.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
				<Text className="text-xl font-bold flex-1">Explore Feed</Text>
				<TouchableOpacity onPress={handleSave}>
					{updateUserMutation.isLoading ? (
						<ActivityIndicator size="small" color="#FFD1DC" />
					) : (
						<Image
							source={require("../assets/check.png")}
							className="w-6 h-6"
						/>
					)}
				</TouchableOpacity>
			</View>
			<FlatList
				ListHeaderComponent={ListHeader}
				data={filteredItems}
				renderItem={renderCategory}
				keyExtractor={(item) => item.title}
				numColumns={2}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				contentContainerStyle={{ padding: 16 }}
			/>
		</SafeAreaView>
	);
}

const PickerSection = React.memo(({ label, value, onValueChange, items }) => {
	const { colorScheme } = useColorScheme();
	return (
		<View className="mb-4">
			<Text className="mb-2 text-gray-700 font-medium dark:text-gray-200">
				{label}
			</Text>
			<View className="border border-primary rounded-lg">
				<Picker
					selectedValue={value}
					onValueChange={onValueChange}
					className="h-8 dark:text-white"
					style={{ color: colorScheme === "dark" ? "white" : "black" }}
				>
					{items.map((item) => (
						<Picker.Item
							key={item.value}
							label={item.label}
							value={item.value}
						/>
					))}
				</Picker>
			</View>
		</View>
	);
});

PickerSection.displayName = "PickerSection";
