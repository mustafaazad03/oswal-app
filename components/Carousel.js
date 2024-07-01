import * as React from "react";
import { Dimensions, Text, View, Image, ActivityIndicator } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const album = [
  "https://res.cloudinary.com/ddsp8i11t/image/upload/v1718902302/eq4gnwnahsdihiagqjvx.jpg",
  "https://res.cloudinary.com/ddsp8i11t/image/upload/v1718902302/ucwysaw6dpivnefo1gda.jpg",
  "https://res.cloudinary.com/ddsp8i11t/image/upload/v1718902303/hqg2j36iu1546lg8fx2v.webp",
  "https://res.cloudinary.com/ddsp8i11t/image/upload/v1719031498/kjjcid5fnfbnjvrmkvly.jpg",
];
function CarouselComponent() {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={album}
        scrollAnimationDuration={1000}
        // onSnapToItem={(item, index) =>
        //   console.log("current index:", index, item)
        // }
        renderItem={({ item, index }) => {
          // console.log(`ye aaraha h`, index);
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: item }}
                className="w-full object-cover h-full"
              />
            </View>
          );
        }}
      />
    </View>
  );
}

export default CarouselComponent;
