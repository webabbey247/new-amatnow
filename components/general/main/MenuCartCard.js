import { useState, useEffect } from "react";
import {
  VStack,
  Heading,
  Text,
  Image,
  Pressable,
  IconButton,
  HStack,
  Stack,
  Center,
  Spinner,
} from "native-base";
import { useDispatch } from "react-redux";
import { setWidth, setHeight } from "../../../utils/helper";
import { Feather } from "@expo/vector-icons";
import {
  useDeleteCartMenuItemMutation,
  usePatchMenuToCartMutation,
} from "../../../redux/cart/cartApiSlice";
import { addMenuCart, removeCartItem } from "../../../redux/cart/cartSlice";
import icons from "../../../constants/icons";
import { Platform } from "react-native";

const MenuCartCard = ({
  id,
  qty,
  title,
  description,
  image,
  price,
  setMessage,
  setShowAlert,
  setAlertStatus,
  restaurant_menu_id,
  menu_extras,
  identifier,
}) => {
  const dispatch = useDispatch();
  const [deleteCartMenuItem, { isLoading }] = useDeleteCartMenuItemMutation();
  const [
    patchMenuToCart,
    {
      data: isPatchCartData,
      isLoading: isPatchCartLoading,
      isSuccess,
      isError,
      error,
    },
  ] = usePatchMenuToCartMutation();

  const handleDeleteMenuCartItem = async () => {
    try {
      dispatch(removeCartItem(id));
      const deleteMenuItem = await deleteCartMenuItem(id);
      if (deleteMenuItem?.data.status === "success") {
        dispatch(removeCartItem(id));
        setMessage(deleteMenuItem?.data.message || deleteMenuItem.message);
        setShowAlert(true);
        setAlertStatus("success");
      } else {
        setMessage(deleteMenuItem?.data.message);
        setShowAlert(true);
        setAlertStatus("error");
      }
    } catch (err) {
      console.log("error response", err);
    }
  };

  const incrementQuantity = async () => {
    const formData = {
      cartID: id,
      restaurant_menu_id: restaurant_menu_id,
      identifier: identifier,
      quantity: qty + 1,
      menu_extras: menu_extras,
    }
    try {
      const increaseMenuCart = await patchMenuToCart(formData);
      return increaseMenuCart;
    } catch (err) {
      console.log("error response", err);
    }
  };

  const decrementQuantity = async () => {
    const formData = {
      cartID: id,
      restaurant_menu_id: restaurant_menu_id,
      identifier: identifier,
      quantity: qty === 1 ? qty : qty - 1,
      menu_extras: menu_extras,
    }
    try {
      const decreaseMenuCart = await patchMenuToCart(formData);
      return decreaseMenuCart;
    } catch (err) {
      console.log("error response", err);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log("error data", error?.data.message || error?.message);
      setMessage(error?.data.message || error?.message);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPatchCartData, isPatchCartLoading, isError, isSuccess, error]);

  return (
    <>
      <HStack
        key={id}
        id={id}
        bg="white.500"
        maxW="100%"
        w={setWidth(44)}
        borderRadius={8}
        mb={4}
      >
        <Image
          w={setWidth(34)}
          source={{
            uri: image,
          }}
          h={setHeight(17)}
          alt={title}
          resizeMode="cover"
          borderRadius={8}
        />

        {isLoading ? (
          <Spinner
            position="absolute"
            top="10%"
            left="5%"
            color="red.500"
            size="sm"
          />
        ) : (
          <Pressable
            position="absolute"
            top="10%"
            left="5%"
            onPress={handleDeleteMenuCartItem}
          >
            <Center
              bg="grey.500"
              rounded="full"
              p="1.5"
              // onPress={handleDeleteMenuCartItem}
            >
              <Image
                size="6"
                source={icons.REDTRASHICON}
                alt="Delete"
                resizeMode="contain"
              />
            </Center>
          </Pressable>
        )}
        <VStack bg="white.500" w="100%" ml={5}>
          <Heading
            isTruncated
            noOfLines={1}
            fontSize="16"
            lineHeight="24"
            fontWeight="700"
            color="black.500"
            textAlign="left"
            letterSpacing="-0.165"
          >
            {title}
          </Heading>
          <Text
            isTruncated
            noOfLines={1}
            fontSize="14"
            fontWeight="400"
            lineHeight="20"
            color="grey.700"
            textAlign="left"
            my={0.5}
            letterSpacing="-0.165"
          >
            {description}
          </Text>

          <Text
            fontSize="12"
            lienHeight="20"
            color="black.500"
            fontWeight="500"
            textAlign="left"
            letterSpacing="-0.165"
          >
            {`N ${price}`}
          </Text>

          {isPatchCartLoading ? (
            <Center
              flex="1"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Spinner color="red.500" size="sm" my={3} />
            </Center>
          ) : (
            <Stack flexDirection="row" justifyContent="flex-start" py={4}>
              <IconButton
                onPress={decrementQuantity}
                p="2"
                bg="white.500"
                borderWidth={1}
                borderColor="grey.700"
                rounded="full"
                variant="solid"
                _icon={{
                  as: Feather,
                  name: "minus",
                  size: "4",
                  color: "grey.700",
                  textAlign: "center",
                }}
              />
              <Text
                fontSize="14"
                lineHeight="20"
                fontWeight="400"
                color="black.500"
                letterSpacing="-0.165"
                px={3}
                mt={1}
                textAlign="center"
              >
                {qty}
              </Text>
              <IconButton
                onPress={incrementQuantity}
                p="2"
                bg="white.500"
                borderWidth={1}
                borderColor="grey.700"
                rounded="full"
                variant="solid"
                _icon={{
                  as: Feather,
                  name: "plus",
                  size: "4",
                  color: "grey.700",
                  textAlign: "center",
                }}
              />
            </Stack>
          )}
        </VStack>
      </HStack>
    </>
  );
};

export default MenuCartCard;
