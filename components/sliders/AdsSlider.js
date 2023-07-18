import React, { useState, useEffect } from "react";
import { FlatList, Center } from "native-base";
import { HomeAdsCard } from "../general";

const AdsSlider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const adsData = [
    {
      id: 1,
      title: "50% off Shawarma House",
      subTitle: "Get 50% off when your order is above $30, offer ends 26/10.",
      image: "ADSIMG",
      bgColor: "DEFAULT_RED",
      buttonColor: "DEFAULT_RED_2",
    },
    {
      id: 2,
      title: "Buy one get 1 free",
      subTitle: "Shop at cream haven and get a free ice cream on every buy. .",
      image: "ADSIMG2",
      bgColor: "DEFAULT_PINK",
      buttonColor: "DEFAULT_PINK_2",
    },
    {
      id: 3,
      title: "25% off all salads",
      subTitle: "Buy any salad bowl from greenes and get 25% off.",
      image: "ADSIMG3",
      bgColor: "DEFAULT_GREEN",
      buttonColor: "DEFAULT_GREEN_2",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Center justifyContent="flex-start" bg="white.500" py={2}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={adsData}
        keyExtractor={(item) => item?.id}
        horizontal
        renderItem={({ item }) => (
          <HomeAdsCard
            title={item.title}
            subTitle={item.subTitle}
            image={item.image}
            bgColor={item.bgColor}
            btnColor={item.buttonColor}
            loading={isLoading}
          />
        )}
      />
    </Center>
  );
};

export default AdsSlider;
