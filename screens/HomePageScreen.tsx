import React from "react";
import {
	SafeAreaView,
	View,
	ScrollView,
	Text,
	Image,
	StyleSheet,
} from "react-native";

interface Props {}

const HomeScreen: React.FC<Props> = () => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.header}>
					<Text style={styles.headerText}>LoremIpsum</Text>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.headerImage}
					/>
					<View style={styles.headerIconContainer}>
						<Image
							source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
							resizeMode="stretch"
							style={styles.headerIconTop}
						/>
						<Image
							source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
							resizeMode="stretch"
							style={styles.headerIconBottom}
						/>
					</View>
				</View>
				<View style={styles.profileContainer}>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.profileImage}
					/>
					<View style={styles.profileTextContainer}>
						<Text style={styles.profileName}>Alias Grace</Text>
						<Text style={styles.profileHandle}>@alias_grace21</Text>
					</View>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.profileIcon}
					/>
				</View>
				<Image
					source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
					resizeMode="stretch"
					style={styles.mainImage}
				/>
				<View style={styles.iconsContainer}>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.icon}
					/>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.icon}
					/>
					<View style={styles.spacer} />
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.icon}
					/>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.icon}
					/>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.iconSmall}
					/>
				</View>
				<Text style={styles.likesText}>Liked by abcd and others</Text>
				<View style={styles.commentContainer}>
					<Text style={styles.commentUser}>Alias Grace</Text>
					<Text style={styles.commentText}>Lorem Ipsum Dolor sit</Text>
				</View>
				<View style={styles.profileContainer}>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.profileImage}
					/>
					<View style={styles.profileTextContainer}>
						<Text style={styles.profileName}>Kevin Smith</Text>
						<Text style={styles.profileHandle}>@smith_kevin</Text>
					</View>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.profileIcon}
					/>
				</View>
				<View style={styles.mainImageContainer}>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.mainImage}
					/>
					<View style={styles.overlayContainer}>
						<View style={styles.overlayHeader}>
							<View style={styles.overlayIconContainer}>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode="stretch"
									style={styles.overlayIcon}
								/>
							</View>
							<View style={styles.overlayNotificationContainer}>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode="stretch"
									style={styles.overlayNotification}
								/>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode="stretch"
									style={styles.overlayNotificationBadge}
								/>
							</View>
							<View style={styles.spacer} />
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode="stretch"
								style={styles.overlayIcon}
							/>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode="stretch"
								style={styles.overlayIcon}
							/>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode="stretch"
								style={styles.overlayIcon}
							/>
						</View>
					</View>
					<View style={styles.progressContainer}>
						<View style={styles.progressBar} />
					</View>
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
		paddingBottom: -103,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#EEC0C8",
		paddingVertical: 12,
		paddingHorizontal: 21,
		marginBottom: 7,
	},
	headerText: {
		color: "#1D0532",
		fontSize: 16,
		marginRight: 4,
		flex: 1,
	},
	headerImage: {
		width: 24,
		height: 24,
		marginRight: 30,
	},
	headerIconContainer: {
		width: 18,
	},
	headerIconTop: {
		height: 10,
		marginBottom: 2,
		marginHorizontal: 4,
	},
	headerIconBottom: {
		height: 8,
	},
	profileContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 7,
		marginHorizontal: 20,
	},
	profileImage: {
		width: 30,
		height: 30,
		marginRight: 12,
	},
	profileTextContainer: {
		flex: 1,
		marginRight: 4,
	},
	profileName: {
		color: "#181314",
		fontSize: 14,
		marginBottom: 4,
		marginLeft: 1,
	},
	profileHandle: {
		color: "#3B3B3B",
		fontSize: 12,
	},
	profileIcon: {
		width: 24,
		height: 24,
	},
	mainImage: {
		height: 349,
		marginBottom: 10,
		marginHorizontal: 20,
	},
	iconsContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 17,
		marginHorizontal: 26,
	},
	icon: {
		width: 24,
		height: 24,
		marginRight: 22,
	},
	iconSmall: {
		width: 19,
		height: 19,
	},
	spacer: {
		flex: 1,
		alignSelf: "stretch",
	},
	likesText: {
		color: "#000000",
		fontSize: 12,
		marginBottom: 6,
		marginLeft: 21,
	},
	commentContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 25,
		marginHorizontal: 20,
	},
	commentUser: {
		color: "#000000",
		fontSize: 14,
		marginRight: 11,
	},
	commentText: {
		color: "#000000",
		fontSize: 14,
		flex: 1,
	},
	mainImageContainer: {
		marginHorizontal: 20,
	},
	overlayContainer: {
		position: "absolute",
		bottom: 126,
		left: -20,
		width: 390,
		height: 64,
		backgroundColor: "#FCF2F4",
		paddingHorizontal: 24,
	},
	overlayHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},
	overlayIconContainer: {
		width: 48,
		backgroundColor: "#EEC0C8",
		borderRadius: 100,
		paddingHorizontal: 12,
		marginRight: 39,
	},
	overlayIcon: {
		height: 24,
		marginTop: 12,
	},
	overlayNotificationContainer: {
		width: 18,
	},
	overlayNotification: {
		height: 18,
	},
	overlayNotificationBadge: {
		position: "absolute",
		bottom: -2,
		right: -2,
		width: 6,
		height: 6,
	},
	progressContainer: {
		position: "absolute",
		bottom: 103,
		left: -20,
		width: 390,
		height: 23,
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 128,
	},
	progressBar: {
		height: 4,
		backgroundColor: "#000000",
		borderRadius: 100,
		marginTop: 12,
	},
});

export default HomeScreen;
