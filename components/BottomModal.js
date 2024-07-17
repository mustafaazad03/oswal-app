import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import ReportProblemModal from "./reportProblemModal";
import { useColorScheme } from "nativewind";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { logout } from "../api/auth";

const BottomModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { setFullUser, setUser, user } = useAuth();
  const [reportModalVisible, setReportModalVisible] = useState(false);

  // ref
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["35%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const onLogout = () => {
    onClose();
    logout();
    setFullUser(null);
    setUser(null);
    navigation.navigate("Login");
  };

  // Render the content of your bottom sheet
  const renderContent = () => (
    <View className="p-4 space-y-4 px-4 text-dark dark:text-white bg-white dark:bg-gray-800 font-medium  h-full">
      <TouchableOpacity
        className="flex-row items-center space-x-3 w-full"
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Image
          source={require("../assets/Profile/settings.png")}
          className="w-6 h-6"
        />
        <Text className="text-sm font-medium text-dark dark:text-white">
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center space-x-3 w-full"
        onPress={() => navigation.navigate("SavedPost")}
      >
        <Image
          source={require("../assets/Profile/bookmark.png")}
          className="w-6 h-6"
        />
        <Text className="text-sm font-medium text-dark dark:text-white">
          Saved
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center space-x-3 w-full"
        onPress={toggleColorScheme}
      >
        <Image
          source={require("../assets/Profile/contrast.png")}
          className="w-6 h-6"
        />
        <Text className="text-sm font-medium text-dark dark:text-white">
          {colorScheme.toUpperCase()} mode
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center space-x-3 w-full"
        onPress={() => setReportModalVisible(true)}
      >
        <Image
          source={require("../assets/Profile/brightness_alert.png")}
          className="w-6 h-6"
        />
        <Text className="text-sm font-medium text-dark dark:text-white">
          Report a problem
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center space-x-3 w-full border-t border-t-black pt-4"
        onPress={onLogout}
      >
        <Image
          source={require("../assets/Profile/move_item.png")}
          className="w-6 h-6"
        />
        <Text
          className="text-sm font-medium text-dark dark:text-white"
          onPress={logout}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={isVisible ? 0 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        onClose={onClose}
        backdropComponent={renderBackdrop}
      >
        {renderContent()}
      </BottomSheet>
      <ReportProblemModal
        isVisible={reportModalVisible}
        onClose={() => setReportModalVisible(false)}
        userId={user?.userId}
      />
    </>
  );
};

export default BottomModal;
