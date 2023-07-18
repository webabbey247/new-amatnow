import { Fragment } from "react";
import { useColorMode, HStack, Pressable, Text } from "native-base";

const FavoriteHeader = () => {
  const { colorMode } = useColorMode();
  return (
    <Fragment>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={2}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <Text
          fontSize="20"
          lineHeight="28"
          letterSpacing="-0.165"
          fontWeight="700"
          textTransform="none"
          color="black.500"
        >
          Saved
        </Text>
        <Pressable>
          <Text
            py="1"
            fontSize="14"
            lineHeight="20"
            letterSpacing="-0.165"
            fontWeight="500"
            textTransform="none"
            color="red.500"
          >
            Clear saved
          </Text>
        </Pressable>
      </HStack>
    </Fragment>
  );
};

export default FavoriteHeader;
