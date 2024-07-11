import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	Modal,
	Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../api/user";

export default function ProfileDetailsSettingScreen() {
	const navigation = useNavigation();
	const { fullUser: authUser } = useAuth();
	const [formData, setFormData] = useState({
		name: authUser?.name || "",
		mobile: authUser?.phone || "",
		email: authUser?.email || "",
		gender: authUser?.gender || "",
		dob: authUser?.dob ? new Date(authUser.dob) : new Date(),
		bio: authUser?.bio || "",
	});
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showGenderPicker, setShowGenderPicker] = useState(false);
	const [profileImage, setProfileImage] = useState(
		authUser?.profilePic || null
	);

	const updateUserMutation = useMutation({
		mutationFn: (updateData) =>
			userService.updateUser(authUser?.userId, updateData),
		onSuccess: () => {
			Alert.alert("Success", "Profile details updated successfully");
			navigation.goBack();
		},
		onError: (error) => {
			console.error("Error updating user:", error);
			Alert.alert("Error", "Failed to update profile details");
		},
	});

	const handleImagePicker = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			const selectedImageUri = result.assets[0].uri;
			setProfileImage(selectedImageUri);
		}
	};

	const handleSubmit = async () => {
		const updateData = {
			name: formData.name,
			phone: formData.mobile,
			email: formData.email,
			gender: formData.gender,
			dob: formData.dob.toISOString(),
			bio: formData.bio,
			profilePic: profileImage,
		};

		updateUserMutation.mutate(updateData);
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Back Icon */}
			<View className="bg-[#FFD1DC] p-4 flex-row items-center pt-8 w-full">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/arrow_back.png")}
						className="w-6 h-6 mr-3"
					/>
				</TouchableOpacity>
				<Text className="text-xl font-bold">Personal Details</Text>
				<TouchableOpacity
					className="ml-auto flex items-center flex-row gap-2 w-[40%] justify-end"
					onPress={handleSubmit}
					disabled={updateUserMutation.isLoading}
				>
					<Image source={require("../assets/check.png")} className="w-6 h-6" />
					{updateUserMutation.isLoading && (
						<ActivityIndicator
							size="large"
							color="#FFD1DC"
							style={{ marginTop: 20 }}
						/>
					)}
				</TouchableOpacity>
			</View>

			<ScrollView className="w-full p-4">
				<Text className="text-2xl font-bold mb-2">
					Enter your Personal Details
				</Text>
				<Text className="text-sm text-gray-500 mb-4">
					You can always change this later.
				</Text>

				<TouchableOpacity
					className="items-center mb-4"
					onPress={handleImagePicker}
				>
					{profileImage ? (
						<Image
							source={{
								uri: profileImage,
							}}
							className="w-24 h-24 rounded-full"
						/>
					) : (
						<Image
							source={require("../assets/upload.png")}
							className="w-24 h-24 rounded-full"
						/>
					)}
					<Text className="text-dark bg-primary p-3 py-2 rounded-lg mt-3 font-semibold">
						{profileImage ? "Re-upload Profile Photo" : "Upload Profile Photo"}
					</Text>
				</TouchableOpacity>

				<TextInput
					placeholder="Your name/Business Name*"
					className="border border-primary p-3 rounded-lg mb-4"
					value={formData.name}
					onChangeText={(text) => setFormData({ ...formData, name: text })}
				/>
				<TextInput
					placeholder="Mobile Number*"
					className="border border-primary p-3 rounded-lg mb-4"
					value={formData.mobile}
					onChangeText={(text) => setFormData({ ...formData, mobile: text })}
					keyboardType="phone-pad"
				/>
				<TextInput
					placeholder="E-mail"
					className="border border-primary p-3 rounded-lg mb-4"
					value={formData.email}
					onChangeText={(text) => setFormData({ ...formData, email: text })}
					keyboardType="email-address"
				/>

				<TouchableOpacity
					className="border border-primary p-3 rounded-lg mb-4"
					onPress={() => setShowGenderPicker(true)}
				>
					<Text className={formData.gender ? "text-black" : "text-gray-400"}>
						{formData.gender || "Select Gender"}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => setShowDatePicker(true)}
					className="border border-primary p-3 rounded-lg mb-4"
				>
					<Text className={formData.dob ? "text-black" : "text-gray-400"}>
						{formData.dob ? formData.dob.toLocaleDateString() : "DD/MM/YYYY"}
					</Text>
				</TouchableOpacity>
				{showDatePicker && (
					<DateTimePicker
						value={formData.dob}
						mode="date"
						display="default"
						onChange={(event, date) => {
							setShowDatePicker(false);
							if (date) {
								setFormData({ ...formData, dob: date });
							}
						}}
					/>
				)}
				<TextInput
					placeholder="Bio"
					className="border border-primary px-3 py-1 rounded-lg mb-8 h-32 text-s flex flex-row justify-start items-start"
					value={formData.bio}
					onChangeText={(text) => setFormData({ ...formData, bio: text })}
					multiline
				/>
			</ScrollView>

			<Modal
				transparent={true}
				visible={showGenderPicker}
				animationType="slide"
			>
				<View className="flex-1 justify-end">
					<View className="bg-white p-4 rounded-t-lg">
						<TouchableOpacity onPress={() => setShowGenderPicker(false)}>
							<Text className="text-right text-xl text-red-500">Done</Text>
						</TouchableOpacity>
						<Picker
							selectedValue={formData.gender}
							onValueChange={(itemValue) =>
								setFormData({ ...formData, gender: itemValue })
							}
						>
							<Picker.Item label="Select Gender" value="" />
							<Picker.Item label="Male" value="male" />
							<Picker.Item label="Female" value="female" />
							<Picker.Item label="Other" value="other" />
						</Picker>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}
