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

export default function EnquirySettingScreen() {
	const navigation = useNavigation();
	const [formData, setFormData] = useState({
		category: "",
		subCategory: "",
		address: "",
		gender: "",
		ageGroup: "",
		description: "",
	});

	const handleInputChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="bg-pink-200 py-4 px-4 flex-row items-center">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/arrow_back.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
				<Text className="text-lg font-semibold ml-4">Enquiry</Text>
			</View>

			<ScrollView className="flex-1 px-4 py-6">
				<View className="flex-row items-center mb-6">
					<Image
						source={require("../assets/random.png")}
						className="w-12 h-12 rounded-full"
					/>
					<View className="ml-4">
						<Text className="font-semibold">Alias Grace</Text>
						<Text className="text-gray-500">@alias_grace21</Text>
					</View>
					<TouchableOpacity className="ml-auto bg-white border border-pink-500 rounded-full px-4 py-1">
						<Text className="text-pink-500">Following</Text>
					</TouchableOpacity>
				</View>

				<View className="space-y-4">
					<View>
						<Text className="text-gray-600 mb-1">Category</Text>
						<View className="border border-gray-300 rounded-md">
							<Picker
								selectedValue={formData.category}
								onValueChange={(value) => handleInputChange("category", value)}
							>
								<Picker.Item label="Select Category" value="" />
								{/* Add more category options here */}
							</Picker>
						</View>
					</View>

					<View>
						<Text className="text-gray-600 mb-1">Sub-Category</Text>
						<View className="border border-gray-300 rounded-md">
							<Picker
								selectedValue={formData.subCategory}
								onValueChange={(value) =>
									handleInputChange("subCategory", value)
								}
							>
								<Picker.Item label="Select Sub-Category" value="" />
								{/* Add more sub-category options here */}
							</Picker>
						</View>
					</View>

					<View>
						<Text className="text-gray-600 mb-1">Address</Text>
						<TextInput
							className="border border-gray-300 rounded-md p-2"
							value={formData.address}
							onChangeText={(text) => handleInputChange("address", text)}
							placeholder="Enter Address"
						/>
					</View>

					<View>
						<Text className="text-gray-600 mb-1">Gender</Text>
						<View className="border border-gray-300 rounded-md">
							<Picker
								selectedValue={formData.gender}
								onValueChange={(value) => handleInputChange("gender", value)}
							>
								<Picker.Item label="Select Gender" value="" />
								<Picker.Item label="Male" value="male" />
								<Picker.Item label="Female" value="female" />
								<Picker.Item label="Other" value="other" />
							</Picker>
						</View>
					</View>

					<View>
						<Text className="text-gray-600 mb-1">Age Group</Text>
						<View className="border border-gray-300 rounded-md">
							<Picker
								selectedValue={formData.ageGroup}
								onValueChange={(value) => handleInputChange("ageGroup", value)}
							>
								<Picker.Item label="Select Age Group" value="" />
								<Picker.Item label="18-24" value="18-24" />
								<Picker.Item label="25-34" value="25-34" />
								<Picker.Item label="35-44" value="35-44" />
								<Picker.Item label="45+" value="45+" />
							</Picker>
						</View>
					</View>

					<View>
						<Text className="text-gray-600 mb-1">Description</Text>
						<TextInput
							className="border border-gray-300 rounded-md p-2"
							value={formData.description}
							onChangeText={(text) => handleInputChange("description", text)}
							placeholder="Enter Description"
							multiline
							numberOfLines={4}
						/>
					</View>
				</View>

				<TouchableOpacity className="bg-pink-500 rounded-md py-3 mt-6">
					<Text className="text-white text-center font-semibold">Connect</Text>
				</TouchableOpacity>

				<TouchableOpacity className="border border-gray-300 rounded-md py-3 mt-4">
					<Text className="text-center font-semibold">Delete Enquiry</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}
