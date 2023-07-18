import { useEffect, useState, useRef, useCallback } from "react";
import { StyleSheet, Platform } from "react-native";
import {
  Box,
  KeyboardAvoidingView,
  useColorMode,
  Center,
  IconButton,
  VStack,
  Button,
  Spinner,
  Heading,
  Icon,
  FormControl,
  Input,
  ScrollView,
  Radio,
} from "native-base";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import RetroMapStyles from "../../../utils/retroMapStyles.json";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { authToken } from "../../../utils/storage";
import { SavedAddressList } from "../../../components/sliders";
import { setHeight } from "../../../utils/helper";
// import { useGetAllUserAddressQuery } from "../../../redux/general/generalApiSlice";
import { setAddress } from "../../../redux/general/generalSlice";
import { ToastAlert } from "../../../components/alerts";
import { useSession } from "../../../hooks";


const MapViewModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { isAuthenticated } = useSession();
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // const [defaultAddress, setDefaultAddress] = useState(null);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");

  const { longitude, latitude, address } = useSelector(
    (state) => state.general
  );

  // const {
  //   data: isAddressData,
  //   isFetching,
  //   isLoading,
  // } = useGetAllUserAddressQuery();

  const [newPosition, setNewPosition] = useState({
    latitude: longitude,
    longitude: latitude,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  });
  const mapRef = useRef();

  const handleGooglePlaces = useCallback(
    async (text) => {
      try {
        let result = await PlacesAutocomplete.findPlaces(text, requestConfig);
        setResults(result.places);
        setInputValue(text);
      } catch (e) {
        console.log(e);
      }
    },
    [requestConfig]
  );

  useEffect(() => {
    PlacesAutocomplete.initPlaces("AIzaSyBJLRoEgulUxvcnTeUYCXJwQCEfv8LvfGg");
  }, [apiKey]);
  return (
    <Box
      flex={1}
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      {showAlert ? (
        <ToastAlert
          message={message}
          status={alertStatus}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      ) : null}
      <Center
        w="100%"
        h="100%"
        flex={isAuthenticated ? 0.55 : 1}
        bg="transparent"
      >
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={newPosition}
          customMapStyle={RetroMapStyles}
          ref={mapRef}
          showsUserLocation
          showsMyLocationButton
          followsUserLocation
        >
          <Marker draggable title={address} coordinate={newPosition} />
        </MapView>

        <IconButton
          onPress={() => router.back()}
          size={8}
          rounded="full"
          position="absolute"
          bg="grey.500"
          top="3"
          left="3"
          shadow={2}
          _icon={{
            as: Feather,
            name: "x",
            size: "5",
            color: "black.500",
          }}
        />
      </Center>

      <ScrollView
        h={{
          lg: "auto",
        }}
        flex={isAuthenticated ? 1 : 0.35}
        px={4}
        mt={4}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <VStack py={1} w="100%">
            <Heading
              fontSize="18"
              fontWeight="800"
              lineHeight="24"
              letterSpacing="-0.165"
              color="black.500"
              textAlign="left"
              pb={2}
            >
              Search an address
            </Heading>

            <FormControl>
              <Input
                placeholder={address}
                my={1}
                fontSize="14"
                lineHeight="20"
                placeholderTextColor="grey.700"
                bg="grey.500"
                height={setHeight(7)}
                borderColor="grey.500"
                onChangeText={(text) => handleGooglePlaces(text)}
                borderRadius="8"
                rounded="full"
                InputLeftElement={
                  <Icon
                    as={<Feather name="search" />}
                    size={5}
                    ml="2"
                    color="grey.700"
                  />
                }
              />
            </FormControl>
            <Button
              mt={3}
              width="100%"
              rounded="full"
              bg="red.500"
              py="4"
              leftIcon={
                <Icon
                  as={<Feather name="map-pin" size={5} />}
                  mr="2"
                  color="white.500"
                />
              }
              _text={{
                color: "white.500",
                fontWeight: "500",
                textTransform: "none",
                fontSize: "16",
                lineHeight: "24",
                letterSpacing: "-0.165",
              }}
            >
              Use current location
            </Button>
          </VStack>
          {/* {isAuthenticated ? (
            <SavedAddressList
              // defaultAddress={defaultAddress}
              // isAddressData={isAddressData?.data}
              setMessage={setMessage}
              setAlertStatus={setAlertStatus}
              setShowAlert={setShowAlert}
            />
          ) : null} */}
        </KeyboardAvoidingView>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapViewModal;
