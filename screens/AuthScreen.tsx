import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text } from "react-native";

type Props = {};
export default (props: Props) => {
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
					paddingTop: 65,
					paddingBottom: 7,
				}}
			>
				<Image
					source={{ uri: "assets/images/logo.png" }}
					resizeMode={"contain"}
					style={{
						height: 95,
						marginBottom: 7,
						marginHorizontal: 145,
					}}
				/>
				<Text
					style={{
						color: "#181314",
						fontSize: 16,
						marginBottom: 463,
						fontWeight: "bold",
						textAlign: "center",
					}}
				>
					{"LoremIpsum"}
				</Text>
				<View
					style={{
						alignItems: "center",
						backgroundColor: "#EEC0C8",
						borderRadius: 8,
						paddingVertical: 20,
						marginBottom: 20,
						marginHorizontal: 20,
					}}
				>
					<Text
						style={{
							color: "#181314",
							fontSize: 14,
						}}
					>
						{"Log in"}
					</Text>
				</View>
				<View
					style={{
						alignItems: "center",
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						paddingVertical: 20,
						marginBottom: 32,
						marginHorizontal: 20,
					}}
				>
					<Text
						style={{
							color: "#181314",
							fontSize: 14,
						}}
					>
						{"Register"}
					</Text>
				</View>
				<View
					style={{
						height: 4,
						backgroundColor: "#000000",
						borderRadius: 100,
						marginHorizontal: 128,
					}}
				></View>
			</ScrollView>
		</SafeAreaView>
	);
};
