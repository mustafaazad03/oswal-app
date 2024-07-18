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
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);

const TableHeader = () => (
  <StyledView className="flex-row bg-primary/80 p-3 gap-8 text-left">
    <StyledText className=" font-bold text-dark">Sr. No.</StyledText>
    <StyledText className=" font-bold text-dark">Username</StyledText>
    <StyledText className="font-bold text-dark">Enquiry</StyledText>
    <StyledText className="font-bold text-dark">Category</StyledText>
    <StyledText className="font-bold text-dark"></StyledText>
  </StyledView>
);

const TableRow = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    <StyledView
      className={`flex-row p-3 space-x-7 ${
        index % 2 === 0 ? "bg-primary/50 dark:bg-primary" : "bg-white "
      }`}
    >
      <StyledText className=" text-dark truncate">
        {item?._id.substring(0, 4)}
      </StyledText>
      <StyledText className=" text-dark truncate">
        {item?.fromUser.name}
      </StyledText>
      <StyledText className=" text-dark truncate">
        {item?.description.substring(0, 10)}...{" "}
      </StyledText>
      <StyledText className=" text-dark truncate">{item?.category}</StyledText>
      <TouchableOpacity
        onPress={() => navigation.navigate("EnquirySetting", { enquiry: item })}
      >
        <Entypo name="dots-three-vertical" size={15} color="black" />
      </TouchableOpacity>
    </StyledView>
  );
};
export default function EnquiriesScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["enquiries", user?.userId],
    queryFn: () => enquiryService.getEnquiryForUser(user?.userId),
    enabled: !!user?.userId,
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
    <SafeAreaView className="flex-1 bg-white dark:bg-[#222831]">
      <View className="bg-pink-200 p-4 flex-row items-center pt-8">
        <View className="flex flex-row space-x-2 justify-center items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Enquiries</Text>
        </View>
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

      {/* <BottomNavigation notify={false} /> */}
    </SafeAreaView>
  );
}
