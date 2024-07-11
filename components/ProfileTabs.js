import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import ReviewTab from "./ReviewTab";
import HomeProfileFeed from "./HomeProfileFeed";
import { Entypo } from "@expo/vector-icons";
import PostModal from "./PostModal";

const ProfileTabs = ({ user, post }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postData, setPostData] = useState(null);

  const onPostPress = useCallback((data) => {
    setPostData(data);
    setIsModalVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setIsModalVisible(false);
    setPostData(null);
  }, []);

  const tabs = [
    { tab: "Home", icon: "home" },
    { tab: "Feed", icon: "grid" },
    { tab: "Ratings & Reviews", icon: "star" },
  ];

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case "Home":
        return (
          <HomeProfileFeed
            businessDetails={user?.businessDetails}
            contactDetails={user?.contactDetails}
            socials={user?.contactDetails?.socials}
          />
        );
      case "Feed":
        const sortedPosts = [...post].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return (
          <FlatList
            data={sortedPosts}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="w-[33.33%] aspect-square p-1"
                onPress={() => onPostPress(item)}
              >
                <Image
                  source={{ uri: item?.imageUrl }}
                  className="w-full h-full rounded-md"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            ListEmptyComponent={<Text>No posts available</Text>}
          />
        );
      case "Ratings & Reviews":
        return <ReviewTab reviews={user?.ratings} user={user} />;
      default:
        return null;
    }
  }, [activeTab, user, post, onPostPress]);

  const renderItem = useCallback(() => {
    return (
      <View style={{ flex: 1 }}>
        {renderTabContent()}
        <PostModal
          onClose={onClose}
          isVisible={isModalVisible}
          data={postData}
          user={user}
        />
      </View>
    );
  }, [activeTab, isModalVisible, postData, onClose]);

  const renderHeader = useCallback(
    () => (
      <View className="flex-row justify-around border-b border-gray-200 mb-4 px-4 pt-4">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.tab}
            onPress={() => setActiveTab(tab.tab)}
            className={`py-2 pr-3 flex-row items-center gap-2 ${
              activeTab === tab.tab ? "border-b-2 border-black" : ""
            }`}
          >
            <Entypo name={tab.icon} size={16} color="black" />
            <Text
              className={`font-semibold ${
                activeTab === tab.tab ? "text-dark" : "text-gray-600"
              }`}
            >
              {tab.tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ),
    [activeTab]
  );

  return (
    <FlatList
      data={[{ key: "content" }]}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      stickyHeaderIndices={[0]}
    />
  );
};

export default ProfileTabs;
