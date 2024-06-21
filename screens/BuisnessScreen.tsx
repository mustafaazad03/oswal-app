import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	ScrollView,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";

const App = () => {
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [aboutUs, setAboutUs] = useState("");
	const [officeNumber, setOfficeNumber] = useState("");
	const [towerBlock, setTowerBlock] = useState("");
	const [landmark, setLandmark] = useState("");
	const [pincode, setPincode] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: "#FFFFFF",
					paddingTop: 56,
					paddingBottom: 32,
					paddingHorizontal: 20,
				}}
			>
				<Image
					source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
					resizeMode={"stretch"}
					style={{ width: 24, height: 24, marginBottom: 28 }}
				/>
				<Text style={{ color: "#181314", fontSize: 16, marginBottom: 10 }}>
					Enter your Business or Profession Details
				</Text>
				<Text style={{ color: "#181314", fontSize: 12, marginBottom: 26 }}>
					You can always change this later.
				</Text>
				<Text style={{ color: "#000000", fontSize: 12, marginBottom: 7 }}>
					Product/Service Category
				</Text>
				<TouchableOpacity
					style={{
						flexDirection: "row",
						alignItems: "center",
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						paddingVertical: 10,
						paddingHorizontal: 8,
						marginBottom: 27,
					}}
				>
					<Text style={styles.dropdownText}>{category || "Select"}</Text>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode={"stretch"}
						style={styles.dropdownIcon}
					/>
				</TouchableOpacity>
				<Text style={{ color: "#000000", fontSize: 12, marginBottom: 7 }}>
					Product/Service Sub - Category
				</Text>
				<TouchableOpacity
					style={{
						flexDirection: "row",
						alignItems: "center",
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						paddingVertical: 10,
						paddingHorizontal: 8,
						marginBottom: 27,
					}}
				>
					<Text style={styles.dropdownText}>{subCategory || "Select"}</Text>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode={"stretch"}
						style={styles.dropdownIcon}
					/>
				</TouchableOpacity>
				<Text style={{ color: "#000000", fontSize: 12, marginBottom: 7 }}>
					About Us
				</Text>
				<TextInput
					style={{
						height: 73,
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						marginBottom: 28,
						padding: 8,
						textAlignVertical: "top",
					}}
					value={aboutUs}
					onChangeText={setAboutUs}
					multiline={true}
					numberOfLines={4}
				/>
				<Text style={{ color: "#000000", fontSize: 16, marginBottom: 23 }}>
					Address Details :
				</Text>
				<TouchableOpacity
					style={{
						alignItems: "center",
						backgroundColor: "#EEC0C8",
						borderRadius: 8,
						paddingVertical: 13,
						marginBottom: 27,
					}}
				>
					<Text style={styles.buttonText}>Add Google Location</Text>
				</TouchableOpacity>
				<Text style={{ color: "#181314", fontSize: 12, marginBottom: 7 }}>
					Business Address*
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Office number/Floor*"
					value={officeNumber}
					onChangeText={setOfficeNumber}
				/>
				<TextInput
					style={styles.input}
					placeholder="Tower/Block*"
					value={towerBlock}
					onChangeText={setTowerBlock}
				/>
				<TextInput
					style={styles.input}
					placeholder="Nearby Landmark (Optional)"
					value={landmark}
					onChangeText={setLandmark}
				/>
				<Text style={{ color: "#181314", fontSize: 12, marginBottom: 7 }}>
					Pincode
				</Text>
				<TextInput
					style={styles.input}
					value={pincode}
					onChangeText={setPincode}
				/>
				<Text style={{ color: "#181314", fontSize: 12, marginBottom: 7 }}>
					City*
				</Text>
				<TouchableOpacity
					style={{
						flexDirection: "row",
						alignItems: "center",
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						paddingVertical: 10,
						paddingHorizontal: 8,
						marginBottom: 27,
					}}
				>
					<Text style={styles.dropdownText}>{city || "Select"}</Text>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode={"stretch"}
						style={styles.dropdownIcon}
					/>
				</TouchableOpacity>
				<Text style={{ color: "#181314", fontSize: 12, marginBottom: 7 }}>
					State*
				</Text>
				<TouchableOpacity
					style={{
						flexDirection: "row",
						alignItems: "center",
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						paddingVertical: 10,
						paddingHorizontal: 8,
						marginBottom: 27,
					}}
				>
					<Text style={styles.dropdownText}>{state || "Select"}</Text>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode={"stretch"}
						style={styles.dropdownIcon}
					/>
				</TouchableOpacity>
				<Text style={{ color: "#181314", fontSize: 12, marginBottom: 7 }}>
					Country*
				</Text>
				<TouchableOpacity
					style={{
						flexDirection: "row",
						alignItems: "center",
						borderColor: "#EEC0C8",
						borderRadius: 8,
						borderWidth: 1,
						paddingVertical: 10,
						paddingHorizontal: 8,
						marginBottom: 27,
					}}
				>
					<Text style={styles.dropdownText}>{country || "Select"}</Text>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode={"stretch"}
						style={styles.dropdownIcon}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						alignItems: "center",
						backgroundColor: "#EEC0C8",
						borderRadius: 8,
						paddingVertical: 13,
						marginBottom: 27,
					}}
				>
					<Text style={styles.buttonText}>Next</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = {
	dropdown: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "#EEC0C8",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 8,
		marginBottom: 27,
	},
	dropdownText: {
		color: "#181314",
		fontSize: 12,
		marginRight: 4,
		flex: 1,
	},
	dropdownIcon: {
		width: 9,
		height: 5,
	},
	textArea: {
		height: 73,
		borderColor: "#EEC0C8",
		borderRadius: 8,
		borderWidth: 1,
		marginBottom: 28,
		padding: 8,
		textAlignVertical: "top",
	},
	button: {
		alignItems: "center",
		backgroundColor: "#EEC0C8",
		borderRadius: 8,
		paddingVertical: 13,
		marginBottom: 27,
	},
	buttonText: {
		color: "#000000",
		fontSize: 14,
	},
	input: {
		borderColor: "#EEC0C8",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 15,
		paddingHorizontal: 8,
		marginBottom: 8,
		fontSize: 12,
		color: "#3B3B3B",
	},
};

export default App;
