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

export default function BusinessDetailsSettingScreen() {
  const navigation = useNavigation();
  const { user: authUser, fullUser } = useAuth();
  const [formData, setFormData] = useState({
    category: fullUser.businessDetails?.productCategory?.category || "",
    subCategory: fullUser.businessDetails?.productCategory?.subCategory || "",
    aboutUs: fullUser.businessDetails?.about || "",
    officeNumber: fullUser.businessDetails?.address?.officeNumber || "",
    tower: fullUser.businessDetails?.address?.block || "",
    landmark: fullUser.businessDetails?.address?.landmark || "",
    pincode: fullUser.businessDetails?.address?.pincode || "",
    city: fullUser.businessDetails?.address?.city || "",
    state: fullUser.businessDetails?.address?.state || "",
    country: fullUser.businessDetails?.address?.country || "",
  });

  const updateUserMutation = useMutation({
    mutationFn: (updateData) =>
      userService.updateUser(authUser?.userId, updateData),
    onSuccess: () => {
      // Handle successful update
      Alert.alert("Success", "Business details updated successfully");
      navigation.goBack();
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      Alert.alert("Error", "Failed to update business details");
    },
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const updateData = {
      businessDetails: {
        productCategory: {
          category: formData.category,
          subCategory: formData.subCategory,
        },
        about: formData.aboutUs,
        address: {
          officeNumber: formData.officeNumber,
          block: formData.tower,
          landmark: formData.landmark,
          pincode: formData.pincode,
          city: formData.city,
          state: formData.state,
          country: formData.country,
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
          <Text className="text-xl font-bold">Business Details</Text>
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

      <ScrollView className="w-full p-4 h-screen pb-20">
        <Text className="text-2xl font-bold mb-2">
          Enter your Business or Profession Details
        </Text>
        <Text className="text-sm text-gray-500 mb-4">
          You can always change this later.
        </Text>

        <View className="border border-primary rounded-lg mb-4">
          <Picker
            selectedValue={formData.category}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <Picker.Item label="Select Product/Service Category" value="" />
            {/* Add more category options here */}
            <Picker.Item label="Grocery" value="grocery" />
            <Picker.Item label="Medicine" value="medicine" />
            <Picker.Item label="Vegetables" value="vegetables" />
            <Picker.Item label="Fruits" value="fruits" />
            <Picker.Item label="Dairy" value="dairy" />
            <Picker.Item label="Bakery" value="bakery" />
            <Picker.Item label="Stationary" value="stationary" />
            <Picker.Item label="Electronics" value="electronics" />
            <Picker.Item label="Furniture" value="furniture" />
            <Picker.Item label="Hardware" value="hardware" />
            <Picker.Item label="Plumbing" value="plumbing" />
            <Picker.Item label="Carpentry" value="carpentry" />
            <Picker.Item label="Painting" value="painting" />
            <Picker.Item label="Cleaning" value="cleaning" />
            <Picker.Item label="Catering" value="catering" />
            <Picker.Item label="Photography" value="photography" />
          </Picker>
        </View>

        <View className="border border-primary rounded-lg mb-4">
          <Picker
            selectedValue={formData.subCategory}
            onValueChange={(value) => handleInputChange("subCategory", value)}
          >
            <Picker.Item label="Select Product/Service Sub-Category" value="" />
            {/* Add more sub-category options here */}
            <Picker.Item label="Grocery" value="grocery" />
            <Picker.Item label="Medicine" value="medicine" />
            <Picker.Item label="Vegetables" value="vegetables" />
            <Picker.Item label="Fruits" value="fruits" />
            <Picker.Item label="Dairy" value="dairy" />
            <Picker.Item label="Bakery" value="bakery" />
            <Picker.Item label="Stationary" value="stationary" />
            <Picker.Item label="Electronics" value="electronics" />
            <Picker.Item label="Furniture" value="furniture" />
            <Picker.Item label="Hardware" value="hardware" />
            <Picker.Item label="Plumbing" value="plumbing" />
            <Picker.Item label="Carpentry" value="carpentry" />
            <Picker.Item label="Painting" value="painting" />
            <Picker.Item label="Cleaning" value="cleaning" />
            <Picker.Item label="Catering" value="catering" />
            <Picker.Item label="Photography" value="photography" />
            <Picker.Item label="Videography" value="videography" />
            <Picker.Item label="Event Management" value="event-management" />
            <Picker.Item label="Travel" value="travel" />
            <Picker.Item label="Tourism" value="tourism" />
            <Picker.Item label="Education" value="education" />
            <Picker.Item label="Healthcare" value="healthcare" />
            <Picker.Item label="Fitness" value="fitness" />
            <Picker.Item label="Beauty" value="beauty" />
            <Picker.Item label="Fashion" value="fashion" />
          </Picker>
        </View>

        <TextInput
          placeholder="About Us"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.aboutUs}
          onChangeText={(text) => handleInputChange("aboutUs", text)}
          multiline
        />

        <TouchableOpacity
          className="bg-pink-200 p-3 rounded-lg mb-4"
          onPress={() => {
            /* Implement Google Location picker */
          }}
        >
          <Text className="text-center">Add Google Location</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Office number/Floor*"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.officeNumber}
          onChangeText={(text) => handleInputChange("officeNumber", text)}
        />

        <TextInput
          placeholder="Tower/Block*"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.tower}
          onChangeText={(text) => handleInputChange("tower", text)}
        />

        <TextInput
          placeholder="Nearby Landmark (Optional)"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.landmark}
          onChangeText={(text) => handleInputChange("landmark", text)}
        />

        <TextInput
          placeholder="Pincode"
          className="border border-primary p-3 rounded-lg mb-4"
          value={formData.pincode}
          onChangeText={(text) => handleInputChange("pincode", text)}
          keyboardType="numeric"
        />

        <View className="border border-primary rounded-lg mb-4">
          <Picker
            selectedValue={formData.city}
            onValueChange={(value) => handleInputChange("city", value)}
          >
            <Picker.Item label="Select City" value="" />
            {/* Add city options here: indore, bhopal, other mp states */}
            <Picker.Item label="Indore" value="indore" />
            <Picker.Item label="Bhopal" value="bhopal" />
            <Picker.Item label="Ujjain" value="ujjain" />
            <Picker.Item label="Gwalior" value="gwalior" />
            <Picker.Item label="Jabalpur" value="jabalpur" />
            <Picker.Item label="Rewa" value="rewa" />
            <Picker.Item label="Satna" value="satna" />
            <Picker.Item label="Sagar" value="sagar" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <View className="border border-primary rounded-lg mb-4">
          <Picker
            selectedValue={formData.state}
            onValueChange={(value) => handleInputChange("state", value)}
          >
            <Picker.Item label="Select State" value="" />
            {/* Add state options here: maharashtra, madhya pardesh and all other */}
            <Picker.Item label="Madhya Pradesh" value="mp" />
            <Picker.Item label="Maharashtra" value="mh" />
            <Picker.Item label="Uttar Pradesh" value="up" />
            <Picker.Item label="Rajasthan" value="rj" />
            <Picker.Item label="Gujarat" value="gj" />
            <Picker.Item label="Karnataka" value="ka" />
            <Picker.Item label="Tamil Nadu" value="tn" />
            <Picker.Item label="Andhra Pradesh" value="ap" />
            <Picker.Item label="Telangana" value="ts" />
            <Picker.Item label="Kerala" value="kl" />
            <Picker.Item label="Haryana" value="hr" />
            <Picker.Item label="Punjab" value="pb" />
            <Picker.Item label="Bihar" value="br" />
            <Picker.Item label="Jharkhand" value="jh" />
            <Picker.Item label="West Bengal" value="wb" />
            <Picker.Item label="Odisha" value="od" />
            <Picker.Item label="Assam" value="as" />
            <Picker.Item label="Arunachal Pradesh" value="ar" />
            <Picker.Item label="Manipur" value="mn" />
            <Picker.Item label="Meghalaya" value="ml" />
            <Picker.Item label="Mizoram" value="mz" />
            <Picker.Item label="Nagaland" value="nl" />
            <Picker.Item label="Sikkim" value="sk" />
            <Picker.Item label="Tripura" value="tr" />
            <Picker.Item label="Goa" value="ga" />
            <Picker.Item label="Chhattisgarh" value="cg" />
            <Picker.Item label="Uttarakhand" value="uk" />
            <Picker.Item label="Himachal Pradesh" value="hp" />
            <Picker.Item label="Jammu and Kashmir" value="jk" />
            <Picker.Item label="Ladakh" value="ld" />
            <Picker.Item label="Andaman and Nicobar Islands" value="an" />
            <Picker.Item label="Chandigarh" value="ch" />
            <Picker.Item
              label="Dadra and Nagar Haveli and Daman and Diu"
              value="dn"
            />
            <Picker.Item label="Lakshadweep" value="ld" />
            <Picker.Item label="Puducherry" value="py" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <View className="border border-primary rounded-lg mb-8">
          <Picker
            selectedValue={formData.country}
            onValueChange={(value) => handleInputChange("country", value)}
          >
            <Picker.Item label="Select Country" value="" />
            {/* Add country options here */}
            <Picker.Item label="India" value="in" />
            <Picker.Item label="United States" value="us" />
            <Picker.Item label="United Kingdom" value="uk" />
            <Picker.Item label="Australia" value="au" />
            <Picker.Item label="Canada" value="ca" />
            <Picker.Item label="Germany" value="de" />
            <Picker.Item label="France" value="fr" />
            <Picker.Item label="Japan" value="jp" />
            <Picker.Item label="China" value="cn" />
            <Picker.Item label="Russia" value="ru" />
            <Picker.Item label="Brazil" value="br" />
            <Picker.Item label="South Africa" value="za" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
