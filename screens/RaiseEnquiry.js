import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "@tanstack/react-query";
import { enquiryService } from "../api/enquiry";
import { Ionicons } from "@expo/vector-icons";

export default function RaiseEnquiryScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    gender: "",
    ageGroup: "",
    description: "",
  });

  const mutation = useMutation({
    mutationFn: (enquiryData) => enquiryService.createEnquiry(enquiryData),
    onSuccess: () => {
      // Show success message
      Alert.alert("Success", "Enquiry raised successfully.");
      navigation.goBack();
    },
    onError: (error) => {
      // Show error message
      Alert.alert("Error", error.message);
    },
  });

  const handleChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary/30">
      <View className="flex-row justify-start space-x-3 items-center p-4 bg-primary pt-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Raise Enquiry</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {[
          "Category",
          "Sub-Category",
          "City",
          "State",
          "Country",
          "Gender",
          "Age Group",
        ].map((item, index) => (
          <View key={index} className="mb-4">
            <Text className="text-gray-700 mb-1">{item}</Text>
            <View className="bg-white rounded-lg overflow-hidden">
              <Picker
                selectedValue={formData[item.toLowerCase().replace(" ", "")]}
                onValueChange={(itemValue) =>
                  handleChange(item.toLowerCase().replace(" ", ""), itemValue)
                }
              >
                <Picker.Item label={`Select ${item}`} value="" />
                {/* Add more Picker.Item components for each dropdown option */}
              </Picker>
            </View>
          </View>
        ))}

        <TouchableOpacity className="bg-primary p-3 rounded-lg mb-4 items-center">
          <Text className="font-semibold">Add Google Location</Text>
        </TouchableOpacity>

        <View className="mb-4">
          <Text className="text-gray-700 mb-1">Pincode</Text>
          <TextInput
            className="bg-white p-3 rounded-lg"
            value={formData.pincode}
            onChangeText={(text) => handleChange("pincode", text)}
            keyboardType="numeric"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-1">Description</Text>
          <TextInput
            className="bg-white px-3 rounded-lg h-24"
            value={formData.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline
          />
        </View>

        <TouchableOpacity
          className="bg-primary p-3 rounded-lg items-center mb-6"
          onPress={handleSubmit}
        >
          <Text className="font-semibold">Submit Enquiry</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
