import { Box, useColorMode } from "native-base";
import { LocationStatusCard } from "../../../components/general";

const LocationPermissionPage = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      flex="1"
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <LocationStatusCard />
    </Box>
  );
};

export default LocationPermissionPage;
