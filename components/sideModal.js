import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SideModal({
  isVisible,
  onClose,
  onOptionPress,
  isFollowing,
  isBlocked,
  isCurrentUser,
}) {
  const options = [
    { label: "Rate", icon: "staro" },
    { label: "Review", icon: "edit" },
    { label: "View Profile", icon: "user" },
    !isCurrentUser && {
      label: isFollowing ? "Unfollow" : "Follow",
      icon: isFollowing ? "disconnect" : "adduser",
    },
    !isCurrentUser && {
      label: isBlocked ? "Unblock" : "Block",
      icon: isBlocked ? "unlock" : "lock",
    },
    { label: "Report a problem", icon: "warning" },
  ].filter(Boolean);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "#eec0c840" }}
        activeOpacity={1}
        onPress={onClose}
      >
        <View className="bg-primary w-32 transition duration-200 ease-in-out h-fit absolute right-2 top-28 rounded-xl">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              className="p-2 flex-row items-center"
              onPress={() => onOptionPress(option.label)}
            >
              <AntDesign
                name={option.icon}
                size={18}
                color="black"
                className="w-6 h-6"
              />
              <Text className="text-xs ml-2 font-medium">{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
