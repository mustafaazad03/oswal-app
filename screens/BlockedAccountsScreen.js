import React, { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import useBlockedUserData from "../hooks/useBlockUserData";
import { userService } from "../api/user";

const BlockedAccountsScreen = () => {
	const navigation = useNavigation();
	const { fullUser } = useAuth();

	const { data, isLoading, isError, error } = useBlockedUserData(
		fullUser.blockList
	);

	const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		if (data) {
			setAccounts(data);
		}
	}, [data]);

	const mutation = useMutation({
		mutationFn: (blockedAccountList) =>
			userService.updateUser(fullUser.userId, {
				blockList: blockedAccountList,
			}),
		onSuccess: () => {
			Alert.alert("Success", "User unblocked successfully");
		},
		onError: (error) => {
			Alert.alert("Error", error.message);
		},
	});

	const handleUnblock = (id) => {
		const updatedAccounts = accounts.filter((account) => account.id !== id);
		setAccounts(updatedAccounts);

		const blockedAccountIds = updatedAccounts.map((account) => account.id);
		mutation.mutate(blockedAccountIds);
	};

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
			<BlockedAccountsList accounts={accounts} onUnblock={handleUnblock} />
		</SafeAreaView>
	);
};

export default BlockedAccountsScreen;
