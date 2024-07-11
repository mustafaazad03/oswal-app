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
import { Ionicons } from "@expo/vector-icons";

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
			<View className="bg-primary/80 py-4 px-4 flex-row items-center">
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
					<TouchableOpacity className="ml-auto bg-white border border-primary rounded-full px-4 py-1">
						<Text className="text-primary">Following</Text>
					</TouchableOpacity>
				</View>

				<View className="space-y-4">
					<View>
						<Text className="text-gray-600 mb-1">Category</Text>
						<View className="border border-primary rounded-md">
							<Picker
								selectedValue={formData.category}
								onValueChange={(value) => handleInputChange("category", value)}
							>
								<Picker.Item label="Select Category" value="" />
								<Picker.Item label="Fashion" value="fashion" />
								<Picker.Item label="Food" value="food" />
								<Picker.Item label="Travel" value="travel" />
								<Picker.Item label="Health" value="health" />
								<Picker.Item label="Technology" value="technology" />
								<Picker.Item label="Education" value="education" />
								<Picker.Item label="Sports" value="sports" />
								<Picker.Item label="Music" value="music" />
								{/* Add more category options here */}
							</Picker>
						</View>
					</View>

					<View>
						<Text className="text-gray-600 mb-1">Sub-Category</Text>
						<View className="border border-primary rounded-md">
							<Picker
								selectedValue={formData.subCategory}
								onValueChange={(value) =>
									handleInputChange("subCategory", value)
								}
							>
								<Picker.Item label="Select Sub-Category" value="" />
								<Picker.Item label="Product Review" value="product_review" />
								<Picker.Item label="Travel Guide" value="travel_guide" />
								<Picker.Item label="Health Tips" value="health_tips" />
								<Picker.Item label="Technology News" value="technology_news" />
								<Picker.Item
									label="Educational Content"
									value="educational_content"
								/>
								<Picker.Item label="Sports News" value="sports_news" />
								<Picker.Item label="Music Review" value="music_review" />
								{/* Add more sub-category options here */}
							</Picker>
						</View>
					</View>

					<View>
						<Text className="text-gray-600 mb-1">Address</Text>
						<TextInput
							className="border border-primary rounded-md p-2"
							value={formData.address}
							onChangeText={(text) => handleInputChange("address", text)}
							placeholder="Enter Address"
						/>
					</View>

					<View>
						<Text className="text-gray-600 mb-1">Gender</Text>
						<View className="border border-primary rounded-md">
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
						<View className="border border-primary rounded-md">
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
							className="border border-primary rounded-md p-2"
							value={formData.description}
							onChangeText={(text) => handleInputChange("description", text)}
							placeholder="Enter Description"
							multiline
							numberOfLines={4}
						/>
					</View>
				</View>

				<TouchableOpacity className="bg-primary rounded-md py-3 mt-6 flex-row items-center justify-center">
					<Ionicons name="chatbubble-ellipses" size={24} color="black" />
					<Text className="text-dark text-center font-semibold ml-2">
						Connect
					</Text>
				</TouchableOpacity>

				<TouchableOpacity className="border border-primary rounded-md py-3 mt-4 mb-8 flex-row items-center justify-center">
					<Ionicons name="trash" size={24} color="black" />
					<Text className="text-center font-semibold ml-2">Delete Enquiry</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}
