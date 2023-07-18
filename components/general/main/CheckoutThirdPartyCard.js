import { Fragment } from "react";
import {
  VStack,
  Heading,
  Text,
  Button,
  Divider,
  HStack,
  Center,
  Image,
} from "native-base";
import icons from "../../../constants/icons";
import { setWidth } from "../../../utils/helper";
import { useDispatch } from "react-redux";
import { resetPaymentModal } from "../../../redux/cart/cartSlice";

const CheckoutThirdPartyCard = ({ thirdPartyDetail, cartTotalAmount }) => {
  const dispatch = useDispatch();
  const handleCancelPayment = () => {
    dispatch(resetPaymentModal());
  };
  return (
    <Fragment>
      <VStack flex={1} w="100%" bg="white.500" mt={2} px={4}>
        <Heading
          fontSize="20"
          lineHeight="28"
          fontWeight="700"
          letterSpacing="-0.165"
          color="black.500"
          textAlign="left"
        >
          Pay by third party
        </Heading>
        <Text
          my={1}
          fontSize="14"
          lineHeight="20"
          fontWeight="400"
          letterSpacing="-0.165"
          color="grey.800"
          textAlign="left"
        >
          Recipient will be paying N{parseInt(cartTotalAmount, 10)}
        </Text>

        <Divider my={3} bg="grey.500" py={0.3} />

        <HStack justifyContent="flex-start" alignItems="flex-start">
          <Center bg="grey.500" rounded="full" p={2}>
            <Image
              size="6"
              source={icons.PAYTHIRDPAY}
              alt="Pay Third Party"
              resizeMode="contain"
            />
          </Center>
          <Text
            w={setWidth(75)}
            ml={4}
            mt={2}
            isTruncated
            fontSize="14"
            lineHeight="20"
            fontWeight="400"
            letterSpacing="-0.165"
            color="grey.800"
            textAlign="left"
          >
            {thirdPartyDetail}
          </Text>
        </HStack>
      </VStack>

      <VStack my={4} w="100%" px={4} justifyContent="flex-start">
        <Button
          width="100%"
          rounded="full"
          bg="red.500"
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
          Copy Details
        </Button>
        <Button
          onPress={handleCancelPayment}
          width="100%"
          rounded="full"
          bg="grey.500"
          alignSelf="flex-start"
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
          Cancel
        </Button>
      </VStack>
    </Fragment>
  );
};

export default CheckoutThirdPartyCard;
