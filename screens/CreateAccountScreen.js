import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/InputField";
import Header from "../components/Header";
import Button from "../components/Button";
import { API_URL } from "../api/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

const postFormData = async (formData) => {
  const response = await axios.get(
    `${API_URL}/auth/email-verification?email=${formData.email}`
  );
  return response.data;
};

export default function CreateAccount() {
  const navigation = useNavigation();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { colorScheme } = useColorScheme();
  const mutation = useMutation({
    mutationFn: postFormData,
    onSuccess: (responseData) => {
      if (responseData.success) {
        navigation.navigate("OTPVerification", {
          email: data.email,
          username: data.username,
          password: data.password,
          otpData: responseData.data,
        });
      } else {
        // Handle error (e.g., show an error message)
        console.error(responseData.message);
      }
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const handleSubmit = () => {
    if (
      data.username.trim() === "" ||
      data.email.trim() === "" ||
      data.password.trim() === ""
    ) {
      return;
    }
    mutation.mutate({
      email: data.email,
    });
  };
  return (
    <SafeAreaView className=" bg-white h-full py-5 dark:bg-[#222831]">
      {/* Back Icon */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-12 left-5 z-50"
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
      <Header />
      <View className="space-y-2 mb-6 text-dark flex flex-col justify-center text-center">
        <Text className="font-bold capitalize text-base text-center dark:text-white">
          sign up
        </Text>
        <Text className="text-xs text-center dark:text-white">
          Sign up to start using the app.
        </Text>
      </View>
      <View className="mx-4">
        <InputField
          placeholder="Enter Username"
          Icon={require("../assets/user_icon.png")}
          onChange={(val) =>
            setData({
              ...data,
              username: val.nativeEvent.text,
            })
          }
          colorScheme={colorScheme}
          value={data.username}
        />
        <InputField
          placeholder="Sign up with E-mail/Mobile"
          Icon={require("../assets/passkey.png")}
          onChange={(val) =>
            setData({
              ...data,
              email: val.nativeEvent.text,
            })
          }
          colorScheme={colorScheme}
          value={data.email}
          keyboardType="email-address"
        />
        <InputField
          placeholder="Enter Password"
          Icon={require("../assets/vpn_key.png")}
          onChange={(val) =>
            setData({
              ...data,
              password: val.nativeEvent.text,
            })
          }
          colorScheme={colorScheme}
          value={data.password}
          keyboardType="default"
          secureTextEntry={true}
        />
        <Text className=" text-xs text-gray-500 mt-2 w-full text-justify dark:text-gray-200">
          Password must be at least{" "}
          <Text className="font-medium">8 Characters</Text> and must contain at
          least a <Text className="font-medium">Capital Letter</Text>, a{" "}
          <Text className="font-medium">Number</Text> and a{" "}
          <Text className="font-medium">Special Character</Text>.
        </Text>
        <Button title="Sign Up" onPress={handleSubmit} />
        <View className=" mt-3 mx-3 flex-row items-center space-x-2 justify-center">
          <Text className=" text-grayish text-xs dark:text-white">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className=" text-grayish text-xs dark:text-blue-500">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex items-center space-x-3 flex-row justify-center my-6">
          <View className="w-2/5 h-0.5 bg-gray-400"></View>
          <Text className="text-gray-400 mx-2">Or</Text>
          <View className="w-2/5 h-0.5 bg-gray-400"></View>
        </View>
        <View className=" flex items-center">
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity className="w-full flex flex-row items-center p-4 bg-primary rounded-lg">
              <Image
                source={require("../assets/Logo/google-9646e5e7.png")}
                className="w-6 h-6"
              />
              <Text className=" text-dark font-bold text-sm w-11/12 text-center">
                Sign up with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
