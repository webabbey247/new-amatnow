import { Fragment } from "react";
import {
  useColorMode,
  HStack,
  Pressable,
  Text,
  Icon,
  IconButton,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";

const CartHeader = ({ onOpen }) => {
  const { colorMode } = useColorMode();
  const handleOpenRestuarantModal = () => {
    onOpen(true);
  };
  return (
    <Fragment>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        py={2}
        mb={2}
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
          Cart
        </Text>
        <IconButton
          colorScheme="red.500"
          onPress={handleOpenRestuarantModal}
          p="2.5"
          bg="grey.500"
          rounded="full"
          shadow="0.5"
          variant="solid"
          _icon={{
            as: FontAwesome,
            name: "expand",
            size: "4",
            color: "black.500",
            textAlign: "center",
          }}
        />
      </HStack>
    </Fragment>
  );
};

export default CartHeader;
