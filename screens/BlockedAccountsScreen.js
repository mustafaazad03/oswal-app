import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlockedAccountsList from "../components/BlockedAccountsList";
import { blockedAccounts } from "../data/mockedData";

const BlockedAccountsScreen = () => {
	const [accounts, setAccounts] = useState(blockedAccounts);

	const handleUnblock = (id) => {
		setAccounts(accounts.filter((account) => account.id !== id));
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-row items-center p-4 border-b border-gray-200 bg-primary mb-1">
				<TouchableOpacity>
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
