import { Fragment, useEffect, useState } from "react";
import { VStack, Button } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../../../redux/cart/cartApiSlice";
import { setPaymentInfo } from "../../../redux/cart/cartSlice";
import { ToastAlert } from "../../alerts";
import { CheckoutPaymentOptionsModal } from "../../modals";

const CheckoutButtonCard = ({
  restuarantID,
  delivery,
  paymentOption,
  userData,
  longitude,
  latitude,
}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { riderTips, notes, discountID } = useSelector((state) => state.cart);

  const [
    createOrder,
    { data: orderData, isLoading, isSuccess, isError, error },
  ] = useCreateOrderMutation();

  const handleCreateOrder = async () => {
    const order = {
      latitude: latitude,
      longitude: longitude,
      is_contactless: false,
      note: notes,
      rider_tip: delivery ? riderTips : 0,
      discount_id: discountID,
      restaurant_id: restuarantID,
      delivery_mode: delivery ? "DELIVERY" : "PICKUP",
    };
    console.log("hello create order payload", order);
    try {
      // const createMenuOrder = await createOrder({ order, latitude, longitude });
      // return createMenuOrder;
      const createMenuOrder = await createOrder(order);
      return createMenuOrder;
      // console.log("hello order:", createMenuOrder);
      // return orderMenu?.data;
    } catch (err) {
      console.log("error response", err);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log("error data", error.message || error.data.message);
      console.log("error", error);
      setMessage(error.message || error.data.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      console.log("success datas", orderData);
      setShowModal(true);
      dispatch(setPaymentInfo(orderData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData, isError, isSuccess, error]);

  return (
    <Fragment>
      <VStack justifyContent="center" w="100%" my={4} mb={16}>
        {showAlert ? (
          <ToastAlert
            message={message}
            status={alertStatus}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        ) : null}
        {isLoading ? (
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
            onPress={handleCreateOrder}
            width="100%"
            rounded="full"
            bg="red.500"
            alignSelf="flex-start"
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
            Place Order
          </Button>
        )}
        <Button
          width="100%"
          rounded="full"
          bg="red.200"
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
          Clear Order
        </Button>
      </VStack>

      <CheckoutPaymentOptionsModal
        userData={userData}
        setShowModal={setShowModal}
        showModal={showModal}
        paymentOption={paymentOption}
      />
    </Fragment>
  );
};

export default CheckoutButtonCard;
