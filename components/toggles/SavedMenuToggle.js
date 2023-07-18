import { Text, HStack, Pressable, useColorMode, VStack } from "native-base";
import { setWidth } from "../../utils/helper";

const SavedMenuToggle = ({ stores, setStores }) => {
  const { colorMode } = useColorMode();
  return (
    <VStack bg={colorMode === "dark" ? "black.500" : "white.500"} py={1} px={4}>
      <HStack
        py="1.5"
        bg="grey.500"
        justifyContent="space-around"
        borderRadius="50"
        w="100%"
      >
        <Pressable
          onPress={() => setStores(false)}
          shadow={!stores ? "1" : ""}
          bg={!stores ? "white.500" : "grey.500"}
          py="2"
          borderRadius="50"
          borderColor={stores ? "white.500" : "grey.500"}
          w={setWidth(40)}
        >
          <Text
            textAlign="center"
            fontSize="16"
            lineHeight="20"
            letterSpacing="-0.165"
            color={!stores ? "red.500" : "grey.700"}
          >
            Items
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setStores(true)}
          bg={stores ? "white.500" : "grey.500"}
          py="2"
          shadow={stores ? "1" : ""}
          borderRadius="50"
          borderColor={stores ? "white.500" : "grey.500"}
          w={setWidth(40)}
        >
          <Text
            textAlign="center"
            fontSize="16"
            lineHeight="20"
            letterSpacing="-0.165"
            color={stores ? "red.500" : "grey.700"}
          >
            Stores
          </Text>
        </Pressable>
      </HStack>
    </VStack>
  );
};

export default SavedMenuToggle;
