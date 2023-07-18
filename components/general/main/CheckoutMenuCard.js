import { useEffect, Fragment } from "react";
import {
  IconButton,
  Image,
  Heading,
  Text,
  Center,
  HStack,
  Stack,
  Spinner,
  Pressable,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import icons from "../../../constants/icons";
import { useDispatch } from "react-redux";
import { setHeight, setWidth } from "../../../utils/helper";
import { usePatchMenuToCartMutation } from "../../../redux/cart/cartApiSlice";
import { addMenuCart } from "../../../redux/cart/cartSlice";

const CheckoutMenuCard = ({
  id,
  title,
  description,
  price,
  image,
  qty,
  setCartID,
  onOpen,
  restaurant_menu_id,
  identifier,
  menu_extras,
  setMessage,
  setShowAlert,
  setAlertStatus,
}) => {
  const dispatch = useDispatch();
  const [
    patchMenuToCart,
    { data: isPatchCartData, isLoading, isSuccess, isError, error },
  ] = usePatchMenuToCartMutation();

  const incrementQuantity = async () => {
    const newQty = qty + 1;
    try {
      const increaseMenuCart = await patchMenuToCart({
        cartID: id,
        restaurant_menu_id: restaurant_menu_id,
        identifier: identifier,
        quantity: newQty,
        menu_extras: menu_extras,
      });
      return increaseMenuCart;
    } catch (err) {
      console.log("error response", err);
    }
  };

  const decrementQuantity = async () => {
    const newQty = qty === 1 ? qty : qty - 1;
    try {
      const decreaseMenuCart = await patchMenuToCart({
        cartID: id,
        restaurant_menu_id: restaurant_menu_id,
        identifier: identifier,
        quantity: newQty,
        menu_extras: menu_extras,
      });
      return decreaseMenuCart;
    } catch (err) {
      console.log("error response", err);
    }
  };

  useEffect(() => {
    if (isError) {
      setMessage(error.data.message || error.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      const cartItem = {
        id: isPatchCartData?.id,
        identifier: isPatchCartData?.identifier,
        quantity: isPatchCartData?.quantity,
        restaurant_menu_id: isPatchCartData?.restaurant_menu?.id,
        name: isPatchCartData?.restaurant_menu?.name,
        menu_extras: isPatchCartData?.restaurant_menu?.menu_extras,
        price: isPatchCartData?.restaurant_menu?.price,
        restaurant_id: isPatchCartData?.restaurant_menu?.restaurant_id,
      };
      dispatch(addMenuCart(cartItem));
      setMessage(
        `${isPatchCartData?.restaurant_menu.name} is updated successfully`
      );
      setShowAlert(true);
      setAlertStatus("success");
      // console.log(
      //   "success response",
      //   `${isPatchCartData?.restaurant_menu.name} is updated successfully`
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPatchCartData, isError, isSuccess, error]);

  return (
    <Fragment>
      <HStack
        justifyContent="space-between"
        alignItems="space-between"
        my={3}
        key={id}
        w="100%"
      >
        <Stack flexDirection="row">
          <Image
            borderRadius="8"
            source={{
              uri: image,
            }}
            alt={title}
            w={setWidth(23)}
            h={setHeight(11.5)}
          />
          {isLoading ? (
            <Center
              bottom="10%"
              left="10%"
              position="absolute"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner color="red.500" size="sm" my={3} />
            </Center>
          ) : (
            <HStack
              bg="white.200"
              // w={setWidth(20)}
              // h={setHeight(4)}
              rounded="full"
              position="absolute"
              bottom="10%"
              left="4%"
              justifyContent="space-between"
              py="0.5"
            >
              <IconButton
                onPress={decrementQuantity}
                size={7}
                rounded="full"
                bg="white.200"
                _icon={{
                  as: Feather,
                  name: "minus",
                  size: "4",
                  color: "black.500",
                }}
              />
              <Text
                fontSize="14"
                lineHeight="20"
                textAlign="center"
                letterSpacing="-0.165"
              >
                {qty}
              </Text>
              <IconButton
                onPress={incrementQuantity}
                size={7}
                rounded="full"
                bg="white.200"
                _icon={{
                  as: Feather,
                  name: "plus",
                  size: "4",
                  color: "black.500",
                }}
              />
            </HStack>
          )}

          <Center
            justifyContent="center"
            alignItems="flex-start"
            ml={4}
            w="60%"
          >
            <Heading
              isTruncated
              noOfLines={1}
              fontSize="16"
              lineHeight="24"
              fontWeight="500"
              textAlign="left"
            >
              {title}
            </Heading>
            <Text
              isTruncated
              noOfLines={2}
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="400"
              textAlign="left"
            >
              {description}
            </Text>
            <Text
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="400"
              textAlign="left"
            >
              {`N ${price}`}
            </Text>
          </Center>
        </Stack>

        <Pressable
          position="absolute"
          right="0"
          top="4"
          onPress={() => {
            onOpen();
            setCartID(id);
          }}
        >
          <Center bg="grey.500" rounded="full" p="1.5">
            <Image
              size="6"
              source={icons.REDTRASHICON}
              alt="Delete"
              resizeMode="contain"
            />
          </Center>
        </Pressable>

        {/* <IconButton
          onPress={() => {
            onOpen();
            setCartID(id);
          }}
          position="absolute"
          right="0"
          top="4"
          bg="transparent"
          variant="solid"
          _icon={{
            as: Feather,
            name: "trash",
            size: "5",
            color: "black.500",
          }}
        /> */}
      </HStack>
    </Fragment>
  );
};

export default CheckoutMenuCard;
