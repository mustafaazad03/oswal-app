import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	ScrollView,
	Image,
	Text,
	ImageBackground,
	TextInput,
	TouchableOpacity,
} from "react-native";

type Props = {};

const PersonalDetailsScreen = (props: Props) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}
		>
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: "#FFFFFF",
					paddingTop: 56,
					paddingBottom: 31,
				}}
			>
				<Image
					source={{ uri: "assets/images/arrow_back.png" }}
					resizeMode={"contain"}
					style={{
						width: 24,
						height: 24,
						marginBottom: 30,
						marginHorizontal: 20,
					}}
				/>
				<Text
					style={{
						color: "#181314",
						fontSize: 16,
						marginBottom: 10,
						marginLeft: 21,
					}}
				>
					{"Enter your Personal Details"}
				</Text>
				<Text
					style={{
						color: "#181314",
						fontSize: 12,
						marginBottom: 23,
						marginLeft: 20,
					}}
				>
					{"You can always change this later."}
				</Text>
				<ImageBackground
					source={{ uri: "assets/images/profile.png" }}
					resizeMode={"contain"}
					style={{
						height: 80,
						paddingHorizontal: 25,
						marginBottom: 12,
						marginHorizontal: 155,
					}}
				/>
				<View
					style={{
						alignItems: "center",
						backgroundColor: "#EEC0C8",
						borderRadius: 8,
						paddingVertical: 11,
						marginBottom: 39,
						marginHorizontal: 117,
					}}
				>
					<Text
						style={{
							color: "#181314",
							fontSize: 14,
						}}
					>
						{"Upload Profile Photo"}
					</Text>
				</View>
				<Text
					style={{
						color: "#000000",
						fontSize: 12,
						marginBottom: 7,
						marginLeft: 20,
					}}
				>
					{"Your name/Business Name*"}
				</Text>
				<TextInput
					placeholder="Enter your name or business name"
					value={name}
					onChangeText={setName}
					style={{
						height: 38,
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						marginBottom: 27,
						marginHorizontal: 20,
						paddingLeft: 10,
					}}
				/>
				<Text
					style={{
						color: "#000000",
						fontSize: 12,
						marginBottom: 7,
						marginLeft: 20,
					}}
				>
					{"Mobile Number*"}
				</Text>
				<TextInput
					placeholder="Enter your mobile number"
					value={mobileNumber}
					onChangeText={setMobileNumber}
					style={{
						height: 38,
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						marginBottom: 27,
						marginHorizontal: 20,
						paddingLeft: 10,
					}}
					keyboardType="phone-pad"
				/>
				<Text
					style={{
						color: "#000000",
						fontSize: 12,
						marginBottom: 7,
						marginLeft: 20,
					}}
				>
					{"E-mail"}
				</Text>
				<TextInput
					placeholder="Enter your email"
					value={email}
					onChangeText={setEmail}
					style={{
						height: 38,
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						marginBottom: 27,
						marginHorizontal: 20,
						paddingLeft: 10,
					}}
					keyboardType="email-address"
				/>
				<Text
					style={{
						color: "#000000",
						fontSize: 12,
						marginBottom: 7,
						marginLeft: 20,
					}}
				>
					{"Gender*"}
				</Text>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						paddingVertical: 10,
						paddingHorizontal: 8,
						marginBottom: 27,
						marginHorizontal: 20,
					}}
				>
					<Text
						style={{
							color: "#181314",
							fontSize: 12,
							marginRight: 4,
							flex: 1,
						}}
					>
						{"Select"}
					</Text>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode={"contain"}
						style={{
							width: 9,
							height: 5,
						}}
					/>
				</View>
				<Text
					style={{
						color: "#000000",
						fontSize: 12,
						marginBottom: 7,
						marginLeft: 20,
					}}
				>
					{"Date of Birth*"}
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						paddingVertical: 7,
						paddingHorizontal: 9,
						marginBottom: 27,
						marginHorizontal: 20,
					}}
				>
					<Text
						style={{
							color: "#3B3B3B",
							fontSize: 12,
						}}
					>
						{"DD/MM/YYYY"}
					</Text>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode={"contain"}
						style={{
							width: 24,
							height: 24,
						}}
					/>
				</View>
				<Text
					style={{
						color: "#000000",
						fontSize: 12,
						marginBottom: 7,
						marginLeft: 20,
					}}
				>
					{"Bio"}
				</Text>
				<TextInput
					placeholder="Enter your bio"
					multiline
					numberOfLines={4}
					style={{
						height: 94,
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						marginBottom: 36,
						marginHorizontal: 20,
						paddingLeft: 10,
						paddingTop: 10,
					}}
				/>
				<TouchableOpacity
					style={{
						alignItems: "center",
						backgroundColor: "#EEC0C8",
						borderRadius: 8,
						paddingVertical: 13,
						marginHorizontal: 20,
					}}
					onPress={() => alert("Next button pressed")}
				>
					<Text
						style={{
							color: "#181314",
							fontSize: 14,
						}}
					>
						{"Next"}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PersonalDetailsScreen;
