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
  Text,
  Image,
} from "native-base";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import RetroMapStyles from "../../../utils/retroMapStyles.json";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SavedAddressList } from "../../../components/sliders";
import { setHeight, setWidth } from "../../../utils/helper";
import { setAddress } from "../../../redux/general/generalSlice";
import { ToastAlert } from "../../../components/alerts";
import { useSession } from "../../../hooks";
import { GOOGLE_API_KEY } from "../../../utils/helper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import icons from "../../../constants/icons";
import { useGetAllUserAddressQuery } from "../../../redux/general/generalApiSlice";

const FullScreenMapPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { isAuthenticated } = useSession();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const {
    longitude,
    latitude,
    locationAddress,
    userAddressStatus,
    userAddress,
  } = useSelector((state) => state.general);
  const {
    data: isAddressData,
    isFetching,
    isLoading,
    error,
  } = useGetAllUserAddressQuery();
  const [newPosition, setNewPosition] = useState({
    latitude: longitude,
    longitude: latitude,
  });
  const mapRef = useRef();
  const placesRef = useRef();

  const onRegionChange = (region) => {
    console.log("hello region change:", region);
  };

  const handleGooglePlaces = (data) => {
    const latitude = data.geometry.location.lat;
    const longitude = data.geometry.location.lng;
    setNewPosition({
      latitude: latitude,
      longitude: longitude,
    });

    router.push(
      `/main/profile/add-user-address/?title="mapAddress"&latitude=${latitude}&longitude=${longitude}&address=${data.formatted_address}`
    );
  };

  useEffect(() => {}, [locationAddress]);
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
      <Center w="100%" h="100%" flex="0.35" bg="transparent">
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: newPosition.latitude,
            latitudeDelta: 0.0421,
            longitude: newPosition.longitude,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={onRegionChange}
          customMapStyle={RetroMapStyles}
          ref={mapRef}
          showsUserLocation={true}
          showsMyLocationButton
          followsUserLocation
        >
          <Marker
            draggable
            title={userAddressStatus ? userAddress : locationAddress}
            coordinate={newPosition}
            onDragEnd={(e) => setNewPosition(e.nativeEvent.coordinate)}
          />
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
        keyboardShouldPersistTaps={"always"}
        h={{
          lg: "auto",
        }}
        flex={isAuthenticated ? 1 : 0.35}
        px={4}
        mt={4}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <VStack py={1} w="100%">
          <Heading
            fontSize="16"
            lineHeight="24"
            letterSpacing="-0.165"
            fontWeight="700"
            color="black.500"
            textAlign="left"
            pb={4}
          >
            Search an address
          </Heading>

          <GooglePlacesAutocomplete
            placeholder={userAddressStatus ? userAddress : locationAddress}
            ref={placesRef}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
            isRowScrollable={true}
            debounce={400}
            returnKeyType={"search"}
            onFail={(error) => console.log(error)}
            onNotFound={() => console.log("no results")}
            fetchDetails={true}
            // keepResultsAfterBlur={false}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => handleGooglePlaces(details)}
            styles={{
              textInput: {
                height: setHeight(7),
                color: "#A7AAA9",
                fontSize: 14,
                lineHeight: 20,
                borderRadius: 50,
                borderColor: "#F8F8F8",
                backgroundColor: "#F8F8F8",
                letterSpacing: -0.165,
                fontWeight: "400",
                paddingLeft: 45,
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
              listView: {
                position: "relative",
                zIndex: 3,
                marginTop: 0,
                padding: 0,
              },
              row: {
                backgroundColor: "#FFFFFF",
                height: setHeight(6),
                flexDirection: "row",
              },
            }}
            textInputProps={{
              inputComp: Input,
              clearButtonMode: "always",
            }}
            renderLeftButton={() => (
              <Image
                position="absolute"
                left="-20"
                tintColor="grey.700"
                top="30%"
                zIndex={3}
                h={setHeight(2.2)}
                source={icons.SEARCHICON}
                resizeMode="contain"
                alt="Search Icon"
              />
            )}
          />
        </VStack>
        {isAuthenticated ? (
          isLoading || isFetching ? (
            <Spinner color="red.500" size="sm" />
          ) : error ? (
            <Text>Kindly reconnect when network issues are resolved</Text>
          ) : (
            <SavedAddressList
              isAddressData={isAddressData?.data}
              setMessage={setMessage}
              setAlertStatus={setAlertStatus}
              setShowAlert={setShowAlert}
            />
          )
        ) : null}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default FullScreenMapPage;
