import { Text, HStack, Pressable, useColorMode, VStack } from "native-base";
import { setWidth } from "../../utils/helper";
import { Platform } from "react-native";

const OrderReOrderToggle = ({
  activeOrder,
  setActiveOrder,
  deliveredOrder,
  setDeliveredOrder,
  cancelledOrder,
  setCancelledOrder,
  setOrderStatus,
}) => {
  const { colorMode } = useColorMode();

  const handleActiveOrder = () => {
    setActiveOrder(true);
    setDeliveredOrder(false);
    setCancelledOrder(false);
    setOrderStatus("ACTIVE");
  };

  const handleDeliveredOrder = () => {
    setActiveOrder(false);
    setDeliveredOrder(true);
    setCancelledOrder(false);
    setOrderStatus("DELIVERED");
  };

  const handleCancelledOrder = () => {
    setActiveOrder(false);
    setDeliveredOrder(false);
    setCancelledOrder(true);
    setOrderStatus("CANCELLED");
  };
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
        alignItems="space-around"
        borderRadius="50"
        w="100%"
      >
        <Pressable
          onPress={handleActiveOrder}
          shadow={activeOrder ? "1" : ""}
          bg={activeOrder ? "white.500" : "grey.500"}
          py="2"
          borderRadius="50"
          borderColor={activeOrder ? "white.500" : "grey.500"}
          w={setWidth(28)}
        >
          <Text
            textAlign="center"
            fontSize="16"
            lineHeight="20"
            letterSpacing="-0.165"
            color={activeOrder ? "red.500" : "grey.700"}
          >
            Active
          </Text>
        </Pressable>

        <Pressable
          onPress={handleDeliveredOrder}
          shadow={deliveredOrder ? "1" : ""}
          bg={deliveredOrder ? "white.500" : "grey.500"}
          py="2"
          borderRadius="50"
          borderColor={deliveredOrder ? "white.500" : "grey.500"}
          w={setWidth(28)}
        >
          <Text
            textAlign="center"
            fontSize="16"
            lineHeight="20"
            letterSpacing="-0.165"
            color={deliveredOrder ? "red.500" : "grey.700"}
          >
            Delivered
          </Text>
        </Pressable>

        <Pressable
          onPress={handleCancelledOrder}
          bg={cancelledOrder ? "white.500" : "grey.500"}
          py="2"
          shadow={cancelledOrder ? "1" : ""}
          borderRadius="50"
          borderColor={cancelledOrder ? "white.500" : "grey.500"}
          w={setWidth(28)}
        >
          <Text
            textAlign="center"
            fontSize="16"
            lineHeight="20"
            letterSpacing="-0.165"
            color={cancelledOrder ? "red.500" : "grey.700"}
          >
            Cancelled
          </Text>
        </Pressable>
      </HStack>
    </VStack>
  );
};

export default OrderReOrderToggle;
