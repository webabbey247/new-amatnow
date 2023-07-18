import { Fragment, useState } from "react";
import {
  Box,
  Text,
  Center,
  Image,
  Divider,
  HStack,
  Slider,
  Badge,
} from "native-base";
import icons from "../../constants/icons";
import { setWidth, setHeight } from "../../utils/helper";

const OrderCompleteSummaryHeader = ({ orderStatus, referenceID }) => {
  console.log("hello order Status com", orderStatus)
  return (
    <Fragment>
      <Box
        shadow="0.5"
        bg="grey.500"
        borderColor="grey.400"
        borderWidth="1"
        borderRadius="8"
        py="4"
        my="2"
        px="4"
      >
        {orderStatus === "PENDING" || orderStatus === "ACTIVE" ? (
          <HStack
            mb="3"
            W="100%"
            justifyContent="space-between"
            alignItems="space-between"
          >
            <Center justifyContent="flex-start" alignItems="flex-start">
              <Text>Order recieved</Text>
              <Text>Arrives in 30 minutes</Text>
              <Slider defaultValue={25} size="sm">
                <Slider.Track>
                  <Slider.FilledTrack bg="red.500" />
                </Slider.Track>
              </Slider>
              <Text>Order has been recieved.</Text>
            </Center>

            <Center>
              <Image
                resizeMode="contain"
                source={icons.ORDERRECEIVEDICON}
                alt="Success Icon"
                w={setWidth(16)}
                h={setHeight(8)}
              />
            </Center>
          </HStack>
        ) : orderStatus === "ACCEPTED" ? (
          <HStack
            mb="3"
            W="100%"
            justifyContent="space-between"
            alignItems="space-between"
          >
            <Center justifyContent="flex-start" alignItems="flex-start">
              <Text>Order being prepared</Text>
              <Text>Arrives in 30 minutes</Text>
              <Slider defaultValue={50} size="sm">
                <Slider.Track>
                  <Slider.FilledTrack bg="red.500" />
                </Slider.Track>
              </Slider>
              <Text>Your order is being prepared.</Text>
            </Center>

            <Center justifyContent="flex-end" alignItems="flex-end">
              <Image
                resizeMode="contain"
                source={icons.ORDERPREPAREDICON}
                alt="Success Icon"
                w={setWidth(30)}
                h={setHeight(15)}
              />
            </Center>
          </HStack>
        ) : orderStatus === "RIDER_ENROUTE" ? (
          <HStack
            mb="3"
            W="100%"
            justifyContent="space-between"
            alignItems="space-between"
          >
            <Center justifyContent="flex-start" alignItems="flex-start">
              <Text>Order with rider</Text>
              <Text>Arrives in 30 minutes</Text>
              <Slider defaultValue={75} size="sm">
                <Slider.Track>
                  <Slider.FilledTrack bg="red.500" />
                </Slider.Track>
              </Slider>
              <Text>Your order has been dispatched.</Text>
            </Center>

            <Center>
              <Image
                resizeMode="contain"
                source={icons.ORDERWITHRIDERICON}
                alt="Success Icon"
                w={setWidth(16)}
                h={setHeight(8)}
              />
            </Center>
          </HStack>
        ) : orderStatus === "DELIVERED" ? (
          <HStack
            mb="3"
            W="100%"
            justifyContent="space-between"
            alignItems="space-between"
          >
            <Center justifyContent="flex-start" alignItems="flex-start">
              <Text>Order delivered</Text>
              <Text>Arrived at your destination.</Text>
              <Slider defaultValue={100} size="sm">
                <Slider.Track>
                  <Slider.FilledTrack bg="red.500" />
                </Slider.Track>
              </Slider>
              <Text>Your order has been completed.</Text>
            </Center>

            <Center>
              <Image
                resizeMode="contain"
                source={icons.ORDERDELIVEREDICON}
                alt="Success Icon"
                w={setWidth(16)}
                h={setHeight(8)}
              />
            </Center>
          </HStack>
        ) : (
          <HStack
            mb="3"
            W="100%"
            justifyContent="space-between"
            alignItems="space-between"
          >
            <Center justifyContent="flex-start" alignItems="flex-start">
              <Text>Order cancelled</Text>
              <Text> </Text>
              <Slider defaultValue={25} size="sm">
                <Slider.Track>
                  <Slider.FilledTrack bg="red.500" />
                </Slider.Track>
              </Slider>
              <Text>Order has been cancelled.</Text>
            </Center>

            <Center>
              <Image
                resizeMode="contain"
                source={icons.ORDERCANCELLEDICON}
                alt="Success Icon"
                w={setWidth(16)}
                h={setHeight(8)}
              />
            </Center>
          </HStack>
        )}
      </Box>

     <Center>
     <Badge
        my="4"
        py="2"
        px="4"
        bg="green.100"
        borderRadius="8"
        rounded="full"
        _text={{
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "400",
          letterSpacing: -0.165,
          color: "green.700",
          textTransform: "capitalize",
        }}
      >
        {`Order number ${referenceID}`}
      </Badge>
     </Center>
    </Fragment>
  );
};

export default OrderCompleteSummaryHeader;
