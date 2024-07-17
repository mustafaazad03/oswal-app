import { Modal, View, TouchableOpacity, Text, Image } from "react-native";

const DeleteFeedModal = ({ isVisible, onClose, onDelete, onRestore, item }) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<View className="flex-1 justify-center items-center bg-primary/50">
				<View
					className="bg-white rounded-lg p-6 w-5/6 max-w-sm"
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.9, opacity: 0 }}
				>
					<View className="flex-row items-center mb-4 border-b border-gray-600 pb-4">
						<TouchableOpacity onPress={onClose}>
							<Image
								source={require("../assets/arrow_back.png")}
								className="w-6 h-6"
							/>
						</TouchableOpacity>
						<Text className="text-lg font-semibold ml-4">Delete Feed</Text>
					</View>

					<Image
						source={{ uri: item?.imageUrl }}
						className="w-full h-40 rounded-lg mb-4"
					/>

					<Text className="text-sm text-gray-600 mb-4">
						25 days left until permanently deleted.
					</Text>

					<View className="flex-row justify-between w-full">
						<TouchableOpacity
							onPress={onDelete}
							className="bg-white border border-gray-300 rounded-full w-[48%] px-6 py-2 flex flex-row items-center justify-center"
						>
							<Text>Delete</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={onRestore}
							className="bg-primary rounded-full px-6 py-2 w-[48%] flex flex-row items-center justify-center"
						>
							<Text>Restore</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default DeleteFeedModal;
