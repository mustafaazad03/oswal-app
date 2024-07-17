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
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
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
        <Feather
          name="settings"
          size={22}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="text-sm font-medium text-dark dark:text-white">
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center space-x-3 w-full"
        onPress={() => navigation.navigate("SavedPost")}
      >
        <Feather
          name="bookmark"
          size={22}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="text-sm font-medium text-dark dark:text-white">
          Saved
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center space-x-3 w-full"
        onPress={toggleColorScheme}
      >
        <MaterialIcons
          name="dark-mode"
          size={22}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="text-sm font-medium text-dark dark:text-white">
          {colorScheme.toUpperCase() === "DARK" ? "Light" : "Dark"} mode
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center space-x-3 w-full"
        onPress={() => setReportModalVisible(true)}
      >
        <MaterialIcons
          name="report-gmailerrorred"
          size={22}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="text-sm font-medium text-dark dark:text-white">
          Report a problem
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center space-x-3 w-full border-t border-t-black dark:border-t-white pt-4"
        onPress={onLogout}
      >
        <View className="rotate-180">
          <MaterialIcons
            name="logout"
            size={22}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </View>
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
