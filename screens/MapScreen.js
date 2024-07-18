import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import MapComponent from "../components/Map";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MapScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const onLocationSelect = route.params?.onLocationSelect;

	const handleLocationSelect = ({ coordinate, url }) => {
		if (onLocationSelect) {
			onLocationSelect(coordinate);
			navigation.goBack();
		}
	};

	return (
		<SafeAreaView className="flex-1">
			<View className="flex-1">
				<Text className="text-2xl font-bold text-center py-4">
					Select Location
				</Text>
				<MapComponent onLocationSelect={handleLocationSelect} />
			</View>
		</SafeAreaView>
	);
}
