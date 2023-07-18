import { useEffect } from "react";
import { Center, Button } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { usePostMenuToCartMutation } from "../../../redux/cart/cartApiSlice";
import { addMenuCart } from "../../../redux/cart/cartSlice";
import { useSession } from "../../../hooks";

const AddButtonCartCard = ({
  restaurantMenuID,
  quantity,
  onClose,
  setQuantity,
  setShowModal,
  setMessage,
  setShowAlert,
  setAlertStatus,
  subTotal,
}) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSession();
  const [
    postMenuToCart,
    { data: isMenuCart, isLoading, isSuccess, isError, error },
  ] = usePostMenuToCartMutation();
  const { noAuthID } = useSelector((state) => state.general);

  const handlePostMenuCart = async () => {
    let orderPayload = {
      restaurant_menu_id: restaurantMenuID,
      identifier: isAuthenticated ? "" : noAuthID,
      quantity: quantity ? quantity : 0,
      menu_extras: [],
    };

    try {
      const addCartItem = await postMenuToCart(orderPayload);
      return addCartItem;
    } catch (err) {
      console.log("error response", err);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log("error data", error.data.message || error.message);
      onClose(true);
      setQuantity(1);
      setMessage(error.data.message || error.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      const cartItemList = {
        id: isMenuCart?.id,
        identifier: isMenuCart?.identifier,
        quantity: isMenuCart?.quantity,
        restaurant_menu_id: isMenuCart?.restaurant_menu?.id,
        name: isMenuCart?.restaurant_menu?.name,
        menu_extras: isMenuCart?.restaurant_menu?.menu_extras,
        price: isMenuCart?.restaurant_menu?.price,
        restaurant_id: isMenuCart?.restaurant_menu?.restaurant_id,
      };
      dispatch(addMenuCart(cartItemList));
      onClose();
      setShowModal(true);
      console.log("success data");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuCart, isError, isSuccess, error]);
  return (
    <Center my={4}>
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
          Add to cart
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
            letterSpacing: "-0.165",
          }}
          onPress={handlePostMenuCart}
        >
          {`Order ${quantity} to cart - N${subTotal}`}
        </Button>
      )}
    </Center>
  );
};

export default AddButtonCartCard;
