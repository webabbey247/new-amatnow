import {
  Box,
  Text,
  Divider,
  Button,
  Image,
  Stack,
  HStack,
  Center,
  IconButton,
  VStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import images from "../../../constants/images";
import { setWidth, setHeight } from "../../../utils/helper";
// import {NumberFormat} from "react-number-format";

const DeliveriesHistoryCard = ({
  receiverFullName,
  paymentMethod,
  totatNairaPrice,
}) => {
  // let paymentOption = paymentMethod;

  // switch (paymentOption) {
  //     case 'Paystack':
  //         return payStackButtonRef.current.click()
  //     case 'Flutterwave':
  //         return flutterWaveButtonRef.current.click()
  //     case 'Bank':
  //         return bankTransferButtonRef.current.click()
  //     default:
  //         return;
  // };

  return (
    <Box
      borderColor="grey.400"
      borderWidth="1"
      borderRadius="8"
      py="2"
      px="4"
      my="2"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Stack direction="row" space="3">
          <Image
            h={setHeight(5)}
            w={setWidth(10)}
            source={images.ORDERHISTORYIMG}
            alt={receiverFullName}
            resizeMode="contain"
          />
          <Center>
            <Text
              fontSize="16"
              lineHeight="24"
              letterSpacing="-0.165"
              textAlign="center"
              fontWeight="500"
              textTransform="capitalize"
              color="black.500"
            >
              {receiverFullName}
            </Text>
          </Center>
        </Stack>
        <IconButton
          _icon={{
            as: Feather,
            name: "arrow-right",
            size: "5",
            color: " black.500",
            textAlign: "center",
          }}
        />
      </HStack>

      <Divider my="2.5" py="0.4" bg="grey.300" w="100%" borderRadius="8" />

      <VStack my="3" space="4">
        <Stack direction="row" space="4">
          <Text
            fontSize="14"
            lineHeight="20"
            letterSpacing="-0.165"
            fontWeight="500"
            color="grey.700"
            textTransform="capitalize"
          >
            In transit
          </Text>
          <Divider
            bg="grey.700"
            rounded="full"
            mt="2"
            h={setHeight(0.5)}
            w={setWidth(1)}
          />
          <Text
            fontSize="14"
            lineHeight="20"
            letterSpacing="-0.165"
            fontWeight="500"
            color="grey.700"
            textTransform="capitalize"
          >
            Delivery
          </Text>
          <Divider
            mt="2"
            bg="grey.700"
            rounded="full"
            h={setHeight(0.5)}
            w={setWidth(1)}
          />

          <Text
            fontSize="14"
            lineHeight="20"
            letterSpacing="-0.165"
            fontWeight="500"
            color="grey.700"
            textTransform="capitalize"
          >
            {totatNairaPrice}
          </Text>

          {/* <NumberFormat
            value={totatNairaPrice}
            displayType="text"
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            prefix={"N"}
            renderText={(value) => (
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="500"
                color="grey.700"
                textTransform="capitalize"
              >
                {`${value}`}
              </Text>
            )}
          /> */}

          <Divider
            mt="2"
            bg="grey.700"
            rounded="full"
            h={setHeight(0.5)}
            w={setWidth(1)}
          />

          <Text
            flex="1"
            flexWrap="nowrap"
            isTruncated
            fontSize="14"
            lineHeight="20"
            letterSpacing="-0.165"
            fontWeight="500"
            color="grey.700"
            textTransform="capitalize"
          >
            {paymentMethod === "PAY_WITH_BANK_TRANSFER"
              ? "Bank Transfer"
              : paymentMethod === "PAY_ON_DELIVERY_WITH_CARD"
              ? "Pay On Delivery - Card"
              : paymentMethod === "PAY_ON_DELIVERY_WITH_CASH"
              ? "Pay On Delivery - Cash"
              : paymentMethod}
          </Text>
        </Stack>

        <Stack direction="row" space="4">
          <Text
            fontSize="14"
            lineHeight="20"
            letterSpacing="-0.165"
            fontWeight="500"
            color="black.500"
            textTransform="capitalize"
          >
            Delivery method
          </Text>
          <Divider
            bg="black.500"
            rounded="full"
            mt="2"
            h={setHeight(0.5)}
            w={setWidth(1)}
          />
          <Text
            fontSize="14"
            lineHeight="20"
            letterSpacing="-0.165"
            fontWeight="500"
            color="black.500"
            textTransform="capitalize"
          >
            Doorstep delivery
          </Text>
        </Stack>

        <Button
          w={setWidth(50)}
          bg="grey.500"
          rounded="full"
          px="4"
          colorScheme="red.500"
          onPress={() => {
            console.log("ReOrder");
          }}
          py="3"
          _text={{
            color: "red.500",
            fontWeight: "500",
            textTransform: "none",
            fontSize: "16",
            lineHeight: "24",
            letterSpacing: "0.165",
          }}
        >
          View delivery details
        </Button>
      </VStack>
    </Box>
  );
};

export default DeliveriesHistoryCard;
