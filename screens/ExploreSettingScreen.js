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
import { categoriesOptions } from "../functions/categories";
import { exploreItems } from "../functions/subCategories";
import BottomNavigation from "../components/BottomNavigation";

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

  const toggleCategory = useCallback((title) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }, []);

  const filteredItems = useMemo(() => {
    return exploreItems.filter((item) => {
      if (category && item.category !== category) return false;
      if (subCategory && item.subCategory !== subCategory) return false;
      return true;
    });
  }, [category, subCategory]);

  const renderCategory = useCallback(
    ({ item }) => {
      const isSelected = selectedCategories[item.title];
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

  const ListHeader = useMemo(() => {
    const subCategoryItems = categoriesOptions[category]?.map((subCat) => ({
      label: subCat,
      value: subCat,
    })) || [{ label: "Select", value: "" }];
    return (
      <>
        <PickerSection
          label="Product/Service Category"
          value={category}
          onValueChange={(value) => {
            setCategory(value);
            setSubCategory("");
          }}
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
  }, [category, subCategory]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Header navigation={navigation} />
      <FlatList
        ListHeaderComponent={ListHeader}
        data={filteredItems}
        renderItem={renderCategory}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 16 }}
      />
      <BottomNavigation notify={false} />
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
