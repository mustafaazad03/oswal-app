import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const DeleteReviewModal = ({ isVisible, onClose, onConfirm }) => {
	const options = [{ label: "Delete", icon: "delete" }];

	const onOptionPress = (label) => {
		if (label === "Delete") {
			onConfirm();
		}
		onClose();
	};

	return (
		<Modal
			animationType="none"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<TouchableOpacity
				style={{ flex: 1, backgroundColor: "#eec0c840" }}
				activeOpacity={1}
				onPress={onClose}
			>
				<View className="bg-primary w-32 transition duration-200 ease-in-out h-fit absolute right-2 top-28 rounded-xl">
					{options.map((option, index) => (
						<TouchableOpacity
							key={index}
							className="p-2 flex-row items-center"
							onPress={() => onOptionPress(option.label)}
						>
							<AntDesign
								name={option.icon}
								size={18}
								color="black"
								className="w-6 h-6"
							/>
							<Text className="text-xs ml-2 font-medium">{option.label}</Text>
						</TouchableOpacity>
					))}
				</View>
			</TouchableOpacity>
		</Modal>
	);
};

export default DeleteReviewModal;
