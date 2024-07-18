import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { Svg, Path } from "react-native-svg";

const RatingComponent = ({ rating, onRatingChange }) => {
  const { colorScheme } = useColorScheme();
  const handleClick = (value) => {
    onRatingChange(value);
  };

  const RenderStar = ({ index, rating, onClick }) => {
    return (
      <TouchableOpacity
        onPress={() => onClick(index)}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Rate ${index} star${index > 1 ? "s" : ""}`}
        accessibilityState={{ selected: index <= rating }}
        style={{
          padding: 5,
          marginRight: 5,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
      >
        <Svg
          width={50}
          height={50}
          viewBox="0 0 15 14"
          fill={
            index <= rating
              ? "#FFD700"
              : colorScheme === "dark"
              ? "#fff"
              : "#1C1B1F"
          }
        >
          <Path
            d="M3.73113 12.2493L4.67904 8.15143L1.49988 5.39518L5.69988 5.0306L7.33321 1.16602L8.96654 5.0306L13.1665 5.39518L9.98738 8.15143L10.9353 12.2493L7.33321 10.0764L3.73113 12.2493Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </Svg>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
      }}
      accessibilityRole="radiogroup"
      accessibilityLabel="Star Rating"
    >
      {[1, 2, 3, 4, 5].map((index) => (
        <RenderStar
          key={index}
          index={index}
          rating={rating}
          onClick={handleClick}
        />
      ))}
    </View>
  );
};

export default RatingComponent;
