import { View, Text, Modal, Pressable, Image } from "react-native";
import React from "react";

const PostModal = ({ onClose, isVisible, data }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View className="absolute">
        <View className="flex flex-row">
          <Pressable onPress={onClose}>
            <Text>←</Text>
          </Pressable>
          <Text className="">Post</Text>
        </View>
        <Text>
          <Image
            source={{ uri: data?.profilePic }}
            className="w-full h-full rounded-md"
          />
          {/* {data.profilePic} */}
        </Text>
      </View>
    </Modal>
  );
};

export default PostModal;
