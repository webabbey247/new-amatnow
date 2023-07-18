import { Fragment, useState, useEffect } from "react";
import { Platform } from "react-native";
import {
  KeyboardAvoidingView,
  Text,
  HStack,
  FormControl,
  TextArea,
  Center,
  Heading,
  Actionsheet,
  VStack,
  Image,
  IconButton,
  Button,
  Stack,
  Checkbox,
  ScrollView,
  Pressable,
  Divider,
  Badge,
} from "native-base";
import { getCartList } from "../../redux/cart/cartSlice";
import { MenuDetailsASSkeleton } from "../skeleton";
import { useSelector } from "react-redux";
import { useGetSingleRestuarantMenuQuery } from "../../redux/restuarant/restaurantApiSlice";
import { setHeight } from "../../utils/helper";
import { Feather } from "@expo/vector-icons";
import { AddButtonCartCard, PatchButtonCartCard } from "../general";
import { ToastAlert } from "../alerts";
import { MenuCartModal } from "../modals";

const MenuDetailsActionSheet = ({
  isOpen,
  onClose,
  menuCategoryID,
  restuarantID,
}) => {
  const {
    data: menuData,
    isLoading,
    isFetching,
  } = useGetSingleRestuarantMenuQuery({
    restuarantID: restuarantID,
    menuCategoryID: menuCategoryID,
  });

  console.log("hello menu", menuData);

  const { cartList } = useSelector(getCartList);
  const cartItem = cartList.filter(
    (item) => item.restaurant_menu_id === menuData?.id
  );

  const cartMenuQty =
    cartItem.length >= 1 ? parseInt(cartItem.quantity, 10) : !cartItem ? 1 : 1;

  const [menuPreference, setMenuPreference] = useState(
    menuData?.menu_extra_section
  );

  const [quantity, setQuantity] = useState(cartMenuQty);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");

  const incrementQuantity = () => setQuantity(quantity + 1);
  let decrementQuantity = () => setQuantity(quantity - 1);
  if (quantity === 1) {
    decrementQuantity = () => setQuantity(1);
  }
  const subTotal = quantity * menuData?.price;

  useEffect(() => {}, [cartList]);
  return (
    <Fragment>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator={true}>
        <Actionsheet.Content
          p={0}
          m={0}
          bg="white.500"
          h={setHeight(95)}
          w="100%"
          maxHeight="100%"
        >
          {isLoading || isFetching ? (
            <MenuDetailsASSkeleton />
          ) : (
            <Fragment>
              <VStack w="100%">
                <Image
                  width="100%"
                  h={setHeight(20)}
                  source={{
                    uri: menuData?.image,
                  }}
                  resizeMode="cover"
                  alt={menuData?.name}
                />
                <IconButton
                  onPress={onClose}
                  size={8}
                  rounded="full"
                  position="absolute"
                  bg="grey.500"
                  top="25"
                  left="5"
                  shadow={2}
                  _icon={{
                    as: Feather,
                    name: "x",
                    size: "5",
                    color: "black.500",
                  }}
                />

                <IconButton
                  onPress={onClose}
                  size={8}
                  rounded="full"
                  position="absolute"
                  bg="grey.500"
                  top="25"
                  right="5"
                  shadow={2}
                  _icon={{
                    as: Feather,
                    name: "share",
                    size: "5",
                    color: "black.500",
                  }}
                />
              </VStack>
              <ScrollView w="100%" showsVerticalScrollIndicator={false}>
                <VStack py={2} px={4} justifyContent="flex-start">
                  <Heading
                    mt={1}
                    fontSize="20"
                    lineHeight="28"
                    fontWeight="800"
                    letterSpacing="-0.165"
                    color="black.500"
                    textAlign="left"
                  >
                    {menuData?.name}
                  </Heading>
                  <Text
                    my={2}
                    isTruncated
                    noOfLines={3}
                    fontSize="14"
                    fontWeight="400"
                    lineHeight="20"
                    letterSpacing="-0.165"
                    color="grey.700"
                    textAlign="left"
                  >
                    {menuData?.description}
                  </Text>
                  <Text
                    fontSize="16"
                    fontWeight="700"
                    lineHeight="24"
                    letterSpacing="-0.165"
                    color="black.500"
                    textAlign="left"
                  >
                    N{menuData?.price}
                  </Text>
                </VStack>

                {menuData?.has_extra_section ? (
                  <VStack>
                    {menuData?.menu_extra_section.map((menu, index) => {
                      return (
                        <Center
                          key={index}
                          justifyContent="flex-start"
                          alignItems="flex-start"
                        >
                          <Divider
                            my={3}
                            py="0.4"
                            bg="grey.300"
                            w="100%"
                            borderRadius="8"
                          />
                          <HStack
                            px={4}
                            justifyContent="space-between"
                            alignItems="space-between"
                            w="100%"
                          >
                            <Text
                              fontSize="16"
                              lienHeight="24"
                              color="black.500"
                              fontWeight="500"
                              letterSpacing="-0.165"
                            >
                              {menu?.name}
                            </Text>
                            <Badge
                              bg="grey.500"
                              px="6"
                              rounded="full"
                              py="1"
                              _text={{
                                fontSize: 14,
                                lineHeight: 20,
                                color: "black.500",
                                letterSpacing: -0.165,
                                fontWeight: "400",
                                textAlign: "center",
                              }}
                            >
                              {menu?.required !== 1 ? "Optional" : "Required"}
                            </Badge>
                          </HStack>
                          <Text
                            px={4}
                            fontSize="14"
                            lienHeight="20"
                            color="black.500"
                            fontWeight="400"
                            letterSpacing="-0.165"
                          >
                            (Choose up to 1)
                          </Text>
                          {/* <Checkbox.Group
                            accessibilityLabel="choose values"
                            w="100%"
                            onChange={(values) => {
                              console.log("values", values);
                            }}
                          > */}
                          {menu?.items.map((menuItem, index) => {
                            return (
                              <Pressable
                                my={2}
                                key={index}
                                onPress={() =>
                                  console.log("hello item", menuItem?.id)
                                }
                              >
                                <HStack
                                  w="100%"
                                  justifyContent="space-between"
                                  alignItems="space-between"
                                  px={4}
                                  py={2}
                                >
                                  <Checkbox
                                    value={menuItem?.name}
                                    size="md"
                                    _text={{
                                      fontSize: 16,
                                      lineHeight: 24,
                                      color: "black.500",
                                      letterSpacing: -0.165,
                                      fontWeight: "400",
                                    }}
                                  >
                                    {menuItem?.name}
                                  </Checkbox>
                                  <Text>{`${menuItem?.price}.00`}</Text>

                                  {/* <Stack
                                    w="40%"
                                    flexDirection="row"
                                    justifyContent="flex-end"
                                    alignItems="flex-end"
                                  >
                                    <IconButton
                                      p="1.5"
                                      bg="white.500"
                                      borderWidth={1}
                                      borderColor="black.500"
                                      rounded="full"
                                      variant="solid"
                                      _icon={{
                                        as: Feather,
                                        name: "minus",
                                        size: "3",
                                        color: "black.500",
                                      }}
                                    />
                                    <Text
                                      px={2}
                                      fontSize="14"
                                      lienHeight="20"
                                      color="black.100"
                                      fontWeight="500"
                                      letterSpacing="-0.165"
                                    >
                                      1
                                    </Text>

                                    <IconButton
                                      p="1.5"
                                      bg="white.500"
                                      borderWidth={1}
                                      borderColor="black.100"
                                      rounded="full"
                                      variant="solid"
                                      _icon={{
                                        as: Feather,
                                        name: "plus",
                                        size: "3",
                                        color: "black.100",
                                      }}
                                    />
                                  </Stack> */}
                                </HStack>
                              </Pressable>
                            );
                          })}
                        </Center>
                      );
                    })}
                  </VStack>
                ) : null}

                <VStack my={6} w="100%" px={4} justifyContent="flex-start">
                  <Heading
                    fontSize="18"
                    lineHeight="26"
                    fontWeight="700"
                    letterSpacing="-0.165"
                    color="black.500"
                    textAlign="left"
                  >
                    Special requests
                  </Heading>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <FormControl mt={3}>
                      <TextArea
                        placeholder="Add a note for preparation preferences"
                        fontSize="14"
                        lineHeight="20"
                        placeholderTextColor="grey.700"
                        bg="grey.500"
                        height={setHeight(5)}
                        borderColor="grey.500"
                        borderRadius="8px"
                      />
                    </FormControl>
                  </KeyboardAvoidingView>
                </VStack>

                <VStack px={4} w="100%">
                  <Center mt={4}>
                    <HStack justifyContent="flex-start" alignItems="flex-start">
                      <Button
                        onPress={decrementQuantity}
                        _text={{
                          color: "black.500",
                          fontWeight: "500",
                          textTransform: "none",
                          fontSize: "16",
                          lineHeight: "24",
                          letterSpacing: "-0.165",
                        }}
                        bg="grey.500"
                        px={4}
                        py={2.5}
                        borderLeftRadius="100"
                        mr={-1}
                      >
                        -
                      </Button>
                      <Button
                        borderRadius={0}
                        _text={{
                          color: "black.500",
                          fontWeight: "500",
                          textTransform: "none",
                          fontSize: "16",
                          lineHeight: "24",
                          letterSpacing: "-0.165",
                        }}
                        bg="grey.500"
                        px={4}
                        py={2.5}
                        mx={0}
                      >
                        {quantity}
                      </Button>
                      <Button
                        onPress={incrementQuantity}
                        _text={{
                          color: "black.500",
                          fontWeight: "500",
                          textTransform: "none",
                          fontSize: "16",
                          lineHeight: "24",
                          letterSpacing: "-0.165",
                        }}
                        bg="grey.500"
                        px={4}
                        py={2.5}
                        borderRightRadius="100"
                        ml={-1}
                      >
                        +
                      </Button>
                    </HStack>
                  </Center>
                  {menuData?.cart ? (
                    <PatchButtonCartCard
                      cartID={cartItem[0]?.id}
                      restaurantMenuID={menuData?.id}
                      quantity={quantity}
                      onClose={onClose}
                      setShowModal={setShowModal}
                      setMessage={setMessage}
                      setShowAlert={setShowAlert}
                      setAlertStatus={setAlertStatus}
                      subTotal={subTotal}
                    />
                  ) : (
                    <AddButtonCartCard
                      setQuantity={setQuantity}
                      restaurantMenuID={menuData?.id}
                      quantity={quantity}
                      onClose={onClose}
                      setShowModal={setShowModal}
                      setMessage={setMessage}
                      setShowAlert={setShowAlert}
                      setAlertStatus={setAlertStatus}
                      subTotal={subTotal}
                    />
                  )}
                </VStack>
              </ScrollView>
            </Fragment>
          )}
        </Actionsheet.Content>
      </Actionsheet>

      <MenuCartModal
        showModal={showModal}
        title={menuData?.name}
        cart={menuData?.cart}
        setShowModal={true}
      />
      {showAlert ? (
        <ToastAlert
          message={message}
          status={alertStatus}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      ) : null}
    </Fragment>
  );
};

export default MenuDetailsActionSheet;
