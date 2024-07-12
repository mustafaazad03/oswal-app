import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import * as Linking from "expo-linking";

const HomeProfileFeed = ({ businessDetails, contactDetails, socials }) => {
	const openLink = (url) => {
		if (url) {
			Linking.openURL(url);
		}
	};
	return (
		<View className="flex flex-col space-y-2 justify-center items-center">
			<View className="flex flex-row space-x-2 flex-1">
				<View className="flex flex-col bg-primary/40 p-5 rounded-xl space-y-2 justify-evenly items-center flex-1 h-40">
					<Text className="text-3xl font-bold">
						{businessDetails?.productCategory?.category || "Category"}
					</Text>
					<Text className="text-lg font-bold">Business Category</Text>
				</View>
				<View className="flex flex-col space-y-2 bg-primary/40 p-5 rounded-xl justify-evenly items-center flex-1 h-40">
					<Text className="text-3xl font-bold">
						{contactDetails?.workingSince || "N/A"}
					</Text>
					<Text className="text-lg font-bold">Working Since</Text>
				</View>
			</View>

			<View className="flex flex-row bg-primary/40 p-5 rounded-xl space-x-2 items-center flex-1 w-full">
				<Image
					source={require("../assets/Profile/location.png")}
					className="w-20 h-20 rounded-lg"
				/>
				<View className="flex flex-col space-y-2">
					<Text className="text-xl font-bold">Business Address</Text>
					<View className="">
						<Text className="text-sm">
							{businessDetails?.address?.officeNumber || "N/A"} -{" "}
							{businessDetails?.address?.block || "N/A"}
						</Text>
						<Text className="text-sm">
							{businessDetails?.address?.landmark || "N/A"}
						</Text>
						<Text className="text-sm">
							{businessDetails?.address?.city || "N/A"},{" "}
							{businessDetails?.address?.state || "N/A"}
						</Text>
						<Text className="text-sm">
							{businessDetails?.address?.pincode || "N/A"}
						</Text>
					</View>
				</View>
			</View>
			<View className="flex flex-row bg-primary/40 p-5 rounded-xl space-x-2 items-center flex-1 w-full">
				<Image
					source={require("../assets/Profile/phone.png")}
					className="w-20 h-20 rounded-lg"
				/>
				<View className="flex flex-col space-y-2">
					<Text className="text-xl font-bold">Business Contact</Text>
					<View className="">
						<Text className="text-sm">
							{contactDetails?.contactNumber?.mobile}
						</Text>
						<Text className="text-sm">
							{contactDetails?.contactNumber?.whatsapp}
						</Text>
					</View>
				</View>
			</View>
			<View className="flex flex-row bg-primary/40 p-5 rounded-xl space-x-2 items-center flex-1 w-full">
				<Image
					source={require("../assets/Profile/calendar.png")}
					className="w-20 h-20 rounded-lg"
				/>
				<View className="flex flex-col space-y-2">
					<Text className="text-xl font-bold">Business Working Hours</Text>
					<View className="">
						<Text className="text-sm">
							Monday - {contactDetails?.workingHours}
						</Text>
						<Text className="text-sm">
							Tuesday - {contactDetails?.workingHours}
						</Text>
						<Text className="text-sm">
							Wednesday - {contactDetails?.workingHours}
						</Text>
						<Text className="text-sm">
							Thursday - {contactDetails?.workingHours}
						</Text>
						<Text className="text-sm">
							Friday - {contactDetails?.workingHours}
						</Text>
					</View>
				</View>
			</View>
			<View className="flex flex-row bg-primary/40 p-5 rounded-xl space-x-2 items-center flex-1 w-full">
				<Image
					source={require("../assets/Profile/socialmedia.png")}
					className="w-20 h-20 rounded-lg"
				/>
				<View className="flex flex-col space-y-2">
					<Text className="text-xl font-bold">Business Social Presence</Text>
					<View className="flex flex-col space-y-1">
						<TouchableOpacity
							className="text-sm flex flex-row space-x-2 justify-start items-center"
							onPress={() => openLink(`https://` + socials?.website)}
						>
							<Ionicons name="globe-outline" size={24} color="black" />
							<Text>{socials?.website || "N/A"}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="text-sm flex flex-row space-x-2 justify-start items-center"
							onPress={() =>
								openLink(`https://instagram.com/` + socials?.instagram)
							}
						>
							<AntDesign name="instagram" size={24} color="black" />
							<Text>{socials?.instagram || "N/A"}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="text-sm flex flex-row space-x-2 justify-start items-center"
							onPress={() => openLink(`https://x.com/` + socials?.twitter)}
						>
							<AntDesign name="twitter" size={24} color="black" />
							<Text>{socials?.twitter || "N/A"}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="text-sm flex flex-row space-x-2 justify-start items-center"
							onPress={() =>
								openLink(`https://facebook.com/` + socials?.facebook)
							}
						>
							<AntDesign name="facebook-square" size={24} color="black" />
							<Text>{socials?.facebook || "N/A"}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="text-sm flex flex-row space-x-2 justify-start items-center"
							onPress={() =>
								openLink(`https://pinterest.com/` + socials?.pinterest)
							}
						>
							<Entypo name="pinterest" size={24} color="black" />
							<Text>{socials?.pinterest || "N/A"}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View className="flex flex-row bg-primary/40 p-5 rounded-xl space-x-2 items-center flex-1 w-full">
				<Image
					source={require("../assets/Profile/info.png")}
					className="w-20 h-20 rounded-lg"
				/>
				<View className="flex flex-col space-y-2">
					<Text className="text-xl font-bold">About Business</Text>
					<View className="">
						<Text className="text-sm flex-wrap w-48">
							{businessDetails?.about || "N/A"}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default HomeProfileFeed;
