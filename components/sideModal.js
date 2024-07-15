import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SideModal({ isVisible, onClose, onOptionPress, isFollowing }) {
	const options = [
		{ label: "Rate", icon: "staro" },
		{ label: "Review", icon: "edit" },
		{ label: "View Profile", icon: "user" },
    { label: isFollowing ? "Unfollow" : "Follow", icon: isFollowing ? "disconnect" : "adduser" },
		{ label: "Block", icon: "minuscircleo" },
		{ label: "Report a problem", icon: "warning" },
	];

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
			style={{
				borderTopLeftRadius: 40,
				borderBottomLeftRadius: 40,
			}}
		>
			<TouchableOpacity
				style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
				activeOpacity={1}
				onPress={onClose}
			>
				<View className="bg-white w-56 h-full absolute right-0">
					<View className="p-4 pb-2">
						<Text className="text-lg font-bold">Options</Text>
					</View>
					{options.map((option, index) => (
						<TouchableOpacity
							key={index}
							className="p-4 flex-row items-center"
							onPress={() => onOptionPress(option.label)}
						>
							<AntDesign
								name={option.icon}
								size={24}
								color="black"
								className="mr-4 w-6 h-6"
							/>
							<Text className="text-base ml-2 font-medium">{option.label}</Text>
						</TouchableOpacity>
					))}
				</View>
			</TouchableOpacity>
		</Modal>
	);
}
