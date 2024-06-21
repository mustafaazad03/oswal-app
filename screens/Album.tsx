import React from "react";
import {
	SafeAreaView,
	View,
	ScrollView,
	Image,
	Text,
	StyleSheet,
} from "react-native";

const CreateAlbum: React.FC = () => {
	const renderImageRow = () => (
		<View style={styles.imageRow}>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
					resizeMode="stretch"
					style={styles.image}
				/>
			</View>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
					resizeMode="stretch"
					style={styles.image}
				/>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.scrollView}>
				<Image
					source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
					resizeMode="stretch"
					style={styles.logo}
				/>
				<Text style={styles.header}>Create Album</Text>
				<Text style={styles.subHeader}>
					You can upload up to 10 photos/videos.
				</Text>
				{renderImageRow()}
				{renderImageRow()}
				{renderImageRow()}
				{renderImageRow()}
				{renderImageRow()}
				<View style={styles.buttonContainer}>
					<Text style={styles.buttonText}>Next</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		paddingTop: 56,
		paddingBottom: 30,
		paddingHorizontal: 20,
	},
	logo: {
		width: 24,
		height: 24,
		marginBottom: 28,
	},
	header: {
		color: "#181314",
		fontSize: 16,
		marginBottom: 10,
	},
	subHeader: {
		color: "#181314",
		fontSize: 12,
		marginBottom: 23,
	},
	imageRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	imageContainer: {
		width: 167,
		borderRadius: 8,
		paddingHorizontal: 65,
	},
	image: {
		height: 36,
		marginTop: 62,
	},
	buttonContainer: {
		alignItems: "center",
		backgroundColor: "#EEC0C8",
		borderRadius: 8,
		paddingVertical: 13,
		marginBottom: 36,
	},
	buttonText: {
		color: "#181314",
		fontSize: 14,
	},
});

export default CreateAlbum;
