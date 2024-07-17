import React, { useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import ReviewTab from "./ReviewTab";
import HomeProfileFeed from "./HomeProfileFeed";
import { Entypo } from "@expo/vector-icons";
import PostModal from "./PostModal";

const TABS = [
  { tab: "Home", icon: "home" },
  { tab: "Feed", icon: "grid" },
  { tab: "Reviews", icon: "star" },
];

const ProfileTabs = ({ user, post, isSelfUser }) => {
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

  const sortedPosts = useMemo(
    () =>
      post
        ? [...post].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        : [],
    [post]
  );

  const renderFeed = useCallback(
    () => (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {sortedPosts.map((item, index) => (
          <TouchableOpacity
            key={item.id || index}
            style={{ width: "33.33%", aspectRatio: 1, padding: 1 }}
            onPress={() => onPostPress(item)}
          >
            <Image
              source={{ uri: item?.imageUrl }}
              style={{ width: "100%", height: "100%", borderRadius: 4 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
        {sortedPosts.length === 0 && <Text>No posts available</Text>}
      </View>
    ),
    [sortedPosts, onPostPress]
  );

  const renderTabContent = useCallback(() => {
    if (!user) return null;
    switch (activeTab) {
      case "Home":
        return (
          <HomeProfileFeed
            businessDetails={user.businessDetails || {}}
            contactDetails={user.contactDetails || {}}
            socials={user.contactDetails?.socials || {}}
          />
        );
      case "Feed":
        return renderFeed();
      case "Reviews": // Adjusted to match TABS array
        return (
          <ReviewTab
            reviews={user.ratings || []}
            user={user}
            isSelfUser={isSelfUser}
          />
        );
      default:
        return null;
    }
  }, [activeTab, user, renderFeed]);

  const renderHeader = useCallback(
    () => (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          marginBottom: 16,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
      >
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.tab}
            onPress={() => setActiveTab(tab.tab)}
            style={{
              paddingVertical: 8,
              paddingRight: 12,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: activeTab === tab.tab ? 2 : 0,
              borderBottomColor: activeTab === tab.tab ? "#000" : "transparent",
            }}
            className="space-x-1"
          >
            <Entypo
              name={tab.icon}
              size={16}
              color={activeTab === tab.tab ? "#000" : "#ccc"}
            />

            <Text
              style={{
                fontWeight: "600",
                color: activeTab === tab.tab ? "#000" : "#999",
              }}
            >
              {tab.tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ),
    [activeTab]
  );

  // Move the loading check after all hooks
  // if (!user || !post) {
  //   return <Text>Loading...</Text>;
  // }

  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      <ScrollView>{renderTabContent()}</ScrollView>
      <PostModal
        onClose={onClose}
        isVisible={isModalVisible}
        data={postData}
        user={user}
      />
    </View>
  );
};

export default React.memo(ProfileTabs);
