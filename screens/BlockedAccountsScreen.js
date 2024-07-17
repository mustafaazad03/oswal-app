import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ActivityIndicator,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlockedAccountsList from "../components/BlockedAccountsList";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useBlockedUserData from "../hooks/useBlockUserData";
import { userService } from "../api/user";

const BlockedAccountsScreen = () => {
	const navigation = useNavigation();
	const { fullUser, userRefetch } = useAuth();
	const queryClient = useQueryClient();

	useEffect(() => {
		userRefetch();
	}, []);

	const {
		data: blockedAccounts,
		isLoading,
		isError,
		error,
		refetch,
	} = useBlockedUserData(fullUser?.blockList || []);

	const unblockUserMutation = useMutation({
		mutationFn: (targetUsername) =>
			userService.unBlockUser(fullUser?.username, targetUsername),
		onSuccess: (_, unblockedUsername) => {
			queryClient.setQueryData(["blockedUsers"], (oldData) =>
				oldData.filter((user) => user.username !== unblockedUsername)
			);
			Alert.alert("Success", "User unblocked successfully");
		},
		onError: (err) => {
			Alert.alert("Error", err.message);
		},
		onSettled: () => {
			queryClient.invalidateQueries(["blockedUsers"]);
			refetch();
		},
	});

	const handleUnblock = useCallback(
		(username) => {
			Alert.alert(
				"Unblock User",
				"Are you sure you want to unblock this user?",
				[
					{ text: "Cancel", style: "cancel" },
					{
						text: "Unblock",
						onPress: () => unblockUserMutation.mutate(username),
					},
				]
			);
		},
		[unblockUserMutation]
	);

	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" color="#FFD1DC" />
			</SafeAreaView>
		);
	}

	if (isError) {
		return (
			<SafeAreaView className="flex-1 justify-center items-center bg-white">
				<Text>Error: {error.message}</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-row items-center p-4 border-b border-gray-200 bg-primary mb-1">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/arrow_back.png")}
						className="w-6 h-6"
					/>
				</TouchableOpacity>
				<Text className="text-xl font-bold ml-4">Blocked Accounts</Text>
			</View>
			{blockedAccounts && blockedAccounts.length === 0 ? (
				<View className="flex-1 justify-center items-center bg-white">
					<Text>No blocked accounts</Text>
				</View>
			) : (
				<BlockedAccountsList
					accounts={blockedAccounts || []}
					onUnblock={handleUnblock}
				/>
			)}
		</SafeAreaView>
	);
};

export default BlockedAccountsScreen;
