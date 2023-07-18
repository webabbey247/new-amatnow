import { useState, useRef } from "react";
import {
  FormControl,
  Stack,
  Heading,
  Text,
  VStack,
  TextArea,
  Button,
} from "native-base";
import { setHeight } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { addDeliveryNotes } from "../../redux/cart/cartSlice";

const CheckoutNotesForm = ({
  delivery,
  onClose,
  setMessage,
  setShowAlert,
  setAlertStatus,
}) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [riderNotes, setRiderNotes] = useState(null);

  const handleDeliveryNotes = () => {
    setLoading(true);
    dispatch(addDeliveryNotes(riderNotes));
    setTimeout(() => {
      onClose(true);
      setMessage("Delivery note added successfully");
      setShowAlert(true);
      setAlertStatus("success");
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <VStack my={2} w="100%" px={4} justifyContent="flex-start">
        <Heading
          fontSize="18"
          lineHeight="26"
          fontWeight="700"
          letterSpacing="-0.165"
          color="black.500"
          textAlign="center"
        >
          {delivery ? "Delivery" : "Pickup"} Instructions
        </Heading>
        <Stack flexDirection="column" my={8}>
          <Text
            fontSize="16"
            lineHeight="24"
            fontWeight="500"
            letterSpacing="-0.165"
            color="black.500"
            textAlign="left"
          >
            {delivery ? "Add a note for your rider" : " Add Notes "}
          </Text>
          <FormControl mt={3}>
            <TextArea
              ref={ref}
              defaultValue={notes}
              onChangeText={(text) => setRiderNotes(text)}
              h={setHeight(15)}
              placeholderTextColor="grey.700"
              placeholder={
                delivery
                  ? "Enter additional instructions for your rider here."
                  : "Enter additional instructions for your pickup here."
              }
              fontSize="14"
              bg="grey.500"
              lineHeight="20"
              fontWeight="400"
              letterSpacing="-0.165"
              color="black.500"
            />
          </FormControl>
        </Stack>
      </VStack>
      <VStack flex={0.2} justifyContent="flex-start" w="100%" py={5}>
        {loading ? (
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
            onPress={handleDeliveryNotes}
          >
            Confirm Delivery Notes
          </Button>
        )}
      </VStack>
    </>
  );
};

export default CheckoutNotesForm;
