import { useState, useEffect } from "react";
import {
  Stack,
  Image,
  Text,
  VStack,
  HStack,
  Radio,
  FormControl,
  Button,
  Divider,
  Center,
} from "native-base";
import { setWidth, setHeight } from "../../utils/helper";
import { usePayOrderMutation } from "../../redux/cart/cartApiSlice";
import { useRouter } from "expo-router";
import icons from "../../constants/icons";

const CheckoutOnDeliveryPaymentForm = ({ orderID, setShowModal }) => {
  const router = useRouter();
  const [payOnDeliveryOption, setPayOnDeliveryOption] = useState(
    "PAY_ON_DELIVERY_WITH_CARD"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [
    payOrder,
    { data: isPaymentData, isLoading, isSuccess, isError, error },
  ] = usePayOrderMutation();
  const handleOrderPayment = async () => {
    const formData = {
      id: orderID,
      payment_method: payOnDeliveryOption,
    };
    const paymentResponse = await payOrder(formData);
    return paymentResponse;
  };

  useEffect(() => {
    if (isError) {
      console.log("error data", error.data.message);
      setErrorMsg(error.data.message || error.message);
    }
    if (isSuccess) {
      console.log("success response", isPaymentData);
      router.push(`main/orders/${orderID}?title="restuarant"`);
      // router.push(`/main/modals/order-summary?orderID=${orderID}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaymentData, isError, isSuccess, error]);
  return (
    <VStack my={4}>
      <FormControl>
        <Radio.Group
          defaultValue="2"
          name="paymentDetails"
          my={3}
          value={payOnDeliveryOption}
          onChange={(payment) => {
            setPayOnDeliveryOption(payment);
          }}
        >
          <HStack justifyContent="space-between" w="100%" my={3}>
            <Stack flexDirection="row">
              <Image
                source={icons.PAYTHIRDPAY}
                alt="Pay on delivery"
                w={setWidth(8)}
                h={setHeight(4)}
              />
              <Text
                mt={1}
                ml={3}
                textAlign="center"
                fontSize="14"
                lineHeight="20"
                fontWeight="400"
                color="black.500"
              >
                Pay on Delivery - Card
              </Text>
            </Stack>
            <Radio value="PAY_ON_DELIVERY_WITH_CARD" colorScheme="red">
              {""}
            </Radio>
          </HStack>

          <Divider my={1.5} bg="grey.500" py={0.3} />

          <HStack justifyContent="space-between" w="100%" my={3}>
            <Stack flexDirection="row">
              <Image
                source={icons.PAYTHIRDPAY}
                alt="Pay on delivery"
                w={setWidth(8)}
                h={setHeight(4)}
              />
              <Text
                mt={1}
                ml={3}
                textAlign="center"
                fontSize="14"
                lineHeight="20"
                fontWeight="400"
                color="black.500"
              >
                Pay on Delivery - Cash
              </Text>
            </Stack>
            <Radio value="PAY_ON_DELIVERY_WITH_CASH" colorScheme="red">
              {""}
            </Radio>
          </HStack>
        </Radio.Group>
      </FormControl>
      {errorMsg ? (
        <Center p={3} bg="red.200" borderRadius="8">
          <Text
            fontSize="14"
            lineHeight="18"
            letterSpacing="-0.165"
            color="black.500"
          >
            {errorMsg}
          </Text>
        </Center>
      ) : null}
      {isLoading ? (
        <Button
          mt={5}
          width="100%"
          rounded="full"
          bg="red.500"
          py="4"
          isLoading
          _loading={{
            bg: "red.500",
          }}
          _spinner={{
            color: "white",
          }}
          isLoadingText="Please wait"
        >
          Loading
        </Button>
      ) : (
        <Button
          mt={5}
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
          onPress={handleOrderPayment}
        >
          Confirm Payment
        </Button>
      )}
      <Button
        onPress={() => setShowModal(false)}
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
        Cancel Payment
      </Button>
    </VStack>
  );
};

export default CheckoutOnDeliveryPaymentForm;
