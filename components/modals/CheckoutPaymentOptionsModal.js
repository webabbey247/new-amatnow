import { Fragment } from "react";
import { Modal, Platform } from "react-native";
import { VStack, Heading, HStack, IconButton } from "native-base";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { CheckoutPaymentActionSheet } from "../actionsheets";
import {
  CheckoutOnDeliveryPaymentForm,
  CheckoutOnlinePaymentForm,
} from "../forms";

const CheckoutPaymentOptionsModal = ({
  showModal,
  setShowModal,
  paymentOption,
  userData,
}) => {
  const router = useRouter();
  const { orderID, showPaymentModal } = useSelector((state) => state.cart);

  return (
    <Fragment>
      <Modal
        statusBarTranslucent={Platform.OS === "android" ? true : false}
        animationType="slide"
        visible={showModal ? true : false}
        transparent={false}
      >
        <VStack px={4} safeAreaTop my={2}>
          <HStack
            alignItems="center"
            justifyContent="flex-start"
            py={2}
            bg="white.500"
          >
            <IconButton
              onPress={() => router.back()}
              p="2"
              bg="white.500"
              rounded="full"
              shadow={4}
              variant="solid"
              _icon={{
                as: Feather,
                name: "x",
                size: "5",
                color: "black.500",
              }}
            />
            <Heading
              position="absolute"
              left="32%"
              top="3"
              fontSize="18"
              lineHeight="26"
              letterSpacing="-0.165"
              textAlign="left"
              fontWeight="500"
              textTransform="none"
              color="black.500"
            >
              Payment Methods
            </Heading>
          </HStack>

          {paymentOption === "PAYMENT_ONLINE" ? (
            <CheckoutOnlinePaymentForm
              userData={userData}
              setShowModal={setShowModal}
              orderID={orderID}
            />
          ) : (
            <CheckoutOnDeliveryPaymentForm
              setShowModal={setShowModal}
              orderID={orderID}
            />
          )}
        </VStack>
      </Modal>
      <CheckoutPaymentActionSheet
        paymentOption={paymentOption}
        isOpen={showPaymentModal ? true : false}
      />
    </Fragment>
  );
};

export default CheckoutPaymentOptionsModal;
