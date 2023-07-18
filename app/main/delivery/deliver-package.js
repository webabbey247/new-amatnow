import {
  Box,
  Text,
  useColorMode,
  ScrollView,
  Heading,
  VStack,
} from "native-base";
import { DeliveryPackageForm } from "../../../components/forms";

const DeliverPackagePage = () => {
  const colorMode = useColorMode();
  return (
    <Box px={4} flex={1} bg={colorMode === "dark" ? "black.500" : "white.500"}>
      <ScrollView
        flex={1}
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <VStack py="2">
          <Heading
            letterSpacing="0.165"
            fontWeight="500"
            textAlign="left"
            fontSize="26"
            lineHeight="34"
          >
            Delivery
          </Heading>
          <Text
            py="2"
            fontSize="14"
            lineHeight="20"
            letterSpacing="-0.165"
            color="grey.700"
            fontWeight="400"
            textAlign="left"
          >
            Send packages effortlessly in any location.
          </Text>
        </VStack>
        <DeliveryPackageForm />
      </ScrollView>
    </Box>
  );
};

export default DeliverPackagePage;
