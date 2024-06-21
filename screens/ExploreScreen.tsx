import React from "react";
import {
	SafeAreaView,
	View,
	ScrollView,
	Image,
	Text,
	StyleSheet,
} from "react-native";

interface Props {}

const ExploreScreen: React.FC<Props> = () => {
	const renderCategoryRow = () => (
		<View style={styles.categoryRow}>
			<View style={styles.categoryContainer}>
				<Text style={styles.categoryText}>Wallpapers</Text>
			</View>
			<View style={styles.categoryContainer}>
				<Text style={styles.categoryText}>Fashion</Text>
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
				<Text style={styles.header}>Explore</Text>
				<Text style={styles.subHeader}>
					This will customize your home feed.
				</Text>
				<Text style={styles.label}>Product/Service Category</Text>
				<View style={styles.selectContainer}>
					<Text style={styles.selectText}>Select</Text>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.selectIcon}
					/>
				</View>
				<Text style={styles.label}>Product/Service Sub-Category</Text>
				<View style={styles.selectContainer}>
					<Text style={styles.selectText}>Select</Text>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.selectIcon}
					/>
				</View>
				{renderCategoryRow()}
				{renderCategoryRow()}
				{renderCategoryRow()}
				{renderCategoryRow()}
				<View style={styles.termsContainer}>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.termsIcon}
					/>
					<Text style={styles.termsText}>I agree with Terms&Conditions.</Text>
				</View>
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
		paddingBottom: 20,
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
		marginBottom: 26,
	},
	label: {
		color: "#000000",
		fontSize: 12,
		marginBottom: 7,
	},
	selectContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "#EEC0C8",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 8,
		marginBottom: 27,
	},
	selectText: {
		color: "#181314",
		fontSize: 12,
		marginRight: 4,
		flex: 1,
	},
	selectIcon: {
		width: 9,
		height: 5,
	},
	categoryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	categoryContainer: {
		width: 167,
		backgroundColor: "#00000066",
		paddingTop: 133,
		paddingBottom: 10,
		paddingHorizontal: 10,
	},
	categoryText: {
		color: "#FFFFFF",
		fontSize: 16,
	},
	termsContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 24,
	},
	termsIcon: {
		width: 24,
		height: 24,
		marginRight: 13,
	},
	termsText: {
		color: "#181314",
		fontSize: 14,
		flex: 1,
	},
	buttonContainer: {
		alignItems: "center",
		backgroundColor: "#EEC0C8",
		borderRadius: 8,
		paddingVertical: 13,
	},
	buttonText: {
		color: "#181314",
		fontSize: 14,
	},
});

export default ExploreScreen;
