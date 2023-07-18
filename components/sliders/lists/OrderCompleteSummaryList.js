import { Fragment, useState, useEffect } from "react";
import {
  Box,
  Text,
  useColorMode,
  ScrollView,
  Center,
  Image,
  VStack,
  Badge,
  Divider,
  HStack,
  Heading,
  IconButton,
  View,
  Pressable,
  Icon,
  Button,
} from "native-base";
import icons from "../../../constants/icons";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLazyReOrderMenuQuery } from "../../../redux/cart/cartApiSlice";

const OrderCompleteSummaryList = ({
  setShowDetails,
  rider,
  menu,
  restuarant,
  deliveryNote,
  paymentMethod,
  totalAmount,
  deliveryFee,
  riderTips,
  orderStatus,
  id,
}) => {
  const router = useRouter();
  const [toggleOrderDetails, setToggleOrderDetails] = useState(false);
  const [togglePaymentDetails, setTogglePaymentDetails] = useState(false);
  const [
    reOrderMenu,
    { data: isReOrderData, isError, isLoading, isSuccess, isFetching, error },
  ] = useLazyReOrderMenuQuery();

  const handleReOrderMenu = async () => {
    try {
      const menuReOrder = await reOrderMenu(id);
      return menuReOrder;
    } catch (err) {
      console.log("err reponse:", err);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log("error reponse:", error.message || error.data.message);
    }
    if (isSuccess) {
      console.log("success reponse:", isReOrderData?.message);
      router.push("(tabs)/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReOrderData, isError, isSuccess, error]);

  return (
    <Box my="2">
      <VStack mb="3" w="100%">
        <Heading
          fontSize="16"
          lineHeight="24"
          letterSpacing="-0.165"
          fontWeight="500"
          textTransform="none"
          color="black.500"
          my="2"
        >
          Delivery instructions
        </Heading>
        <Text
          fontSize="14"
          lineHeight="20"
          letterSpacing="-0.165"
          fontWeight="400"
          textTransform="none"
          color="grey.800"
        >
          {deliveryNote}
        </Text>
      </VStack>

      <VStack w="100%">
        <Heading
          fontSize="16"
          lineHeight="24"
          letterSpacing="-0.165"
          fontWeight="500"
          textTransform="none"
          color="black.500"
          my="2"
        >
          {restuarant.name}
        </Heading>
        <HStack justifyContent="space-between" alignItems="space-between">
          <Text
            w="65%"
            fontSize="14"
            lineHeight="20"
            letterSpacing="-0.165"
            fontWeight="400"
            textTransform="none"
            color="grey.800"
            isTruncated="true"
            noOfLines={3}
          >
            No entry found
          </Text>
          <IconButton
            onPress={() =>
              router.push(`main/restuarant/restuarant-details/${restuarant.id}`)
            }
            p="2"
            bg="white.500"
            rounded="full"
            shadow="1"
            variant="solid"
            mr="0.5"
            _icon={{
              as: Feather,
              name: "arrow-right",
              size: "5",
              color: "black.500",
              textAlign: "center",
            }}
          />
        </HStack>
      </VStack>

      <VStack w="100%" my="2">
        <HStack
          justifyContent="space-between"
          alignItems="space-between"
          mb="2"
        >
          <Heading
            fontSize="16"
            lineHeight="24"
            letterSpacing="-0.165"
            fontWeight="500"
            textTransform="none"
            color="black.500"
          >
            Order details
          </Heading>
          <IconButton
            onPress={() => setToggleOrderDetails(!toggleOrderDetails)}
            colorScheme="white.500"
            bg="white.500"
            _icon={{
              as: Feather,
              name: toggleOrderDetails ? "chevron-up" : "chevron-down",
              size: "5",
              color: "black.500",
              textAlign: "center",
            }}
          />
        </HStack>
        {toggleOrderDetails ? (
          <Fragment>
            {menu.map((item, index) => {
              return (
                <HStack
                  justifyContent="space-between"
                  alignItems="space-between"
                  my="1"
                  key={index}
                >
                  <Text
                    fontSize="14"
                    lineHeight="20"
                    letterSpacing="-0.165"
                    fontWeight="400"
                    textTransform="none"
                    color="grey.800"
                  >
                    {item.quantity}x {item.menu_name}
                  </Text>
                  <Text
                    fontSize="14"
                    lineHeight="20"
                    letterSpacing="-0.165"
                    fontWeight="400"
                    textTransform="none"
                    color="grey.800"
                  >
                    {item.unit_price * item.quantity}.00
                  </Text>
                </HStack>
              );
            })}

            {/* <HStack
              justifyContent="space-between"
              alignItems="space-between"
              my="1"
            >
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="400"
                textTransform="none"
                color="grey.800"
              >
                4x rice
              </Text>
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="400"
                textTransform="none"
                color="grey.800"
              >
                $130.50
              </Text>
            </HStack> */}
          </Fragment>
        ) : null}
      </VStack>

      <VStack w="100%" my="2">
        <HStack
          justifyContent="space-between"
          alignItems="space-between"
          mb="2"
        >
          <Heading
            fontSize="16"
            lineHeight="24"
            letterSpacing="-0.165"
            fontWeight="500"
            textTransform="none"
            color="black.500"
          >
            Payment summary
          </Heading>
          <IconButton
            onPress={() => setTogglePaymentDetails(!togglePaymentDetails)}
            colorScheme="white.500"
            // p="2"
            // bg="white.500"
            // rounded="full"
            // variant="solid"
            _icon={{
              as: Feather,
              name: togglePaymentDetails ? "chevron-up" : "chevron-down",
              size: "5",
              color: "black.500",
              textAlign: "center",
            }}
          />
        </HStack>

        {togglePaymentDetails ? (
          <Fragment>
            <HStack
              justifyContent="space-between"
              alignItems="space-between"
              my="1"
            >
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="400"
                textTransform="none"
                color="grey.800"
              >
                Payment method
              </Text>
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="400"
                textTransform="none"
                color="grey.800"
              >
                {paymentMethod === "PAY_WITH_BANK_TRANSFER"
                  ? "Bank Transfer"
                  : paymentMethod === "PAY_ON_DELIVERY_WITH_CARD"
                  ? "Pay On Delivery - Card"
                  : paymentMethod === "PAY_ON_DELIVERY_WITH_CASH"
                  ? "Pay On Delivery - Cash"
                  : paymentMethod}
              </Text>
            </HStack>
            <HStack
              justifyContent="space-between"
              alignItems="space-between"
              my="1"
            >
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="400"
                textTransform="none"
                color="grey.800"
              >
                Subtotal
              </Text>
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="400"
                textTransform="none"
                color="grey.800"
              >
                {totalAmount -
                  (parseFloat(deliveryFee) + parseFloat(riderTips))}
              </Text>
            </HStack>

            <HStack
              justifyContent="space-between"
              alignItems="space-between"
              my="1"
            >
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="400"
                textTransform="none"
                color="grey.800"
              >
                Delivery fee
              </Text>
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="400"
                textTransform="none"
                color="grey.800"
              >
                {deliveryFee}
              </Text>
            </HStack>

            <HStack
              justifyContent="space-between"
              alignItems="space-between"
              my="1"
            >
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="400"
                textTransform="none"
                color="grey.800"
              >
                Rider Tips
              </Text>
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="400"
                textTransform="none"
                color="grey.800"
              >
                {riderTips}
              </Text>
            </HStack>

            <HStack
              justifyContent="space-between"
              alignItems="space-between"
              my="1"
            >
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="500"
                textTransform="none"
                color="black.500"
              >
                Total
              </Text>
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="500"
                textTransform="none"
                color="black.500"
              >
                N {totalAmount}
              </Text>
            </HStack>
          </Fragment>
        ) : null}
      </VStack>

      <VStack w="100%" my="2">
        <HStack
          justifyContent="space-between"
          alignItems="space-between"
          mb="3"
          mt="2"
        >
          <Center alignItems="flex-start" space="2">
            <Text
              textAlign="left"
              fontSize="16"
              lineHeight="24"
              fontWeight="500"
              letterSpacing="-0.165"
              color="black.500"
              textTransform="capitalize"
            >
              Your rider
            </Text>
            <Text
              textAlign="left"
              fontSize="14"
              lineHeight="20"
              fontWeight="400"
              letterSpacing="-0.165"
              color="black.500"
            >
              {rider
                ? [rider.first_name, rider.last_name].join(" ")
                : "No record found."}
            </Text>
          </Center>

          <HStack justifyContent="flex-end" alignItems="flex-end">
            <Center bg="grey.500" rounded="full" p="3.5" mr="4">
              <Image
                size="6"
                source={icons.RIDERCHATICON}
                alt="Rider Message"
                resizeMode="contain"
              />
            </Center>
            <Center bg="grey.500" rounded="full" p="3.5">
              <Image
                size="6"
                source={icons.RIDERCALLICON}
                alt="Rider Mobile Number"
                resizeMode="contain"
              />
            </Center>
          </HStack>
        </HStack>
      </VStack>

      <VStack w="100%" my="2">
        {orderStatus === "CANCELLED" || orderStatus === "DELIVERED" ? (
          <Fragment>
            <Button
              onPress={handleReOrderMenu}
              width="100%"
              rounded="full"
              bg="red.500"
              mt="3"
              py="4"
              _text={{
                color: "white.500",
                fontWeight: "500",
                textTransform: "none",
                fontSize: "16",
                lineHeight: "24",
                letterSpacing: "0.165",
              }}
            >
              Reorder
            </Button>
            <Button
              width="100%"
              rounded="full"
              bg="red.400"
              mt="3"
              py="4"
              _text={{
                color: "red.500",
                fontWeight: "500",
                textTransform: "none",
                fontSize: "16",
                lineHeight: "24",
                letterSpacing: "0.165",
              }}
            >
              Leave Feedback
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              width="100%"
              rounded="full"
              bg="red.400"
              mt="3"
              py="4"
              _text={{
                color: "red.500",
                fontWeight: "500",
                textTransform: "none",
                fontSize: "16",
                lineHeight: "24",
                letterSpacing: "0.165",
              }}
            >
              Cancel Order
            </Button>

            <Button
              onPress={() => setShowDetails(false)}
              colorScheme="grey.500"
              width="100%"
              rounded="full"
              bg="grey.500"
              mt="3"
              py="4"
              _text={{
                color: "red.500",
                fontWeight: "500",
                textTransform: "none",
                fontSize: "16",
                lineHeight: "24",
                letterSpacing: "0.165",
              }}
            >
              Hide Details
            </Button>
          </Fragment>
        )}
      </VStack>
    </Box>
  );
};

export default OrderCompleteSummaryList;
