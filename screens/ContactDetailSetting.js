import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../api/user";
import { Ionicons } from "@expo/vector-icons";

export default function ContactDetailSettingScreen() {
  const navigation = useNavigation();
  const { user: authUser, fullUser } = useAuth();
  const [formData, setFormData] = useState({
    workingSince: fullUser.contactDetails?.workingSince || "",
    workingHours: fullUser.contactDetails?.workingHours || "",
    contactPersonName: fullUser.contactDetails?.contactName || "",
    designation: fullUser.contactDetails?.designation || "",
    mobileNumber: fullUser.contactDetails?.contactNumber?.mobile || "",
    whatsappNumber: fullUser.contactDetails?.contactNumber?.whatsapp || "",
    website: fullUser.contactDetails?.socials?.website || "",
    instagram: fullUser.contactDetails?.socials?.instagram || "",
    twitter: fullUser.contactDetails?.socials?.twitter || "",
    facebook: fullUser.contactDetails?.socials?.facebook || "",
    pinterest: fullUser.contactDetails?.socials?.pinterest || "",
  });
  const updateUserMutation = useMutation({
    mutationFn: (updateData) =>
      userService.updateUser(authUser?.userId, updateData),
    onSuccess: () => {
      Alert.alert("Success", "Business contact details updated successfully");
      navigation.goBack();
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      Alert.alert("Error", "Failed to update business contact details");
    },
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (
      !formData.contactPersonName ||
      !formData.designation ||
      !formData.mobileNumber ||
      !formData.whatsappNumber
    ) {
      Alert.alert("Error", "Please enter contact person name and designation");
      return;
    }
    const updateData = {
      contactDetails: {
        workingSince: formData.workingSince,
        workingHours: formData.workingHours,
        contactName: formData.contactPersonName,
        designation: formData.designation,
        contactNumber: {
          mobile: formData.mobileNumber,
          whatsapp: formData.whatsappNumber,
        },
        socials: {
          website: formData.website,
          instagram: formData.instagram,
          twitter: formData.twitter,
          facebook: formData.facebook,
          pinterest: formData.pinterest,
        },
      },
    };

    updateUserMutation.mutate(updateData);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-[#FFD1DC] p-4 flex-row items-center pt-8">
        <View className="flex flex-row space-x-2 justify-center items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Contact Details</Text>
        </View>
        <TouchableOpacity className="ml-auto" onPress={handleSubmit}>
          {updateUserMutation.isLoading ? (
            <ActivityIndicator
              size="large"
              color="#FFD1DC"
              style={{ marginTop: 20 }}
            />
          ) : (
            <Image
              source={require("../assets/check.png")}
              className="w-6 h-6"
            />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="w-full p-4 mb-6">
        <Text className="text-2xl font-bold mb-2">
          Enter your Business Contact Details
        </Text>
        <Text className="text-sm text-gray-500 mb-4">
          You can always change this later.
        </Text>

        <View className="border border-primary rounded-lg mb-4">
          <Picker
            selectedValue={formData.workingSince}
            onValueChange={(value) => handleInputChange("workingSince", value)}
          >
            <Picker.Item label="Working Since" value="" />
            {/* Add year options here */}
            <Picker.Item label="2021" value="2021" />
            <Picker.Item label="2020" value="2020" />
            <Picker.Item label="2019" value="2019" />
            <Picker.Item label="2018" value="2018" />
            <Picker.Item label="2017" value="2017" />
            <Picker.Item label="2016" value="2016" />
            <Picker.Item label="2015" value="2015" />
            <Picker.Item label="2014" value="2014" />
            <Picker.Item label="2013" value="2013" />
            <Picker.Item label="2012" value="2012" />
            <Picker.Item label="2011" value="2011" />
            <Picker.Item label="2010" value="2010" />
            <Picker.Item label="2009" value="2009" />
            <Picker.Item label="2008" value="2008" />
            <Picker.Item label="2007" value="2007" />
          </Picker>
        </View>

        <View className="border border-primary rounded-lg mb-4">
          <Picker
            selectedValue={formData.workingHours}
            onValueChange={(value) => handleInputChange("workingHours", value)}
          >
            <Picker.Item label="Business Working Hours" value="" />
            {/* Add working hours options here */}
            <Picker.Item label="24 Hours" value="24" />
            <Picker.Item label="12 Hours" value="12" />
            <Picker.Item label="8 Hours" value="8" />
            <Picker.Item label="4 Hours" value="4" />
            <Picker.Item label="Custom" value="custom" />
          </Picker>
        </View>

        <TextInput
          placeholder="Contact Person Name"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.contactPersonName}
          onChangeText={(text) => handleInputChange("contactPersonName", text)}
        />

        <TextInput
          placeholder="Designation"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.designation}
          onChangeText={(text) => handleInputChange("designation", text)}
        />

        <TextInput
          placeholder="Mobile Number"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.mobileNumber}
          onChangeText={(text) => handleInputChange("mobileNumber", text)}
          keyboardType="phone-pad"
        />

        <TextInput
          placeholder="Whatsapp Number"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.whatsappNumber}
          onChangeText={(text) => handleInputChange("whatsappNumber", text)}
          keyboardType="phone-pad"
        />

        <TextInput
          placeholder="Business E-mail"
          className="border border-primary p-3 rounded-lg mb-4"
          value={authUser?.email}
          editable={false}
          keyboardType="email-address"
        />

        <Text className="font-bold mb-2">Social Media Links:</Text>

        <TextInput
          placeholder="Website"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.website}
          onChangeText={(text) => handleInputChange("website", text)}
        />

        <TextInput
          placeholder="Instagram"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.instagram}
          onChangeText={(text) => handleInputChange("instagram", text)}
        />

        <TextInput
          placeholder="Twitter"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.twitter}
          onChangeText={(text) => handleInputChange("twitter", text)}
        />

        <TextInput
          placeholder="Facebook"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.facebook}
          onChangeText={(text) => handleInputChange("facebook", text)}
        />

        <TextInput
          placeholder="Pinterest"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.pinterest}
          onChangeText={(text) => handleInputChange("pinterest", text)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
