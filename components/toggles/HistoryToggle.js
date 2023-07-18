import { Text, HStack, Pressable, useColorMode, VStack } from "native-base";
import { setWidth } from "../../utils/helper";
import { Platform } from "react-native";

const HistoryToggle = ({ delivery, setDelivery }) => {
  const { colorMode } = useColorMode();
  return (
    <VStack
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      py={Platform.OS == "ios" ? "2" : "1"}
      px="4"
      mt={Platform.OS == "ios" ? "2" : "1"}
    >
      <HStack
        py="1.5"
        bg="grey.500"
        justifyContent="space-around"
        borderRadius="50"
        w="100%"
      >
        <Pressable
          onPress={() => setDelivery(true)}
          shadow={delivery ? "1" : ""}
          bg={delivery ? "white.500" : "grey.500"}
          py="2"
          borderRadius="50"
          borderColor={delivery ? "white.500" : "grey.500"}
          w={setWidth(40)}
        >
          <Text
            textAlign="center"
            fontSize="16"
            lineHeight="20"
            letterSpacing="-0.165"
            color={delivery ? "red.500" : "grey.700"}
          >
            Deliveries
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setDelivery(false)}
          bg={!delivery ? "white.500" : "grey.500"}
          py="2"
          shadow={!delivery ? "1" : ""}
          borderRadius="50"
          borderColor={!delivery ? "white.500" : "grey.500"}
          w={setWidth(40)}
        >
          <Text
            textAlign="center"
            fontSize="16"
            lineHeight="20"
            letterSpacing="-0.165"
            color={!delivery ? "red.500" : "grey.700"}
          >
            Request
          </Text>
        </Pressable>
      </HStack>
    </VStack>
  );
};

export default HistoryToggle;
