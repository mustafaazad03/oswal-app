import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ScrollView,
	TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Button from "../components/Button";

const categories = [
	{ id: "1", name: "Wallpapers", image: require("../assets/random.png") },
	{ id: "2", name: "Fashion", image: require("../assets/random2.png") },
	// Add more categories as needed
];

export default function ExploreScreen() {
	const navigation = useNavigation();
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");

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
					<Picker
						selectedValue={category}
						onValueChange={(value) => setCategory(value)}
					>
						<Picker.Item label="Select Product/Service Category" value="" />
						{/* Add category options here */}
						<Picker.Item label="Doctor" value="doctor" />
						<Picker.Item label="Electrician" value="electrician" />
						<Picker.Item label="Plumber" value="plumber" />
						<Picker.Item label="Engineer" value="engineer" />
						<Picker.Item label="Carpenter" value="carpenter" />
						<Picker.Item label="Painter" value="painter" />
						<Picker.Item label="Mechanic" value="mechanic" />
						<Picker.Item label="Gardener" value="gardener" />
						<Picker.Item label="Driver" value="driver" />
					</Picker>
				</View>

				<View className="border border-primary rounded-lg mb-4">
					<Picker
						selectedValue={subCategory}
						onValueChange={(value) => setSubCategory(value)}
					>
						<Picker.Item label="Select Product/Service Sub-Category" value="" />
						{/* Add sub-category options here */}
						<Picker.Item label="Dentist" value="dentist" />
						<Picker.Item label="Orthopedic" value="orthopedic" />
						<Picker.Item label="Cardiologist" value="cardiologist" />
						<Picker.Item label="Neurologist" value="neurologist" />
						<Picker.Item label="Dermatologist" value="dermatologist" />
						<Picker.Item label="Gynecologist" value="gynecologist" />
						<Picker.Item label="Pediatrician" value="pediatrician" />
						<Picker.Item
							label="Physiotherapist"
							value="
            physiotherapist"
						/>
					</Picker>
				</View>

				<View className="flex-row flex-wrap justify-between">
					{categories.map((item) => (
						<TouchableOpacity
							key={item.id}
							className="w-[48%] aspect-square mb-4 rounded-lg overflow-hidden"
						>
							<Image source={item.image} className="w-full h-full" />
							<View className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
								<Text className="text-white font-bold">{item.name}</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>

				<View className="flex-row items-center mt-4">
					<TouchableOpacity className="mr-2">
						<View className="w-5 h-5 border-2 border-primary rounded-sm" />
					</TouchableOpacity>
					<Text className="text-sm">
						I agree with <Text className="underline">Terms&Conditions</Text>.
					</Text>
				</View>

				<Button title="Next" onPress={() => navigation.navigate("Home")} />
			</ScrollView>
		</SafeAreaView>
	);
}
