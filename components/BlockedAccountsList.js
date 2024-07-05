import React from "react";
import { FlatList } from "react-native";
import BlockedAccount from "./BlockedAccount";

const BlockedAccountsList = ({ accounts, onUnblock }) => {
	return (
		<FlatList
			data={accounts}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<BlockedAccount
					name={item.name}
					username={item.username}
					avatarUrl={item.avatarUrl}
					onUnblock={() => onUnblock(item.id)}
				/>
			)}
		/>
	);
};

export default BlockedAccountsList;
