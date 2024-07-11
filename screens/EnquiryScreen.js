import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import BottomNavigation from "../components/BottomNavigation";
import { useQuery } from "@tanstack/react-query";
import { enquiryService } from "../api/enquiry";
import { useAuth } from "../context/AuthContext";

const StyledView = styled(View);
const StyledText = styled(Text);

const TableHeader = () => (
	<StyledView className="flex-row bg-primary/40 p-3 gap-8 text-left">
		<StyledText className="flex-1 font-bold text-dark">Sr. No.</StyledText>
		<StyledText className="flex-2 font-bold text-dark">Username</StyledText>
		<StyledText className="flex-2 font-bold text-dark">Enquiry</StyledText>
		<StyledText className="flex-1 font-bold text-dark">Category</StyledText>
	</StyledView>
);

const TableRow = ({ item, index }) => (
	<StyledView
		className={`flex-row p-3 space-x-4 ${
			index % 2 === 0 ? "bg-primary/10" : "bg-white"
		}`}
	>
		<StyledText className="flex-1 text-dark">
			{item?._id.substring(0, 4)}
		</StyledText>
		<StyledText className="flex-2 text-dark">{item?.username}</StyledText>
		<StyledText className="flex-2 text-dark">{item?.description}</StyledText>
		<StyledText className="flex-1 text-dark">{item?.category}</StyledText>
	</StyledView>
);
export default function EnquiriesScreen() {
	const navigation = useNavigation();
	const { user } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: ["enquiries", user?.userId],
		queryFn: () => enquiryService.getEnquiryForUser(user?.userId),
		enabled: true,
		retry: 1,
	});

	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" color="#FFD1DC" />
			</SafeAreaView>
		);
	}

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
					keyExtractor={(item) => item?._id}
					ListHeaderComponent={TableHeader}
					stickyHeaderIndices={[0]}
				/>
			</StyledView>

			<BottomNavigation notify={false} />
		</SafeAreaView>
	);
}
