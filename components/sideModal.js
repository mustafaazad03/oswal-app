import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SideModal({
	isVisible,
	onClose,
	onOptionPress,
	isFollowing,
	isBlocked,
	isCurrentUser,
}) {
	const options = [
		{ label: "Rate", icon: "staro" },
		{ label: "Review", icon: "edit" },
		{ label: "View Profile", icon: "user" },
		!isCurrentUser && {
			label: isFollowing ? "Unfollow" : "Follow",
			icon: isFollowing ? "disconnect" : "adduser",
		},
		!isCurrentUser && {
			label: isBlocked ? "Unblock" : "Block",
			icon: isBlocked ? "unlock" : "lock",
		},
		{ label: "Report a problem", icon: "warning" },
	].filter(Boolean);

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
				style={{ flex: 1, backgroundColor: "#eec0c860" }}
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
