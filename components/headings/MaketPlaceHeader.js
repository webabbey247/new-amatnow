import { Fragment, useEffect, useState } from "react";
import {
  Box,
  useColorMode,
  Icon,
  HStack,
  Text,
  IconButton,
  Pressable,
  Stack,
} from "native-base";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { setLocationAddress } from "../../redux/general/generalSlice";

const MarketPlaceHeader = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const [systemAddress, setSystemAddress] = useState("");
  const {
    locationStatus,
    locationAddress,
    userAddress,
    userAddressStatus,
    latitude,
    longitude,
  } = useSelector((state) => state.general);
  Location.setGoogleApiKey("AIzaSyBJLRoEgulUxvcnTeUYCXJwQCEfv8LvfGg");

  const getFullAddress = async () => {
    try {
      const getAddress = await Location.reverseGeocodeAsync(
        {
          longitude: longitude,
          latitude: latitude,
        },
        { useGoogleMaps: true }
      );
      if (getAddress) {
        const complete_address = [
          getAddress[0]?.name,
          getAddress[0]?.city,
          getAddress[0]?.region,
          getAddress[0]?.country,
        ].join(", ");
        setSystemAddress(complete_address);
        dispatch(setLocationAddress(complete_address));
      }
    } catch (err) {
      console.log("errr response", err);
    }
  };

  useEffect(() => {
    if (locationStatus) {
      getFullAddress();
    }
  }, [locationStatus, longitude, latitude]);

  // console.log("hello latitude:", latitude);
  // console.log("hello longitude:", longitude);
  return (
    <Fragment>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        py={2}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <Pressable
          flexDirection="column"
          onPress={() => router.push("/main/modals/fullscreen-map")}
          // onPress={() => router.push("/main/search")}
          w="80%"
        >
          <Text
            fontSize="12"
            lineHeight="16"
            letterSpacing="-0.165"
            fontWeight="400"
            textTransform="none"
            opacity="0.5"
            color="black.500"
          >
            Location
          </Text>
          <Stack
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Text
              mt="1"
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="500"
              textTransform="none"
              color="black.500"
              isTruncated
            >
              {userAddressStatus ? userAddress : systemAddress}
            </Text>
            <Icon as={Feather} name="chevron-down" color="black.500" mr="2" />
          </Stack>
        </Pressable>

        <Box>
          <IconButton
            onPress={() => router.push("main/search")}
            p="2"
            bg="white.500"
            rounded="full"
            shadow={1}
            variant="solid"
            _icon={{
              as: Feather,
              name: "search",
              size: "5",
              color: "red.500",
            }}
          />
        </Box>
      </HStack>
    </Fragment>
  );
};

export default MarketPlaceHeader;
