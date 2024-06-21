import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	ScrollView,
	Image,
	Text,
	ImageBackground,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

type Props = {
	navigation?: any;
	route?: any;
	routeName: string;
};
export default (props: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
				height: "100%",
			}}
		>
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: "#FFFFFF",
					paddingTop: 56,
					paddingBottom: 7,
				}}
			>
				<Image
					source={{ uri: "assets/images/arrow_back.png" }}
					resizeMode={"contain"}
					style={{
						width: 24,
						height: 24,
						marginBottom: 20,
						marginHorizontal: 20,
					}}
				/>
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
						marginBottom: 200,
						fontWeight: "bold",
						textAlign: "center",
					}}
				>
					{"LoremIpsum"}
				</Text>
				<Text
					style={{
						color: "#181314",
						fontSize: 16,
						marginBottom: 10,
						textAlign: "center",
						fontWeight: "bold",
					}}
				>
					{props.routeName}
				</Text>
				<Text
					style={{
						color: "#181314",
						fontSize: 12,
						marginBottom: 23,
						textAlign: "center",
					}}
				>
					{`${props.routeName} to continue using the app.`}
				</Text>
				{props.routeName === "Login" ? null : (
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							borderColor: "#EEC0C8",
							borderRadius: 8,
							borderWidth: 1,
							marginHorizontal: 20,
						}}
					>
						<Image
							source={{ uri: "assets/images/passkey.png" }}
							resizeMode={"contain"}
							style={{
								width: 24,
								height: 24,
								marginLeft: 16,
								marginRight: 16,
								marginTop: 12,
								marginBottom: 12,
							}}
						/>
						<TextInput
							placeholder={`Enter Username`}
							value={username}
							onChangeText={setUsername}
							style={{
								borderWidth: 0,
								flex: 1,
								height: "100%",
								width: "100%",
								borderColor: "transparent",
							}}
						/>
					</View>
				)}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						marginHorizontal: 20,
					}}
				>
					<Image
						source={{ uri: "assets/images/passkey.png" }}
						resizeMode={"contain"}
						style={{
							width: 24,
							height: 24,
							marginLeft: 16,
							marginRight: 16,
							marginTop: 12,
							marginBottom: 12,
						}}
					/>
					<TextInput
						placeholder={`"${props.routeName} with ${
							props.routeName === "Login" ? "E-mail/Username" : "E-mail"
						}`}
						value={email}
						onChangeText={setEmail}
						style={{
							borderWidth: 0,
							flex: 1,
							height: "100%",
							width: "100%",
							borderColor: "transparent",
						}}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						marginHorizontal: 20,
					}}
				>
					<Image
						source={{ uri: "assets/images/vpn_key.png" }}
						resizeMode={"contain"}
						style={{
							width: 24,
							height: 24,
							marginLeft: 16,
							marginRight: 16,
							marginTop: 12,
							marginBottom: 12,
						}}
					/>
					<View
						style={{
							flex: 1,
							alignSelf: "center",
						}}
					></View>
					<TextInput
						placeholder="Enter Password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						style={{
							borderWidth: 0,
							height: "100%",
							width: "100%",
							borderColor: "transparent",
						}}
					/>
					<Image
						source={{ uri: "assets/images/" }}
						resizeMode={"contain"}
						style={{
							width: 16,
							height: 16,
						}}
					/>
				</View>
				<Text
					style={{
						color: "#3B3B3B",
						fontSize: 12,
						marginBottom: 23,
						marginLeft: 21,
					}}
				>
					{"Forget Password ?"}
				</Text>
				<View
					style={{
						alignItems: "center",
						backgroundColor: "#EEC0C8",
						borderRadius: 8,
						paddingVertical: 20,
						marginBottom: 15,
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
				<Text
					style={{
						color: "#3B3B3B",
						fontSize: 12,
						marginBottom: 27,
						marginLeft: 107,
					}}
				>
					{"Don’t have an account ? Sign Up"}
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 22,
						marginHorizontal: 20,
					}}
				>
					<View
						style={{
							width: 147,
							height: 1,
							backgroundColor: "#535353",
						}}
					></View>
					<Text
						style={{
							color: "#565656",
							fontSize: 16,
						}}
					>
						{"OR"}
					</Text>
					<View
						style={{
							width: 147,
							height: 1,
							backgroundColor: "#535353",
						}}
					></View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						backgroundColor: "#EEC0C8",
						borderRadius: 8,
						paddingVertical: 16,
						paddingLeft: 18,
						paddingRight: 96,
						marginBottom: 36,
						marginHorizontal: 20,
					}}
				>
					<View
						style={{
							width: 19,
						}}
					>
						<ImageBackground
							source={{ uri: "assets/images/Google.png" }}
							resizeMode={"contain"}
							style={{
								height: 19,
								paddingHorizontal: 1,
							}}
						></ImageBackground>
					</View>
					<Text
						style={{
							color: "#181314",
							fontSize: 14,
						}}
					>
						{`${props.routeName} with Google`}
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
