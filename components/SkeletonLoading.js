import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SkeletonItem = ({ animatedValue }) => {
	return (
		<View style={styles.skeletonItem}>
			<View style={styles.headerContainer}>
				<Animated.View style={[styles.avatar, { opacity: animatedValue }]} />
				<View style={styles.headerTextContainer}>
					<Animated.View
						style={[styles.headerText, { opacity: animatedValue }]}
					/>
					<Animated.View
						style={[styles.headerSubtext, { opacity: animatedValue }]}
					/>
				</View>
			</View>
			<Animated.View style={[styles.image, { opacity: animatedValue }]} />
			<View style={styles.actionContainer}>
				<Animated.View
					style={[styles.actionItem, { opacity: animatedValue }]}
				/>
				<Animated.View
					style={[styles.actionItem, { opacity: animatedValue }]}
				/>
				<Animated.View
					style={[styles.actionItem, { opacity: animatedValue }]}
				/>
			</View>
			<Animated.View style={[styles.caption, { opacity: animatedValue }]} />
		</View>
	);
};

const SkeletonLoading = () => {
	const animatedValue = React.useRef(new Animated.Value(0.5)).current;

	React.useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(animatedValue, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(animatedValue, {
					toValue: 0.5,
					duration: 1000,
					useNativeDriver: true,
				}),
			])
		);

		animation.start();

		return () => animation.stop();
	}, [animatedValue]);

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={["#f6f7f8", "#edeef1", "#f6f7f8"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				style={StyleSheet.absoluteFill}
			/>
			<SkeletonItem animatedValue={animatedValue} />
			<SkeletonItem animatedValue={animatedValue} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	skeletonItem: {
		marginBottom: 24,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#E1E9EE",
		marginRight: 12,
	},
	headerTextContainer: {
		flex: 1,
	},
	headerText: {
		width: "60%",
		height: 14,
		borderRadius: 4,
		backgroundColor: "#E1E9EE",
		marginBottom: 6,
	},
	headerSubtext: {
		width: "40%",
		height: 12,
		borderRadius: 4,
		backgroundColor: "#E1E9EE",
	},
	image: {
		width: "100%",
		height: 300,
		borderRadius: 8,
		backgroundColor: "#E1E9EE",
		marginBottom: 12,
	},
	actionContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	actionItem: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: "#E1E9EE",
	},
	caption: {
		width: "100%",
		height: 16,
		borderRadius: 4,
		backgroundColor: "#E1E9EE",
	},
});

export default SkeletonLoading;
