import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BottomPane = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    translateY.setValue(0);
  };

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let offset = nativeEvent.translationY + lastOffset.current;
      if (offset > 100) {
        setModalVisible(false);
      } else {
        translateY.setValue(0);
        lastOffset.current = 0;
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          onPress={toggleModal}
          className="bg-purple-700 h-40 p-4 rounded-lg"
        >
          <Text className="text-white text-lg">Open Pane</Text>
        </TouchableOpacity>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={{ justifyContent: "flex-end", margin: 0 }}
        >
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onHandlerStateChange={handleStateChange}
          >
            <Animated.View
              style={{
                transform: [{ translateY: translateY }],
              }}
              className="rounded-t-3xl bg-primary p-4"
            >
              <TouchableOpacity className="px-4 py-2 w-full rounded my-1 flex flex-row justify-start items-center space-x-2">
                <Feather name="settings" size={20} color="black" />
                <Text className="text-start font-semibold text-base">
                  Settings
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-2 w-full rounded my-1 flex flex-row justify-start items-center space-x-2">
                <Feather name="bookmark" size={20} color="black" />
                <Text className="text-start font-semibold text-base">
                  Saved
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-2 w-full rounded my-1 flex flex-row justify-start items-center space-x-2">
                <MaterialIcons name="dark-mode" size={20} color="black" />
                <Text className="text-start font-semibold text-base">
                  Dark Mode
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-2 w-full rounded my-1 flex flex-row justify-start items-center space-x-2">
                <MaterialIcons
                  name="report-gmailerrorred"
                  size={20}
                  color="black"
                />
                <Text className="text-start font-semibold text-base">
                  Report a problem
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleModal}
                className="p-4 w-full bg-purple-700 rounded"
              >
                <Text className="text-center text-white text-base">Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

export default BottomPane;
