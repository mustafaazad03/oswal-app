import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styled } from "nativewind";
import ExpandableButton from "../components/ExtendeblePlusButton";
import BottomNavigation from "../components/BottomNavigation";

const StyledView = styled(View);
const StyledText = styled(Text);

const data = [
	{ id: "1", username: "@username", enquiry: "LoremEpsum", status: "Active" },
	{ id: "2", username: "@username", enquiry: "LoremEpsum", status: "Active" },
	{ id: "3", username: "@username", enquiry: "LoremEpsum", status: "Active" },
	{ id: "4", username: "@username", enquiry: "LoremEpsum", status: "Active" },
	{ id: "5", username: "@username", enquiry: "LoremEpsum", status: "Active" },
];

const TableHeader = () => (
	<StyledView className="flex-row bg-primary/40 p-3 gap-8 text-left">
		<StyledText className="flex-1 font-bold text-dark">Sr. No.</StyledText>
		<StyledText className="flex-2 font-bold text-dark">Username</StyledText>
		<StyledText className="flex-2 font-bold text-dark">Enquiry</StyledText>
		<StyledText className="flex-1 font-bold text-dark">Status</StyledText>
	</StyledView>
);

const TableRow = ({ item, index }) => (
	<StyledView
		className={`flex-row p-3 space-x-4 ${
			index % 2 === 0 ? "bg-primary/10" : "bg-white"
		}`}
	>
		<StyledText className="flex-1 text-dark">{item.id}</StyledText>
		<StyledText className="flex-2 text-dark">{item.username}</StyledText>
		<StyledText className="flex-2 text-dark">{item.enquiry}</StyledText>
		<StyledText className="flex-1 text-dark">{item.status}</StyledText>
	</StyledView>
);
export default function EnquiriesScreen() {
	const navigation = useNavigation();
	const route = useRoute();

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="bg-pink-200 p-4 flex-row items-center pt-8">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/arrow_back.png")}
						className="w-6 h-6 mr-3"
					/>
				</TouchableOpacity>
				<Text className="text-xl font-bold">Enquiries</Text>
			</View>

			<StyledView className="overflow-hidden flex-1">
				<FlatList
					data={data}
					renderItem={({ item, index }) => (
						<TableRow item={item} index={index} />
					)}
					keyExtractor={(item) => item.id}
					ListHeaderComponent={TableHeader}
					stickyHeaderIndices={[0]}
				/>
			</StyledView>

			<BottomNavigation notify={false} />
		</SafeAreaView>
	);
}
