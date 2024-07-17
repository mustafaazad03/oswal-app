import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import MapComponent from "../components/Map";

export default function MapScreen() {
	const handleLocationSelect = (coordinate) => {
		console.log("Selected location:", coordinate);
	};

	return (
		<SafeAreaView className="flex-1">
			<View className="flex-1">
				<Text className="text-2xl font-bold text-center py-4">Expo Map</Text>
				<MapComponent onLocationSelect={handleLocationSelect} />
			</View>
		</SafeAreaView>
	);
}
