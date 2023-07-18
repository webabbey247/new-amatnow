import { Fragment, useEffect } from "react";
import { useColorMode, ScrollView, Box, Text } from "native-base";
import { Stack, useSearchParams } from "expo-router";
import { useGetSingleRestuarantQuery } from "../../../../redux/restuarant/restaurantApiSlice";
import { SingleRestuarantHeader } from "../../../../components/headings";
import {
  SingleRestuarantAdsSlider,
  FeaturedMenuSlider,
  RestuarantReviewSlider,
  MenuListSlider,
} from "../../../../components/sliders";
import {
  CartCounterCard,
  SingleStoreSliderCard,
} from "../../../../components/general";
import { setNoAuthID } from "../../../../redux/general/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import { userDeviceID } from "../../../../utils/helper";

const RestuarantSinglePage = () => {
  const params = useSearchParams();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const { noAuthID } = useSelector((state) => state.general);
  const { data: singleRestuarantData, isLoading } = useGetSingleRestuarantQuery(
    params.restuarantid
  );

  const generateUserDeviceID = () => {
    if (noAuthID === "" || noAuthID === null) {
      dispatch(setNoAuthID(userDeviceID));
    }
  };

  useEffect(() => {
    generateUserDeviceID();
  });

  console.log("hello Restuarant ID:", params.restuarantid);
  console.log("hello page type:", params.title);

  return (
    <Box
      flex={1}
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <SingleRestuarantHeader
          loading={isLoading}
          responseData={singleRestuarantData}
        />

        <SingleRestuarantAdsSlider />

        {params.title === "store" || params.title === "pharmacy" ? (
          <SingleStoreSliderCard responseData={singleRestuarantData?.menu_categories}  restuarantID={params.restuarantid} />
        ) : (
          <Fragment>
            <FeaturedMenuSlider
              title="Featured Menu"
              restuarantID={params.restuarantid}
            />
            <RestuarantReviewSlider restuarantID={params.restuarantid} />
            <MenuListSlider
              loading={isLoading}
              restuarantID={params.restuarantid}
              responseData={singleRestuarantData?.menu_categories}
            />
          </Fragment>
        )}

        <CartCounterCard restuarantID={params.restuarantid} />
      </ScrollView>
    </Box>
  );
};

export default RestuarantSinglePage;
