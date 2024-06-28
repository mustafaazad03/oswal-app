import React, { useState, useCallback, useMemo } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	FlatList,
	Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";

const categories = [
	{ id: "1", name: "Wallpapers", image: require("../assets/random.png") },
	{ id: "2", name: "Fashion", image: require("../assets/random2.png") },
	// Add more categories as needed
];

const ANIMATION_DURATION = 200;

export default function ExploreSettingScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [selectedCategories, setSelectedCategories] = useState({});

	const toggleCategory = useCallback((id) => {
		setSelectedCategories((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	}, []);

	const renderCategory = useCallback(
		({ item }) => {
			const isSelected = selectedCategories[item.id];
			const scaleValue = new Animated.Value(isSelected ? 1 : 0);

			const animateSelection = () => {
				Animated.spring(scaleValue, {
					toValue: isSelected ? 0 : 1,
					duration: ANIMATION_DURATION,
					useNativeDriver: true,
				}).start();
				toggleCategory(item.id);
			};

			return (
				<TouchableOpacity
					className="w-[48%] aspect-square mb-4 rounded-lg overflow-hidden"
					onPress={animateSelection}
					activeOpacity={0.7}
				>
					<Image source={item.image} className="w-full h-full" />
					<View className="absolute bottom-0 left-0 right-0 bg-black/20 h-full bg-opacity-50 p-2 flex justify-end">
						<Text className="text-white font-bold">{item.name}</Text>
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

	const ListHeader = useMemo(() => {
		return (
			<>
				<PickerSection
					label="Product/Service Category"
					value={category}
					onValueChange={setCategory}
					items={[
						{ label: "Select", value: "" },
						{ label: "Doctor", value: "doctor" },
						{ label: "Wallpapers", value: "wallpapers" },
						{ label: "Fashion", value: "fashion" },
						{ label: "Electronics", value: "electronics" },
						{ label: "Food", value: "food" },
						{ label: "Furniture", value: "furniture" },
						{ label: "Handmade", value: "handmade" },
						{ label: "Home", value: "home" },
						{ label: "Jewelry", value: "jewelry" },
					]}
				/>
				<PickerSection
					label="Product/Service Sub-Category"
					value={subCategory}
					onValueChange={setSubCategory}
					items={[
						{ label: "Select", value: "" },
						{ label: "Orthologiest", value: "ortho" },
						{ label: "Dentist", value: "dentist" },
						{ label: "General Physician", value: "gp" },
						{ label: "Cardiologist", value: "cardio" },
						{ label: "Dermatologist", value: "derma" },
						{ label: "Gynecologist", value: "gyne" },
					]}
				/>
			</>
		);
	}, [category, subCategory]);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<StatusBar style="dark" />
			<Header navigation={navigation} />
			<FlatList
				ListHeaderComponent={ListHeader}
				data={categories}
				renderItem={renderCategory}
				keyExtractor={(item) => item.id}
				numColumns={2}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				contentContainerStyle={{ padding: 16 }}
			/>
			<BottomNavigation route={route} navigation={navigation} />
		</SafeAreaView>
	);
}

const PickerSection = ({ label, value, onValueChange, items }) => (
	<View className="mb-4">
		<Text className="mb-2 text-gray-700 font-medium">{label}</Text>
		<View className="border border-primary rounded-lg">
			<Picker
				selectedValue={value}
				onValueChange={onValueChange}
				className="h-8"
			>
				{items.map((item) => (
					<Picker.Item key={item.value} label={item.label} value={item.value} />
				))}
			</Picker>
		</View>
	</View>
);

const Header = ({ navigation }) => (
	<View className="bg-[#FFD1DC] p-4 flex-row items-center pt-8">
		<TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
			<Image source={require("../assets/arrow_back.png")} className="w-6 h-6" />
		</TouchableOpacity>
		<Text className="text-xl font-bold flex-1">Explore Feed</Text>
		<TouchableOpacity>
			<Image source={require("../assets/check.png")} className="w-6 h-6" />
		</TouchableOpacity>
	</View>
);

const BottomNavigation = ({ route, navigation }) => {
	const navItems = [
		{ name: "Home", icon: require("../assets/home_icon.png") },
		{ name: "Search", icon: require("../assets/search_icon.png") },
		{ name: "Add", icon: require("../assets/add_icon.png") },
		{ name: "Info", icon: require("../assets/info_icon.png") },
		{ name: "Setting", icon: require("../assets/user_icon.png") },
	];

	return (
		<View className="flex-row justify-around items-center p-4 py-2 border-t border-gray-300 bg-[#FCF2F4]">
			{navItems.map((item) => (
				<TouchableOpacity
					key={item.name}
					className={`rounded-full p-3 ${
						route.name === item.name ||
						(item.name === "Setting" && route.name === "ExploreSetting")
							? "bg-[#FFD1DC]"
							: ""
					}`}
					onPress={() => navigation.navigate(item.name)}
				>
					<Image source={item.icon} className="w-6 h-6" />
				</TouchableOpacity>
			))}
		</View>
	);
};
