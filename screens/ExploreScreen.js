import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ScrollView,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Button from "../components/Button";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../api/user";
import { useAuth } from "../context/AuthContext";
import { categoriesOptions } from "../functions/categories";
import { exploreItems } from "../functions/subCategories";

export default function ExploreScreen() {
	const navigation = useNavigation();
	const { user: authUser } = useAuth();
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [selectedCategories, setSelectedCategories] = useState({});
	const [termsAgreed, setTermsAgreed] = useState(false);

	const updateUserMutation = useMutation({
		mutationFn: (updateData) =>
			userService.updateUser(authUser?.userId, updateData),
		onSuccess: () => {
			Alert.alert("Success", "Explore preferences saved successfully");
			navigation.navigate("Home");
		},
		onError: (error) => {
			console.error("Error updating user:", error);
			Alert.alert("Error", "Failed to save explore preferences");
		},
	});

	const toggleCategory = useCallback((title) => {
		setSelectedCategories((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	}, []);

	const handleSave = useCallback(() => {
		if (!termsAgreed) {
			Alert.alert("Error", "Please agree to the Terms & Conditions");
			return;
		}

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
	}, [
		termsAgreed,
		selectedCategories,
		category,
		subCategory,
		updateUserMutation,
	]);

	const filteredItems = useMemo(() => {
		return exploreItems.filter((item) => {
			if (category && item.category !== category) return false;
			if (subCategory && item.subCategory !== subCategory) return false;
			return true;
		});
	}, [category, subCategory]);

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

	const renderCategory = useCallback(
		({ item }) => {
			const isSelected = selectedCategories[item.title] || false;

			return (
				<TouchableOpacity
					className="w-[48%] aspect-square mb-4 rounded-lg overflow-hidden"
					onPress={() => toggleCategory(item.title)}
				>
					<Image
						source={{ uri: item.image }}
						className="w-full h-full"
						resizeMode="cover"
					/>
					<View className="absolute bottom-0 left-0 right-0 bg-black/20 h-full bg-opacity-50 p-2 flex justify-end">
						<Text className="text-white font-bold">{item.title}</Text>
					</View>
					{isSelected && (
						<View className="absolute top-2 right-2 bg-primary rounded-full p-1">
							<Image
								source={require("../assets/check.png")}
								className="w-4 h-4"
							/>
						</View>
					)}
				</TouchableOpacity>
			);
		},
		[selectedCategories, toggleCategory]
	);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<TouchableOpacity
				className="absolute top-10 left-4 z-50"
				onPress={() => navigation.goBack()}
			>
				<Image
					source={require("../assets/arrow_back.png")}
					className="w-6 h-6"
				/>
			</TouchableOpacity>

			<ScrollView className="mt-16 w-full p-4">
				<Text className="text-2xl font-bold mb-2">Explore</Text>
				<Text className="text-sm text-gray-500 mb-4">
					This will customize your home feed.
				</Text>

				<View className="border border-primary rounded-lg mb-4">
					<Picker selectedValue={category} onValueChange={handleCategoryChange}>
						<Picker.Item label="Select Product/Service Category" value="" />
						<Picker.Item label="Doctor" value="doctor" />
						<Picker.Item label="Engineer" value="engineer" />
						<Picker.Item label="Musician" value="musician" />
						<Picker.Item label="Other" value="other" />
						<Picker.Item label="Scientist" value="scientist" />
						<Picker.Item label="Artist" value="artist" />
						<Picker.Item label="Athlete" value="athlete" />
						<Picker.Item label="Writer" value="writer" />
						<Picker.Item label="Business" value="business" />
						<Picker.Item label="Educator" value="educator" />
						<Picker.Item label="Healthcare" value="healthcare" />
						<Picker.Item label="Technology" value="technology" />
					</Picker>
				</View>

				<View className="border border-primary rounded-lg mb-4">
					<Picker selectedValue={subCategory} onValueChange={setSubCategory}>
						{subCategoryItems.map((item) => (
							<Picker.Item
								key={item.value}
								label={item.label}
								value={item.value}
							/>
						))}
					</Picker>
				</View>

				<View className="flex-row flex-wrap justify-between">
					{filteredItems.map((item) => (
						<React.Fragment key={item.title}>
							{renderCategory({ item })}
						</React.Fragment>
					))}
				</View>

				<View className="flex-row items-center mt-4">
					<TouchableOpacity
						className="mr-2"
						onPress={() => setTermsAgreed(!termsAgreed)}
					>
						<View
							className={`w-5 h-5 border-2 border-primary rounded-sm ${
								termsAgreed ? "bg-primary" : ""
							}`}
						/>
					</TouchableOpacity>
					<Text className="text-sm">
						I agree with <Text className="underline">Terms & Conditions</Text>.
					</Text>
				</View>

				<Button
					title={updateUserMutation.isLoading ? "Saving..." : "Next"}
					onPress={handleSave}
					disabled={updateUserMutation.isLoading}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}
