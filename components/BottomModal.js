import React, { useEffect, useRef, useState } from "react";
import { logout } from "../api/auth";
import {
	View,
	Text,
	TouchableOpacity,
	Animated,
	Image,
	PanResponder,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import ReportProblemModal from "./reportProblemModal";

const BottomModal = ({ isVisible, onClose }) => {
	const navigation = useNavigation();
	const slideAnim = useRef(new Animated.Value(0)).current;
	const [modalHeight, setModalHeight] = useState(0);
	const { setFullUser, setUser, user } = useAuth();
	const [reportModalVisible, setReportModalVisible] = useState(false);

	const onLogout = () => {
		onClose();
		logout();
		setFullUser(null);
		setUser(null);
		navigation.navigate("Login");
	};

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (_, gestureState) => {
				if (gestureState.dy > 0) {
					slideAnim.setValue(gestureState.dy);
				}
			},
			onPanResponderRelease: (_, gestureState) => {
				if (gestureState.dy > modalHeight / 3) {
					onClose();
				} else {
					Animated.spring(slideAnim, {
						toValue: 0,
						useNativeDriver: true,
					}).start();
				}
			},
		})
	).current;

	useEffect(() => {
		if (isVisible) {
			Animated.spring(slideAnim, {
				toValue: 0,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.spring(slideAnim, {
				toValue: modalHeight,
				useNativeDriver: true,
			}).start();
		}
	}, [isVisible]);

	const translateY = slideAnim.interpolate({
		inputRange: [0, modalHeight],
		outputRange: [0, modalHeight],
		extrapolate: "clamp",
	});

	// close the modal when the user swipes down
	useEffect(() => {
		if (isVisible) {
			Animated.spring(slideAnim, {
				toValue: 0,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.spring(slideAnim, {
				toValue: modalHeight,
				useNativeDriver: true,
			}).start();
		}
	}, [isVisible]);

	return (
		<Animated.View
			className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-3xl shadow-lg pt-4"
			style={{
				transform: [{ translateY }],
				display: isVisible ? "flex" : "none",
			}}
			onLayout={(event) => setModalHeight(event.nativeEvent.layout.height)}
			{...panResponder.panHandlers}
		>
			<View className="w-1/5 h-1 rounded-2xl bg-dark mx-auto mb-4"></View>
			<View className="p-4 space-y-4 px-8 text-dark font-medium">
				<TouchableOpacity
					className="flex-row items-center space-x-3 w-full"
					onPress={() => navigation.navigate("EditProfile")}
				>
					<Image
						source={require("../assets/Profile/settings.png")}
						className="w-6 h-6"
					/>
					<Text className="text-sm font-medium text-dark">Settings</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="flex-row items-center space-x-3 w-full"
					onPress={() => navigation.navigate("SavedPost")}
				>
					<Image
						source={require("../assets/Profile/bookmark.png")}
						className="w-6 h-6"
					/>
					<Text className="text-sm font-medium text-dark">Saved</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center space-x-3 w-full">
					<Image
						source={require("../assets/Profile/contrast.png")}
						className="w-6 h-6"
					/>
					<Text className="text-sm font-medium text-dark">Dark Mode</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="flex-row items-center space-x-3 w-full"
					onPress={() => setReportModalVisible(true)}
				>
					<Image
						source={require("../assets/Profile/brightness_alert.png")}
						className="w-6 h-6"
					/>
					<Text className="text-sm font-medium text-dark">
						Report a problem
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="flex-row items-center space-x-3 w-full border-t border-t-white pt-4"
					onPress={onLogout}
				>
					<Image
						source={require("../assets/Profile/move_item.png")}
						className="w-6 h-6"
					/>
					<Text className="text-sm font-medium text-dark" onPress={logout}>
						Log Out
					</Text>
				</TouchableOpacity>
			</View>
			<ReportProblemModal
				isVisible={reportModalVisible}
				onClose={() => setReportModalVisible(false)}
				userId={user?.userId}
			/>
		</Animated.View>
	);
};

export default BottomModal;
