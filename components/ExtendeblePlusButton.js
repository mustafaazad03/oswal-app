import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Text, Animated, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ExpandableButton = ({ onRaiseEnquiry, onUploadMedia, onUploadPDF }) => {
	const [isOpen, setIsOpen] = useState(false);
	const animation = useRef(new Animated.Value(0)).current;

	const toggleMenu = () => {
		const toValue = isOpen ? 0 : 1;
		Animated.spring(animation, {
			toValue,
			friction: 5,
			useNativeDriver: true,
		}).start();
		setIsOpen(!isOpen);
	};

	const rotation = {
		transform: [
			{
				rotate: animation.interpolate({
					inputRange: [0, 1],
					outputRange: ["0deg", "45deg"],
				}),
			},
		],
	};

	const menuItemStyle = (translateY, translateX) => ({
		transform: [
			{ scale: animation },
			{
				translateY: animation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, translateY],
				}),
			},
			{
				translateX: animation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, translateX],
				}),
			},
		],
	});

	return (
		<View className="items-center">
			<TouchableOpacity
				className={`${
					isOpen ? "bg-primary" : ""
				} w-14 h-14 rounded-full justify-center items-center shadow-md z-50`}
				onPress={toggleMenu}
			>
				<Animated.View style={rotation}>
					<Image
						source={require("../assets/add_icon.png")}
						className="w-6 h-6"
					/>
				</Animated.View>
			</TouchableOpacity>
			<Animated.View
				style={[menuItemStyle(-120, -96)]}
				className="absolute bottom-0"
			>
				<TouchableOpacity onPress={onRaiseEnquiry}>
					<View className="flex-col items-center justify-center bg-primary rounded-full w-28 h-28 shadow-sm space-y-2">
						<Ionicons
							name="information-circle-outline"
							size={24}
							color="black"
						/>
						<Text className="font-medium text-xs text-center">
							Raise Enquiry
						</Text>
					</View>
				</TouchableOpacity>
			</Animated.View>
			<Animated.View
				style={[menuItemStyle(-240, 0)]}
				className="absolute bottom-0"
			>
				<TouchableOpacity onPress={onUploadMedia}>
					<View className="flex-col items-center justify-center bg-primary rounded-full w-28 h-28 shadow-sm space-y-2">
						<Ionicons name="images-outline" size={24} color="black" />
						<Text className="font-medium text-xs text-center">
							Upload Media
						</Text>
					</View>
				</TouchableOpacity>
			</Animated.View>
			<Animated.View
				style={[menuItemStyle(-120, 96)]}
				className="absolute bottom-0"
			>
				<TouchableOpacity onPress={onUploadPDF}>
					<View className="flex-col items-center justify-center bg-primary rounded-full w-28 h-28 shadow-sm space-y-2">
						<Ionicons name="document-outline" size={24} color="black" />
						<Text className="font-medium text-xs text-center">Enquiry</Text>
					</View>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};

export default ExpandableButton;
