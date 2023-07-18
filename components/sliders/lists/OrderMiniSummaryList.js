import { Fragment, useState } from "react";
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
import { setWidth, setHeight } from "../../../utils/helper";
import { orderStatusData } from "../../../constants/mock";

const OrderMiniSummaryList = ({
  setShowDetails,
  restuarant,
  orderStatus,
  rider,
}) => {
  const filteredData = orderStatusData.filter(
    (order) => order.status === orderStatus
  );
  // console.log("hello filtered:", filteredData);
  return (
    <Box
      shadow="0.5"
      borderColor="grey.400"
      borderWidth="1"
      borderRadius="8"
      py="4"
      my="2"
      px="4"
    >
      <VStack>
        <Text
          fontSize="20"
          lineHeight="28"
          fontWeight="500"
          letterSpacing="-0.165"
          color="black.500"
          textTransform="capitalize"
        >
          {filteredData[0]?.title}
        </Text>
        <Text
          fontSize="14"
          lineHeight="20"
          fontWeight="400"
          letterSpacing="-0.165"
          color="black.500"
        >
          Order will arrive by
          <Text fontWeight="500">11:51 PM - 12:01 AM</Text>
        </Text>
      </VStack>

      <Divider my="2.5" py="0.4" bg="grey.300" w="100%" borderRadius="8" />

      <VStack>
        <HStack my="3" justifyContent="space-between" alignItem="between">
          <Center bg="red.500" rounded="full" p="4">
            <Image
              size="6"
              source={icons.WHITECHECKEDICON}
              alt="Rider Message"
              resizeMode="contain"
            />
          </Center>

          <Center>
            <Divider
              h={setHeight(0.8)}
              bg="grey.500"
              w={setWidth(10)}
              borderRadius="8"
              zIndex="-1"
            />
          </Center>
          <Center bg={orderStatus === "ACCEPTED" ? "red.500" : "grey.500"} rounded="full" p="4">
            <Image
              size="6"
              source={icons.REDHOMEICON}
              alt="Rider Message"
              resizeMode="contain"
            />
          </Center>
          <Center>
            <Divider
              h={setHeight(0.8)}
              bg="grey.500"
              w={setWidth(10)}
              borderRadius="8"
              zIndex="-1"
            />
          </Center>
          <Center bg={orderStatus === "RIDER_ENROUTE" ? "red.500" : "grey.500"} rounded="full" p="4">
            <Image
              size="6"
              source={icons.REDBIKEICON}
              alt="Rider Message"
              resizeMode="contain"
            />
          </Center>

          <Center>
            <Divider
              h={setHeight(0.8)}
              bg="grey.500"
              w={setWidth(10)}
              borderRadius="8"
              zIndex="-1"
            />
          </Center>
          <Center bg="grey.500" rounded="full" p="4" mr="4">
            <Image
              size="6"
              source={icons.REDHOME2ICON}
              alt="Rider Message"
              resizeMode="contain"
            />
          </Center>
        </HStack>
        {orderStatus === "DELIVERED" || orderStatus === "CANCELLED" ? (
          <Text
            fontSize="14"
            lineHeight="20"
            fontWeight="400"
            letterSpacing="-0.165"
            color="black.500"
          >
            {filteredData[0]?.desc}
          </Text>
        ) : (
          <Text
            fontSize="14"
            lineHeight="20"
            fontWeight="400"
            letterSpacing="-0.165"
            color="black.500"
          >
            {[restuarant?.name, filteredData[0]?.desc].join(" ")}
          </Text>
        )}
      </VStack>

      {orderStatus === "RIDER_ENROUTE" ||
      orderStatus === "DELIVERED" ||
      orderStatus === "CANCELLED" ? (
        <VStack>
          <Divider my="2.5" py="0.4" bg="grey.300" w="100%" borderRadius="8" />
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
                  : "No record found"}
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
      ) : null}

      <Divider my="2.5" py="0.4" bg="grey.300" w="100%" borderRadius="8" />
      <Pressable onPress={() => setShowDetails(true)}>
        <Text
          my="1"
          textAlign="center"
          fontSize="14"
          lineHeight="20"
          fontWeight="500"
          letterSpacing="-0.165"
          color="red.300"
        >
          View order details
        </Text>
      </Pressable>
    </Box>
  );
};

export default OrderMiniSummaryList;
