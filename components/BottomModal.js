import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Entypo } from "@expo/vector-icons";

const BottomModal = ({ isVisible, onClose }) => {
	const slideAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (isVisible) {
			Animated.spring(slideAnim, {
				toValue: 1,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.spring(slideAnim, {
				toValue: 0,
				useNativeDriver: true,
			}).start();
		}
	}, [isVisible]);

	const translateY = slideAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [300, 0],
	});

	return (
		<Animated.View
			className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-3xl shadow- pt-4"
			style={{
				transform: [{ translateY }],
				display: isVisible ? "flex" : "none",
			}}
			onMagicTap={onClose}
			onPointerMove={onClose}
		>
			<View
				className="w-1/5 h-1 rounded-2xl bg-dark mx-auto"
				onPointerMove={onClose}
			></View>
			<View className="p-4 space-y-4 px-8 text-dark font-medium">
				<TouchableOpacity className="flex-row items-center space-x-3 w-full">
					<Entypo name="cog" size={24} color="black" />
					<Text className="text-sm font-medium text-dark">Settings</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center space-x-3 w-full">
					<Entypo name="bookmark" size={24} color="black" />
					<Text className="text-sm font-medium text-dark">Saved</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center space-x-3 w-full">
					<Entypo name="moon" size={24} color="black" />
					<Text className="text-sm font-medium text-dark">Dark Mode</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center space-x-3 w-full">
					<Entypo name="warning" size={24} color="black" />
					<Text className="text-sm font-medium text-dark">
						Report a problem
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="flex-row items-center space-x-3 w-full border-t border-t-white pt-4"
					onPress={onClose}
				>
					<Entypo name="log-out" size={24} color="black" />
					<Text className="text-sm font-medium text-dark">Log Out</Text>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

export default BottomModal;
