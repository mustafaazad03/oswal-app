import React, { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const FilterComponent = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const animation = useSharedValue(0);

  const toggleFilter = useCallback(() => {
    setIsOpen(!isOpen);
    animation.value = withSpring(isOpen ? 0 : 1, {
      damping: 20,
      stiffness: 100,
      duration: 300,
    });
  }, [isOpen]);

  const filterStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animation.value,
          [0, 1],
          [height, 0],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animation.value, [0, 1], [0, 0.5], Extrapolate.CLAMP),
  }));

  const filterOptions = [
    {
      icon: (
        <MaterialCommunityIcons
          name="city-variant-outline"
          size={16}
          color="black"
        />
      ),
      text: "My City",
      value: "myCity",
    },
    {
      icon: <MaterialIcons name="near-me" size={16} color="black" />,
      text: "Nearby",
      value: "nearby",
    },
    {
      icon: <AntDesign name="like1" size={16} color="black" />,
      text: "Most Liked",
      value: "mostLiked",
    },
    {
      icon: <Ionicons name="today-outline" size={16} color="black" />,
      text: "Today",
      value: "today",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="calendar-week-begin"
          size={16}
          color="black"
        />
      ),
      text: "Last 7 days",
      value: "lastWeek",
    },
    {
      icon: <MaterialIcons name="calendar-month" size={16} color="black" />,
      text: "Last 1 month",
      value: "lastMonth",
    },
  ];

  const handleFilterSelect = (filterValue) => {
    setSelectedFilter(filterValue);
    onFilterChange(filterValue);
    toggleFilter();
  };

  return (
    <SafeAreaView className="flex-1">
      <TouchableOpacity
        onPress={toggleFilter}
        className="absolute bottom-4 right-4 bg-primary p-3 rounded-full z-10"
      >
        <Feather name="filter" size={16} color="black" />
      </TouchableOpacity>

      <Animated.View
        className="absolute inset-0 bg-black"
        style={backdropStyle}
        pointerEvents={isOpen ? "auto" : "none"}
      >
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={toggleFilter}
        />
      </Animated.View>

      <Animated.View
        className="absolute bottom-20 left-auto right-4 bg-primary rounded-3xl shadow-lg w-40"
        style={filterStyle}
      >
        <View className="p-4 space-y-4 w-fit mx-auto">
          {filterOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center space-x-4 ${
                selectedFilter === option.value ? "bg-secondary" : ""
              }`}
              onPress={() => handleFilterSelect(option.value)}
            >
              <Text>{option.icon}</Text>
              <Text className="text-base text-gray-800">{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default FilterComponent;
