import {
  HStack,
  Heading,
  IconButton,
  VStack,
  Divider,
  useColorMode,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CheckoutHeader = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  return (
    <VStack bg={colorMode === "dark" ? "black.500" : "white.500"}>
      <HStack alignItems="center" justifyContent="flex-start" py={2}>
        <IconButton
          onPress={() => router.back()}
          p="2"
          bg="white.500"
          rounded="full"
          shadow={2}
          variant="solid"
          _icon={{
            as: Feather,
            name: "arrow-left",
            size: "5",
            color: "black.500",
          }}
        />
        <Heading
          position="absolute"
          left="41.5%"
          top="3"
          fontSize="20"
          lineHeight="28"
          letterSpacing="-0.165"
          fontWeight="700"
          textAlign="center"
          textTransform="none"
          color="black.500"
        >
          Checkout
        </Heading>
      </HStack>
      {/* <Divider bg="grey.500" py={0.3} /> */}
    </VStack>
  );
};

export default CheckoutHeader;
