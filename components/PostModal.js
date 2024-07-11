import { View, Text, Modal, Pressable, Image } from "react-native";
import React from "react";

const PostModal = ({ onClose, isVisible, data, user }) => {
  if (!data) return null;
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Pressable
        style={{ flex: 1 }}
        className="justify-center items-center bg-primary/60"
        onPress={onClose}
      >
        <Pressable
          className="w-11/12 bg-white rounded-lg py-3 shadow-lg space-y-3"
          onPress={(e) => e.stopPropagation()} // Prevent closing when pressing inside the modal
        >
          <View className="flex-row items-center justify-start px-5 space-x-2">
            <Image
              source={{ uri: user?.profilePic }} // Change this from profilePic to imageUrl
              className="w-10 h-10 rounded-full"
              resizeMode="cover"
            />
            <View className="flex flex-col space-y-px">
              <Text className="text-black">{user?.name}</Text>
              <Text className="text-black text-xs">{`@` + user?.username}</Text>
            </View>
          </View>
          <Image
            source={{ uri: data?.imageUrl }} // Change this from profilePic to imageUrl
            className="w-full h-72 rounded-md"
            resizeMode="contain"
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default PostModal;
