import { useEffect, useState } from "react";
import {
  StatusBar,
  useColorMode,
  ScrollView,
  Heading,
  Divider,
  VStack,
  Text,
  Box,
  Spinner,
  useDisclose,
} from "native-base";
import { useSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useGetAuthenticatedUserQuery } from "../../../redux/auth/authApiSlice";
import { useGetCartQuery } from "../../../redux/cart/cartApiSlice";
import { CheckoutToggle } from "../../../components/toggles";
import { CheckoutMenuCartSlider } from "../../../components/sliders";
import {
  CheckoutPaymentOptionsForm,
  CheckoutDeliveryOptionsForm,
} from "../../../components/forms";
import {
  CheckoutAddressCard,
  CheckoutButtonCard,
  CheckoutDeliveryInstructionsCard,
  CheckoutPromoCard,
  CheckoutRiderTipsCard,
  CheckoutSummaryCard,
} from "../../../components/general";
import { CheckoutCartActionSheet } from "../../../components/actionsheets";

const CheckoutPage = () => {
  const params = useSearchParams();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [formType, setFormType] = useState(null);
  const [delivery, setDelivery] = useState(true);
  const [paymentOption, setPaymentOption] = useState("PAYMENT_ONLINE");
  const {
    userAddress,
    userAddressStatus,
    locationAddress,
    longitude,
    latitude,
  } = useSelector((state) => state.general);
  const {
    data: isUserData,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useGetAuthenticatedUserQuery();

  const {
    data: cartData,
    isLoading,
    isFetching,
  } = useGetCartQuery({
    restuarantID: params.title,
    identifierID: "",
  });

  useEffect(() => {}, [longitude, latitude]);
  return (
    <Box px={4} flex={1} bg={colorMode === "dark" ? "black.500" : "white.500"}>
      <CheckoutToggle delivery={delivery} setDelivery={setDelivery} />
      <ScrollView
        flex={1}
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <VStack>
          <Heading
            my={2}
            mb={2}
            fontSize="18"
            lineHeight="24"
            letterSpacing="-0.165"
            fontWeight="800"
            textAlign="left"
            textTransform="capitalize"
          >
            Your cart
          </Heading>

          <CheckoutMenuCartSlider
            isLoading={isLoading}
            isFetching={isFetching}
            cartData={cartData}
            restuarantID={params.title}
          />

          <Divider my={1.5} bg="grey.500" py={0.3} />

          <CheckoutDeliveryOptionsForm delivery={delivery} />

          <Divider my={1.5} bg="grey.500" py={0.3} />

          <CheckoutAddressCard
            userAddressStatus={userAddressStatus}
            userAddress={userAddress}
            locationAddress={locationAddress}
            restuarantID={params.title}
          />

          {delivery ? (
            <CheckoutDeliveryInstructionsCard
              onOpen={onOpen}
              setFormType={setFormType}
            />
          ) : null}

          <CheckoutPromoCard onOpen={onOpen} setFormType={setFormType} />

          {delivery ? (
            <CheckoutRiderTipsCard onOpen={onOpen} setFormType={setFormType} />
          ) : null}

          <CheckoutSummaryCard
            isLoading={isLoading}
            isFetching={isFetching}
            cartData={cartData}
            delivery={delivery}
          />

          <Divider my={1.5} bg="grey.500" py={0.3} />

          <CheckoutPaymentOptionsForm
            delivery={delivery}
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
          />

          {isUserLoading || isUserFetching ? (
            <Spinner color="red.500" size="sm" />
          ) : (
            <CheckoutButtonCard
              userData={isUserData}
              paymentOption={paymentOption}
              delivery={delivery}
              restuarantID={params.title}
              longitude={parseFloat(longitude)}
              latitude={parseFloat(latitude)}
            />
          )}

          {isLoading || isFetching ? (
            <Spinner color="red.500" size="sm" />
          ) : (
            <CheckoutCartActionSheet
              restuarantID={params.title}
              delivery={delivery}
              isOpen={isOpen}
              onClose={onClose}
              formType={formType}
            />
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default CheckoutPage;
