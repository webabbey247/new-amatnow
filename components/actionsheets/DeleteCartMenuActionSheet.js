import { useEffect } from "react";
import { Heading, Actionsheet, Text, Button, VStack } from "native-base";
import { useDispatch } from "react-redux";
import { setHeight } from "../../utils/helper";
import { removeCartItem } from "../../redux/cart/cartSlice";
import { useDeleteCartMenuItemMutation } from "../../redux/cart/cartApiSlice";

const DeleteCartMenuActionSheet = ({
  isOpen,
  onClose,
  cartID,
  setMessage,
  setShowAlert,
  setAlertStatus,
}) => {
  const dispatch = useDispatch();

  const [
    deleteCartMenuItem,
    { data: isDeleteMenuData, isLoading, isSuccess, isError, error },
  ] = useDeleteCartMenuItemMutation();

  const handleDeleteMenuCartItem = async () => {
    try {
      const deleteMenuItem = await deleteCartMenuItem(cartID);
      return deleteMenuItem;
    } catch (err) {
      console.log("error response", err);
    }
  };

  useEffect(() => {
    if (isError) {
      // console.log('error data', error.data.message || error.message);
      setMessage(error.data.message || error.message);
      setShowAlert(true);
      onClose(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      setMessage(isDeleteMenuData?.message);
      setShowAlert(true);
      onClose(true);
      setAlertStatus("success");
      dispatch(removeCartItem(cartID));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteMenuData, isError, isSuccess, error]);
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content
        py={3}
        px={0}
        m={0}
        bg="white.500"
        h={setHeight(35)}
        maxHeight="100%"
      >
        <VStack flex={1} w="100%" bg="white.500" mt={2} px={4}>
          <Heading
            fontSize="20"
            lineHeight="28"
            fontWeight="700"
            letterSpacing="-0.165"
            color="black.500"
            textAlign="left"
          >
            Delete Item?
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
            Do you want to remove this item from your cart?
          </Text>
        </VStack>

        <VStack my={4} w="100%" px={4} justifyContent="flex-start">
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
                color: "white.500",
              }}
              isLoadingText="Please wait"
            >
              Verify
            </Button>
          ) : (
            <Button
              onPress={handleDeleteMenuCartItem}
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
              Delete Item
            </Button>
          )}
          <Button
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
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default DeleteCartMenuActionSheet;
