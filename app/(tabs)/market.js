import { Fragment, useEffect, useState } from "react";
import { Box, useColorMode, ScrollView, Text } from "native-base";
import { MarketPlaceHeader } from "../../components/headings";
import {
  ServiceSlider,
  BestSellerSlider,
  EssentialSlider,
  AdsSlider,
  NearbyStoreSlider,
  BudgetFriendlySlider,
  RestuarantCategorySlider,
  PopularProductSlider,
} from "../../components/sliders";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import {
  setCoordinate,
  setLocationStatus,
  setAddress,
} from "../../redux/general/generalSlice";
import { NoRestuarantCard } from "../../components/general";
import { useRouter } from "expo-router";

export default function MarketPage() {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const { isBestSeller, isEssentials, isNearby, isBudgetFriendly, isPopular } =
    useSelector((state) => state.restuarant);
  Location.setGoogleApiKey("AIzaSyBJLRoEgulUxvcnTeUYCXJwQCEfv8LvfGg");

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // router.push("/main/modals/no-location-permission");
      console.log("please grant location permission");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    dispatch(setLocationStatus(true));
    dispatch(
      setCoordinate({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      })
    );
  };

  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <Box
      px={4}
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <MarketPlaceHeader />

      {isBestSeller || isEssentials || isNearby ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          bg={colorMode === "dark" ? "black.500" : "white.500"}
        >
          <ServiceSlider />
          <BestSellerSlider />
          <EssentialSlider />
          <AdsSlider />
          <NearbyStoreSlider />
          <BudgetFriendlySlider />
          <RestuarantCategorySlider />
          <PopularProductSlider />
        </ScrollView>
      ) : (
        <NoRestuarantCard />
      )}
    </Box>
  );
}
