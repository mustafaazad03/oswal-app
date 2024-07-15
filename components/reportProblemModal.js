import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Modal,
	Alert,
	Image,
} from "react-native";
import { postService } from "../api/feed";

export default function ReportProblemModal({ isVisible, onClose, userId }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = async () => {
		try {
			await postService.createReport({ title, description, userId });
			Alert.alert("Report submitted successfully");
			onClose();
		} catch (error) {
			console.error("Error submitting report:", error);
			Alert.alert("An error occurred. Please try again.");
		}
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<View className="flex-1 justify-center items-center bg-primary/50">
				<View className="bg-white p-6 rounded-lg w-5/6 ">
					<View className="flex-row items-center mb-4 border-b border-gray-600 pb-4">
						<TouchableOpacity onPress={onClose}>
							<Image
								source={require("../assets/arrow_back.png")}
								className="w-6 h-6"
							/>
						</TouchableOpacity>
						<Text className="text-xl font-bold ml-4">Report User</Text>
					</View>
					<TextInput
						className="border border-gray-300 p-2 rounded mb-4"
						placeholder="Title"
						value={title}
						onChangeText={setTitle}
					/>
					<TextInput
						className="border border-gray-300 p-2 rounded mb-4 h-32"
						placeholder="Description"
						multiline
						value={description}
						onChangeText={setDescription}
					/>
					<TouchableOpacity
						className="bg-primary p-3 rounded"
						onPress={handleSubmit}
					>
						<Text className="text-white text-center font-bold">
							Submit Report
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
