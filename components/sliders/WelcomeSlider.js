import React, { Fragment, useState, useRef } from "react";
import { FlatList } from "native-base";
import { WelcomeCard, WelcomePagination } from "../general";
import { welcomeData } from "../../constants/mock";

const WelcomeSlider = () => {
  const [walkthroughIndex, setWalkthroughIndex] = useState(0);
  const walkthroughList = useRef();
  const onViewRef = useRef(({ changed }) => {
    setWalkthroughIndex(changed[0].index);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  return (
    <Fragment>
      <FlatList
        ref={walkthroughList}
        data={welcomeData}
        keyExtractor={(item) => item.title}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        overScrollMode="never"
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        renderItem={({ item }) => <WelcomeCard {...item} />}
      />
      <WelcomePagination index={walkthroughIndex} />
    </Fragment>
  );
};

export default WelcomeSlider;
