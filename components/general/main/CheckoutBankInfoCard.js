import { Fragment } from "react";
import { VStack, Heading, Text, Button, Divider } from "native-base";
import { useDispatch } from "react-redux";
import { resetPaymentModal } from "../../../redux/cart/cartSlice";

const CheckoutBankInfoCard = ({ bankDetails }) => {
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
          Bank transfer
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
          You will be paying{" "}
          {[bankDetails?.currency, bankDetails?.amount].join("")}
        </Text>

        <Divider my={3} bg="grey.500" py={0.3} />

        <Text
          fontSize="14"
          lineHeight="20"
          fontWeight="400"
          letterSpacing="-0.165"
          color="grey.800"
          textAlign="left"
        >
          Account name{" "}
          <Text color="black.500" fontWeight="700">
            Amat Now - {bankDetails?.bank}
          </Text>
        </Text>
        <Text
          my={1}
          fontSize="14"
          lineHeight="20"
          fontWeight="400"
          letterSpacing="-0.165"
          color="grey.800"
          textAlign="left"
        >
          Account number{" "}
          <Text color="black.500" fontWeight="700">
            {bankDetails?.account_number}
          </Text>
        </Text>
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

export default CheckoutBankInfoCard;
