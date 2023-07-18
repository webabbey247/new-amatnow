import { useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import RetroMapStyles from "../../../utils/retroMapStyles.json";

const MapViewCard = ({ longitude, latitude, address }) => {
  const mapRef = useRef();
  const formattedRegion = {
    longitude: parseFloat(longitude),
    latitude: parseFloat(latitude),
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  };
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      region={formattedRegion}
      customMapStyle={RetroMapStyles}
      ref={mapRef}
      showsUserLocation={true}
      showsMyLocationButton
      followsUserLocation
    >
      <Marker draggable title={address} coordinate={formattedRegion} />
    </MapView>
  );
};

export default MapViewCard;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
