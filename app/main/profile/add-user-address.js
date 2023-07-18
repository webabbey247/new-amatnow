import { useEffect, useState, Fragment } from "react";
import {
  ScrollView,
  useColorMode,
  Text,
  Center,
  Box,
  Icon,
  VStack,
  Heading,
  HStack,
  Image,
  Pressable,
  Button,
  Spinner,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import icons from "../../../constants/icons";
import { setHeight, setWidth } from "../../../utils/helper";
import { useSearchParams } from "expo-router";
import { MapViewCard } from "../../../components/general";
import {
  NewAddressForm,
  SearchMapAddressForm,
} from "../../../components/forms";
import { useGetCountryListQuery } from "../../../redux/general/generalApiSlice";

const AddUserAdressPage = () => {
  const { colorMode } = useColorMode();
  const params = useSearchParams();
  console.log("hello params", params.title);

  const {
    data: isCountryList,
    isLoading,
    isFetching,
  } = useGetCountryListQuery();

  return (
    <Box
      px={4}
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        {isLoading || isFetching ? (
          <Center flex={1} safeAreaTop>
            <Spinner color="red.500" size="sm" />
          </Center>
        ) : params.title !== "mapAddress" ? (
          <Fragment>
            <Center w="100%" h={setHeight(25)} flex="0.35" bg="transparent">
              <MapViewCard
                address={params.address}
                longitude={params.longitude}
                latitude={params.latitude}
              />
            </Center>
            <SearchMapAddressForm
              longitude={params.longitude}
              latitude={params.latitude}
              isCountryData={isCountryList}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Center py={4} w="100%">
              <Button
                borderRadius="100"
                w={setWidth(50)}
                bg="grey.500"
                py={4}
                leftIcon={
                  <Icon
                    as={
                      <Image
                        source={icons.REDLOCATIONICON}
                        size={8}
                        alt="Map Locator"
                      />
                    }
                  />
                }
                _text={{
                  color: "red.500",
                  fontWeight: "400",
                  textTransform: "none",
                  fontSize: "14",
                  lineHeight: "20",
                  letterSpacing: "-0.165",
                }}
              >
                Use current location
              </Button>
            </Center>
            <NewAddressForm isCountryData={isCountryList} />
          </Fragment>
        )}
      </ScrollView>
    </Box>
  );
};

export default AddUserAdressPage;
