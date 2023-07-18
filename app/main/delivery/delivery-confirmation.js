import { useRef } from "react";
import { StyleSheet } from "react-native";
import { Box, Center, useColorMode } from "native-base";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../../../utils/helper";
import RetroMapStyles from "../../../utils/retroMapStyles.json";
import { useSelector } from "react-redux";

const DeliveryConfirmation = () => {
  const colorMode = useColorMode();
  const mapRef = useRef();
  const { longitude, latitude } = useSelector((state) => state.general);
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  return (
    <Box
      flex={1}
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <Center w="100%" h="100%" flex="0.35" bg="transparent">
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: latitude,
            latitudeDelta: 0.0421,
            longitude: longitude,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={RetroMapStyles}
          ref={mapRef}
        >
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeWidth={6}
            strokeColor="red"
            optimizeWaypoints={true}
          />
        </MapView>
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

        
        </VStack>
       
      </ScrollView>
    </Box>
  );
};

export default DeliveryConfirmation;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
