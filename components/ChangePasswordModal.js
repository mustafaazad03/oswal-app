import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Image,
	Animated,
	Easing,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordModal = () => {
	const navigation = useNavigation();
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [logOutAll, setLogOutAll] = useState(false);
	const slideAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(slideAnim, {
			toValue: 1,
			duration: 300,
			easing: Easing.out(Easing.ease),
			useNativeDriver: true,
		}).start();
	}, []);

	const closeModal = () => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			easing: Easing.in(Easing.ease),
			useNativeDriver: true,
		}).start(() => navigation.goBack());
	};

	const handleChangePassword = () => {
		// Implement password change logic here
		console.log("Password changed");
		closeModal();
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView className="flex-1 bg-pink-100">
				<StatusBar style="dark" />
				<Animated.View
					className="flex-1 bg-white rounded-t-3xl"
					style={{
						transform: [
							{
								translateY: slideAnim.interpolate({
									inputRange: [0, 1],
									outputRange: [300, 0],
								}),
							},
						],
					}}
				>
					<View className="p-4">
						<TouchableOpacity onPress={closeModal} className="self-start mb-4">
							<Image
								source={require("../assets/arrow_back.png")}
								className="w-6 h-6"
							/>
						</TouchableOpacity>
						<Text className="text-xl font-bold mb-6">Change password</Text>

						<Text className="text-sm text-gray-600 mb-4">
							Password must be at least 8 Characters and must contain at least a
							Capital Letter, a Number and a Special Character.
						</Text>

						<View className="space-y-4 mb-6">
							<TextInput
								className="bg-gray-100 p-3 rounded-lg"
								placeholder="Current Password"
								secureTextEntry
								value={currentPassword}
								onChangeText={setCurrentPassword}
							/>
							<TextInput
								className="bg-gray-100 p-3 rounded-lg"
								placeholder="Enter new Password"
								secureTextEntry
								value={newPassword}
								onChangeText={setNewPassword}
							/>
							<TextInput
								className="bg-gray-100 p-3 rounded-lg"
								placeholder="Confirm new Password"
								secureTextEntry
								value={confirmPassword}
								onChangeText={setConfirmPassword}
							/>
						</View>

						<TouchableOpacity>
							<Text className="text-dark/80 mb-4">Forgot Password?</Text>
						</TouchableOpacity>

						<View className="flex-row items-center mb-6">
							<TouchableOpacity
								className="w-6 h-6 border-2 border-gray-400 rounded-full mr-2"
								onPress={() => setLogOutAll(!logOutAll)}
							>
								{logOutAll && (
									<View className="flex-1 bg-primary m-0.5 rounded-full" />
								)}
							</TouchableOpacity>
							<Text>Log out of all devices</Text>
						</View>

						<TouchableOpacity
							className="bg-primary p-4 rounded-lg"
							onPress={handleChangePassword}
						>
							<Text className="text-dark text-center font-bold">
								Change Password
							</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default ChangePasswordModal;
