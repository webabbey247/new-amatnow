import { useEffect } from "react";
import { Heading, Actionsheet, Text, Button, VStack } from "native-base";
import { setHeight } from "../../utils/helper";
import { useDeleteUserAddressMutation } from "../../redux/general/generalApiSlice";

const DeleteAddressActionSheet = ({
  isOpen,
  onClose,
  setShowDeleteAS,
  addressID,
  setMessage,
  setShowAlert,
  setAlertStatus,
}) => {
  // console.log("addressID response", addressID);
    const [
      deleteUserAddress,
      { data: isAddressData, isLoading, isSuccess, isError, error },
    ] = useDeleteUserAddressMutation();

    const handleDeleteMenuCartItem = async () => {
      try {
        const deleteAddress = await deleteUserAddress(addressID);
        return deleteAddress;
      } catch (err) {
        console.log("error response", err);
      }
    };

    useEffect(() => {
      if (isError) {
        // console.log('error data', error.data.message || error.message);
        setMessage(error.data.message || error.message);
        setShowAlert(true);
        setShowDeleteAS(false);
        setAlertStatus("error");
      }
      if (isSuccess) {
        console.log('success data', isAddressData.message);
        setMessage(isAddressData?.message);
        setShowAlert(true);
        setShowDeleteAS(false);
        setAlertStatus("success");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAddressData, isError, isSuccess, error]);
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
            Delete Address?
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
            Do you want to delete this address?
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
            />
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
              Delete Address
            </Button>
          )}
          <Button
           onPress={onClose()}
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

export default DeleteAddressActionSheet;
