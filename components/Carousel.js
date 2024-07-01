import * as React from "react";
import { Dimensions, Text, View, Image, ActivityIndicator } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchAlbum } from "./fetchAlbum";
import { fetchAlbumData } from "./fetchAlbumData";
const album = [
  "https://res.cloudinary.com/ddsp8i11t/image/upload/v1718902302/eq4gnwnahsdihiagqjvx.jpg",
  "https://res.cloudinary.com/ddsp8i11t/image/upload/v1718902302/ucwysaw6dpivnefo1gda.jpg",
  "https://res.cloudinary.com/ddsp8i11t/image/upload/v1718902303/hqg2j36iu1546lg8fx2v.webp",
  "https://res.cloudinary.com/ddsp8i11t/image/upload/v1719031498/kjjcid5fnfbnjvrmkvly.jpg",
];
function CarouselComponent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["album"],
    queryFn: fetchAlbumData,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("album:", data);
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchAlbumData();
  //       console.log(data);
  //       // setLoading(false);
  //     } catch (error) {
  //       // setError(error);
  //       // setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
