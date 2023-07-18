import { Fragment, useState, useEffect } from "react";
import {
  FormControl,
  Stack,
  Heading,
  VStack,
  Button,
  Image,
  Input,
} from "native-base";
import { setHeight, setWidth } from "../../utils/helper";
import { useLazyAddCouponQuery } from "../../redux/cart/cartApiSlice";
import { addPromoCode } from "../../redux/cart/cartSlice";
import icons from "../../constants/icons";
import { ToastAlert } from "../alerts";
import { useDispatch } from "react-redux";

const CheckoutPromoCodeForm = ({
  restuarantID,
  onClose,
  setMessage,
  setShowAlert,
  setAlertStatus,
}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [promoCode, setPromoCode] = useState("");

  const [
    addCoupon,
    {
      data: isPromoData,
      isLoading,
      isFetching,
      isSuccess,
      isError,
      error: promoError,
    },
  ] = useLazyAddCouponQuery();

  const handlePromoCode = async () => {
    if (promoCode === "") {
      setError(true);
      setErrorMsg("Kindly provide a valid promo code");
    } else {
      let formData = {
        restuarantID: restuarantID,
        discountCode: promoCode,
      };
      console.log("hello papayload", formData);
      try {
        const promoResponse = await addCoupon(formData);
        return promoResponse;
      } catch (err) {
        console.log("error network response", err);
      }
    }
  };

  useEffect(() => {
    if (isError) {
      // console.log("error ID", promoError.data.message || promoError.message);
      setMessage(promoError.data.message || promoError.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      dispatch(addPromoCode(isPromoData?.data.id));
      setMessage(`${promoCode} added successfully to order!`);
      setShowAlert(true);
      setAlertStatus("success");
      onClose(true);
      // console.log("hello success ID", isPromoData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPromoData, isError, isSuccess, promoError]);
  return (
    <Fragment>
      <VStack my={2} w="100%" px={4} justifyContent="flex-start">
        <Heading
          fontSize="18"
          lineHeight="26"
          fontWeight="700"
          letterSpacing="-0.165"
          color="black.500"
          textAlign="center"
        >
          Promotions
        </Heading>
        <Stack flexDirection="column" my={6}>
          <FormControl mt={3} isInvalid={error ? true : false}>
            <FormControl.Label
              my={3}
              _text={{
                color: "black.500",
                fontSize: "16",
                lineHeight: "24",
                letterSpacing: "-0.165",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
            >
              Promo code
            </FormControl.Label>
            <Input
              fontSize="14"
              lineHeight="20"
              placeholderTextColor="grey.700"
              letterSpacing="-0.165"
              height={setHeight(7)}
              InputLeftElement={
                <Image
                  ml={2}
                  source={icons.VOUCHERICON}
                  alt="Promotions"
                  w={setWidth(8)}
                  h={setHeight(4)}
                />
              }
              bg="grey.500"
              placeholder="Enter promo code"
              borderColor="grey.500"
              borderRadius="8"
              onChangeText={(promo) => setPromoCode(promo)}
              value={promoCode}
              keyboardType="default"
            />
            {error ? (
              <FormControl.ErrorMessage color="red.500">
                {errorMsg}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
        </Stack>
      </VStack>
      <VStack flex={0.2} justifyContent="flex-start" w="100%" py={5}>
        {isLoading || isFetching ? (
          <Button
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
            Log In
          </Button>
        ) : (
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
            onPress={handlePromoCode}
          >
            Apply Promo Code
          </Button>
        )}
      </VStack>
    </Fragment>
  );
};

export default CheckoutPromoCodeForm;
