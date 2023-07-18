import { Fragment } from "react";
import {
  IconButton,
  Stack,
  Image,
  Heading,
  Divider,
  VStack,
  HStack,
  Text,
  Badge,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import icons from "../../../constants/icons";
import { setWidth, setHeight } from "../../../utils/helper";

const CheckoutDeliveryInstructionsCard = ({ onOpen, setFormType }) => {
  const { notes } = useSelector((state) => state.cart);

  const handleDeliveryNotes = () => {
    onOpen(true);
    setFormType("notes");
  };
  return (
    <Fragment>
      <VStack my={3}>
        <HStack justifyContent="space-between" alignItems="space-between">
          <Stack flexDirection="row">
            <Image
              source={icons.CHATICON}
              alt="Delivery address"
              w={setWidth(8)}
              h={setHeight(4)}
            />
            <Heading
              mt={1}
              ml={4}
              textAlign="center"
              fontSize="14"
              lineHeight="20"
              fontWeight="400"
              color="black.500"
            >
              Delivery Instructions
            </Heading>
          </Stack>

          <IconButton
            onPress={handleDeliveryNotes}
            p="1.5"
            bg={notes ? "green.500" : "white.500"}
            borderWidth={1}
            borderColor={notes ? "green.500" : "grey.700"}
            rounded="full"
            variant="solid"
            _icon={{
              as: Feather,
              name: notes ? "check" : "plus",
              size: "5",
              color: notes ? "white.500" : "grey.700",
              textAlign: "center",
            }}
          />
        </HStack>
        {notes ? (
          <Text
            ml={12}
            textAlign="left"
            fontSize="12"
            lineHeight="20"
            fontWeight="400"
            color="grey.700"
          >
            {notes}
          </Text>
        ) : (
          <Badge
            ml={8}
            w={setWidth(40)}
            mt={2}
            py={1}
            bg="red.100"
            borderRadius="8"
            _text={{
              fontSize: "12",
              fontWeight: "400",
              letterSpacing: "-0.165",
              lineHeight: "20",
              color: "red.500",
            }}
          >
            Add Notes (Optional)
          </Badge>
        )}
      </VStack>
      <Divider my={1.5} bg="grey.500" py={0.3} />
    </Fragment>
  );
};

export default CheckoutDeliveryInstructionsCard;
