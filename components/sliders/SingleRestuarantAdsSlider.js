import { useState, useRef } from "react";
import { FlatList, VStack } from "native-base";
import { adsNoTextData } from "../../constants/mock";
import { RestuarantAdsCard } from "../general";

const SingleRestuarantAdsSlider = () => {
  const [walkthroughIndex, setWalkthroughIndex] = useState(0);
  const walkthroughList = useRef();
  const onViewRef = useRef(({ changed }) => {
    setWalkthroughIndex(changed[0].index);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  return (
    <VStack px={4} w="100%" py={2}>
      <FlatList
        ref={walkthroughList}
        data={adsNoTextData}
        keyExtractor={(item) => item.title}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        overScrollMode="never"
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        renderItem={({ item }) => <RestuarantAdsCard {...item} />}
      />
    </VStack>
  );
};

export default SingleRestuarantAdsSlider;
