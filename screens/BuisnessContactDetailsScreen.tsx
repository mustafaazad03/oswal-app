import React from "react";
import {
	SafeAreaView,
	View,
	ScrollView,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

interface InputFieldProps {
	label: string;
	placeholder: string;
	isDropdown?: boolean;
	onPress?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	placeholder,
	isDropdown = false,
	onPress,
}) => (
	<>
		<Text style={styles.label}>{label}</Text>
		<View style={isDropdown ? styles.dropdown : styles.input}>
			<TextInput
				style={{ flex: 1 }}
				placeholder={placeholder}
				editable={!isDropdown}
			/>
			{isDropdown && (
				<TouchableOpacity onPress={onPress}>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode="stretch"
						style={styles.icon}
					/>
				</TouchableOpacity>
			)}
		</View>
	</>
);

const BusinessContactDetails: React.FC = () => (
	<SafeAreaView style={styles.safeArea}>
		<ScrollView style={styles.scrollView}>
			<Image
				source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
				resizeMode="stretch"
				style={styles.logo}
			/>
			<Text style={styles.header}>Enter your Business Contact Details</Text>
			<Text style={styles.subHeader}>You can always change this later.</Text>

			<InputField label="Working Since" placeholder="Select" isDropdown />
			<InputField
				label="Business Working Hours"
				placeholder="Select"
				isDropdown
			/>
			<InputField label="Contact Person Name" placeholder="Enter name" />
			<InputField label="Designation" placeholder="Enter designation" />
			<InputField label="Mobile Number" placeholder="Enter mobile number" />
			<InputField label="Whatsapp Number" placeholder="Enter whatsapp number" />

			<View style={styles.sameNumberContainer}>
				<Image
					source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
					resizeMode="stretch"
					style={styles.checkbox}
				/>
				<Text style={styles.checkboxLabel}>Same as Mobile Number</Text>
			</View>

			<InputField label="Business E-mail" placeholder="Enter email" />
			<Text style={styles.sectionHeader}>Social Media Links:</Text>
			<InputField label="Website" placeholder="Enter website URL" />
			<InputField label="Instagram" placeholder="Enter Instagram handle" />
			<InputField label="Twitter" placeholder="Enter Twitter handle" />
			<InputField label="Facebook" placeholder="Enter Facebook profile" />
			<InputField label="Pinterest" placeholder="Enter Pinterest handle" />

			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Next</Text>
			</TouchableOpacity>
		</ScrollView>
	</SafeAreaView>
);

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	scrollView: {
		flex: 1,
		paddingTop: 56,
		paddingBottom: 27,
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
	input: {
		height: 38,
		borderColor: "#EEC0C8",
		borderRadius: 8,
		borderWidth: 1,
		paddingHorizontal: 8,
		marginBottom: 27,
	},
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
	icon: {
		width: 9,
		height: 5,
	},
	sameNumberContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 27,
	},
	checkbox: {
		width: 15,
		height: 16,
		marginRight: 8,
	},
	checkboxLabel: {
		color: "#535353",
		fontSize: 12,
	},
	sectionHeader: {
		color: "#000000",
		fontSize: 16,
		marginBottom: 26,
	},
	button: {
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

export default BusinessContactDetails;
