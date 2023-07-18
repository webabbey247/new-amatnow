import { Fragment, useState, useEffect, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { usePayOrderMutation } from "../../redux/cart/cartApiSlice";
import icons from "../../constants/icons";
import {
  setHeight,
  setWidth,
  FLUTTERWAVEPUBLICKEY,
  PAYSTACKPUBLICKEY,
} from "../../utils/helper";
import {
  resetPaymentModal,
  setBankDetails,
  setThirdPartyDetails,
} from "../../redux/cart/cartSlice";
import { FlutterwaveInit, PayWithFlutterwave } from "flutterwave-react-native";
import { Paystack } from "react-native-paystack-webview";
import { useRouter } from "expo-router";

const CheckoutOnlinePaymentForm = ({ orderID, setShowModal, userData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [payOnlineOption, setPayOnlineOption] = useState(
    "PAY_WITH_BANK_TRANSFER"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const { cartTotalAmount } = useSelector((state) => state.cart);
  const paystackWebViewRef = useRef();
  const [
    payOrder,
    { data: isPaymentData, isLoading, isSuccess, isError, error },
  ] = usePayOrderMutation();

  const handleOrderPayment = async () => {
    const formData = {
      id: orderID,
      payment_method: payOnlineOption,
    };
    const paymentResponse = await payOrder(formData);
    return paymentResponse;
  };

  // const handleFlutterOnRedirect = (data) => {
  //   console.log(data);
  //   setShowModal(false);
  //   router.push(`/main/modals/order-summary?orderID=${orderID}`);
  // };

  // const handleFlutterwaveOnAbort = (data) => {
  //   console.log(data);
  // };

  const handleCancelPayment = () => {
    dispatch(resetPaymentModal());
    setShowModal(false);
  };

  useEffect(() => {
    if (isError) {
      console.log("error data", error.data.message);
      setErrorMsg(error.data.message || error.message);
    }
    if (isSuccess) {
      if (payOnlineOption === "PAY_WITH_BANK_TRANSFER") {
        dispatch(setBankDetails(isPaymentData?.message));
      } else if (payOnlineOption === "PAY_WITH_THIRD_PARTY") {
        dispatch(setThirdPartyDetails(isPaymentData?.message));
      }
      console.log("success response", isPaymentData);
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
          value={payOnlineOption}
          onChange={(payment) => {
            setPayOnlineOption(payment);
          }}
        >
          <HStack justifyContent="space-between" w="100%" my={3}>
            <Stack flexDirection="row">
              <Image
                source={icons.BANKTRANSFER}
                alt="Bank transfer"
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
                Bank transfer
              </Text>
            </Stack>
            <Radio value="PAY_WITH_BANK_TRANSFER" colorScheme="red">
              {""}
            </Radio>
          </HStack>

          <Divider my={1.5} bg="grey.500" py={0.3} />

          {/* <HStack justifyContent="space-between" w="100%" my={3}>
            <Stack flexDirection="row">
              <Image
                source={icons.FLUTTERWAVE}
                alt="Flutterwave"
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
                Flutterwave
              </Text>
            </Stack>
            <Radio value="FLUTTERWAVE" colorScheme="red">
              {""}
            </Radio>
          </HStack> */}

          {/* <Divider my={1.5} bg="grey.500" py={0.3} /> */}

          <HStack justifyContent="space-between" w="100%" my={3}>
            <Stack flexDirection="row">
              <Image
                source={icons.PAYSTACK}
                alt="Paystack"
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
                Paystack
              </Text>
            </Stack>
            <Radio value="PAYSTACK" colorScheme="red">
              {""}
            </Radio>
          </HStack>

          <Divider my={1.5} bg="grey.500" py={0.3} />

          <HStack justifyContent="space-between" w="100%" my={3}>
            <Stack flexDirection="row">
              <Image
                source={icons.PAYTHIRDPAY}
                alt="Pay by third party"
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
                Pay by third party
              </Text>
            </Stack>
            <Radio value="PAY_WITH_THIRD_PARTY" colorScheme="red">
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
      ) : // : payOnlineOption === "FLUTTERWAVE" ? (
      //   <PayWithFlutterwave
      //     onRedirect={handleFlutterOnRedirect}
      //     onAbort={handleFlutterwaveOnAbort}
      //     options={{
      //       tx_ref: orderID,
      //       authorization: FLUTTERWAVEPUBLICKEY,
      //       amount: cartTotalAmount,
      //       currency: "NGN",
      //       customer: {
      //         email: userData.email,
      //         phonenumber: userData.phone,
      //         name: [userData.first_name, userData.last_name].join(""),
      //       },
      //       payment_options: "card",
      //     }}
      //     customButton={(props) => (
      //       <Button
      //         onPress={props.onPress}
      //         disabled={props.disabled}
      //         mt={5}
      //         width="100%"
      //         rounded="full"
      //         bg="red.500"
      //         py="4"
      //         _text={{
      //           color: "white.500",
      //           fontWeight: "500",
      //           textTransform: "none",
      //           fontSize: "16",
      //           lineHeight: "24",
      //           letterSpacing: "0.165",
      //         }}
      //       >
      //         Proceed With Flutterwave
      //       </Button>
      //     )}
      //   />
      // )
      payOnlineOption === "PAYSTACK" ? (
        <Fragment>
          <Paystack
            paystackKey={PAYSTACKPUBLICKEY}
            billingEmail={userData.email}
            billingMobile={userData.phone}
            billingName={[userData.first_name, userData.last_name].join(" ")}
            amount={`${cartTotalAmount}.00`}
            activityIndicatorColor="#F8F8F8"
            channels={["card", "bank", "ussd", "qr"]}
            onCancel={(e) => {
              setShowModal(true);
              console.log("cancel response", e);
            }}
            onSuccess={(res) => {
              setShowModal(false);
              router.push(`main/orders/${orderID}?title="restuarant"`);
              console.log("success response", res);
            }}
            ref={paystackWebViewRef}
          />
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
            onPress={() => paystackWebViewRef.current.startTransaction()}
          >
            Proceed with Paystack
          </Button>
        </Fragment>
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
          {`Pay ${cartTotalAmount}`}
        </Button>
      )}
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
        Cancel Payment
      </Button>
    </VStack>
  );
};

export default CheckoutOnlinePaymentForm;
