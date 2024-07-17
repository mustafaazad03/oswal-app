// components/MapComponent.js
import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapComponent({ onLocationSelect }) {
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [currentLocation, setCurrentLocation] = useState(null);
	const mapRef = useRef(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Permission to access location was denied");
				return;
			}
		})();
	}, []);

	const handleMapPress = (event) => {
		const { coordinate } = event.nativeEvent;
		setSelectedLocation(coordinate);
		onLocationSelect(coordinate);
	};

	const handleGetCurrentLocation = async () => {
		try {
			let location = await Location.getCurrentPositionAsync({});
			const { latitude, longitude } = location.coords;
			setCurrentLocation({ latitude, longitude });
			setSelectedLocation({ latitude, longitude });
			mapRef.current?.animateToRegion({
				latitude,
				longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			});
		} catch (error) {
			Alert.alert("Error", "Unable to fetch current location");
		}
	};

	const handleResetLocation = () => {
		setSelectedLocation(null);
		setCurrentLocation(null);
		mapRef.current?.animateToRegion({
			latitude: 22.507351,
			longitude: 75.8682,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		});
	};

	return (
		<View className="flex-1">
			<MapView
				ref={mapRef}
				className="w-full h-full"
				initialRegion={{
					latitude: 51.507351,
					longitude: -0.127758,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				onPress={handleMapPress}
			>
				{selectedLocation && (
					<Marker
						coordinate={selectedLocation}
						title="Selected Location"
						description="This is where you clicked or your current location"
					/>
				)}
			</MapView>
			<View className="absolute top-4 left-4 right-4 flex-row justify-between">
				<TouchableOpacity
					className="bg-blue-500 p-2 rounded"
					onPress={handleGetCurrentLocation}
				>
					<Text className="text-white">Get Current Location</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="bg-red-500 p-2 rounded"
					onPress={handleResetLocation}
				>
					<Text className="text-white">Reset</Text>
				</TouchableOpacity>
			</View>
			{selectedLocation && (
				<View className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-md">
					<Text className="text-lg font-bold mb-2">
						{currentLocation ? "Current" : "Selected"} Location:
					</Text>
					<Text>Latitude: {selectedLocation.latitude.toFixed(6)}</Text>
					<Text>Longitude: {selectedLocation.longitude.toFixed(6)}</Text>
				</View>
			)}
		</View>
	);
}
