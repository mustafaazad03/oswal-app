import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const HomeProfileFeed = () => {
  return (
    <View className="flex flex-col space-y-2 justify-center items-center">
      <View className="flex flex-row space-x-2 flex-1">
        <View className="flex flex-col bg-primary/40 p-5 rounded-xl space-y-2 justify-evenly items-center flex-1 h-40">
          <Text className="text-3xl font-bold">Category</Text>
          <Text className="text-lg font-bold">Business Category</Text>
        </View>
        <View className="flex flex-col space-y-2 bg-primary/40 p-5 rounded-xl justify-evenly items-center flex-1 h-40">
          <Text className="text-3xl font-bold">2013</Text>
          <Text className="text-lg font-bold">Working Since</Text>
        </View>
      </View>

      <View className="flex flex-row bg-primary/40 p-5 rounded-xl space-x-2 items-center flex-1 w-full">
        <Image
          source={require("../assets/Profile/location.png")}
          className="w-20 h-20 rounded-lg"
        />
        <View className="flex flex-col space-y-2">
          <Text className="text-xl font-bold">Business Address</Text>
          <View className="">
            <Text className="text-sm">123 - A Block, Building,</Text>
            <Text className="text-sm">Lorem Epsum area, </Text>
            <Text className="text-sm">Indore, Madhya Pradesh</Text>
            <Text className="text-sm">452001</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row bg-primary/40 p-5 rounded-xl space-x-2 items-center flex-1 w-full">
        <Image
          source={require("../assets/Profile/phone.png")}
          className="w-20 h-20 rounded-lg"
        />
        <View className="flex flex-col space-y-2">
          <Text className="text-xl font-bold">Business Contact</Text>
          <View className="">
            <Text className="text-sm">8845489181</Text>
            <Text className="text-sm">8815169096</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row bg-primary/40 p-5 rounded-xl space-x-2 items-center flex-1 w-full">
        <Image
          source={require("../assets/Profile/calendar.png")}
          className="w-20 h-20 rounded-lg"
        />
        <View className="flex flex-col space-y-2">
          <Text className="text-xl font-bold">Business Working Hours</Text>
          <View className="">
            <Text className="text-sm">Monday - 10:00am to 7:00pm</Text>
            <Text className="text-sm">Tuesday - 10:00am to 7:00pm</Text>
            <Text className="text-sm">Wednesday - 10:00am to 7:00pm</Text>
            <Text className="text-sm">Thursday - 10:00am to 7:00pm</Text>
            <Text className="text-sm">Friday - 10:00am to 7:00pm</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row bg-primary/40 p-5 rounded-xl space-x-2 items-center flex-1 w-full">
        <Image
          source={require("../assets/Profile/socialmedia.png")}
          className="w-20 h-20 rounded-lg"
        />
        <View className="flex flex-col space-y-2">
          <Text className="text-xl font-bold">Business Social Presence</Text>
          <View className="flex flex-col space-y-1">
            <View className="text-sm flex flex-row space-x-2 justify-start items-center">
              <Ionicons name="globe-outline" size={24} color="black" />
              <Text>8845489181</Text>
            </View>
            <View className="text-sm flex flex-row space-x-2 justify-start items-center">
              <AntDesign name="instagram" size={24} color="black" />
              <Text>8815169096</Text>
            </View>
            <View className="text-sm flex flex-row space-x-2 justify-start items-center">
              <AntDesign name="twitter" size={24} color="black" />
              <Text>8815169096</Text>
            </View>
            <View className="text-sm flex flex-row space-x-2 justify-start items-center">
              <AntDesign name="facebook-square" size={24} color="black" />
              <Text>8815169096</Text>
            </View>
            <View className="text-sm flex flex-row space-x-2 justify-start items-center">
              <Entypo name="pinterest" size={24} color="black" />
              <Text>8815169096</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-row bg-primary/40 p-5 rounded-xl space-x-2 items-center flex-1 w-full">
        <Image
          source={require("../assets/Profile/info.png")}
          className="w-20 h-20 rounded-lg"
        />
        <View className="flex flex-col space-y-2">
          <Text className="text-xl font-bold">About Business</Text>
          <View className="">
            <Text className="text-sm flex-wrap w-48">
              Jorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus
              luctus enim egestas, ac scelerisque ante pulvinar. Donec ut
              rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur
              vel bibendum lorem. Morbi convallis convallis diam sit amet
              lacinia. Aliquam in elementum tellus.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeProfileFeed;
