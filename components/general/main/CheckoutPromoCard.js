import { Fragment } from "react";
import {
  IconButton,
  Stack,
  Image,
  Heading,
  Divider,
  HStack,
} from "native-base";
import icons from "../../../constants/icons";
import { Feather } from "@expo/vector-icons";
import { setWidth, setHeight } from "../../../utils/helper";
import { useSelector } from "react-redux";

const CheckoutPromoCard = ({ onOpen, setFormType }) => {
  const { discountID } = useSelector((state) => state.cart);
  const handlePromoCode = () => {
    onOpen(true);
    setFormType("promo");
  };
  return (
    <Fragment>
      <HStack my={3} justifyContent="space-between" alignItems="space-between">
        <Stack flexDirection="row">
          <Image
            source={icons.VOUCHERICON}
            alt="Delivery address"
            w={setWidth(8)}
            h={setHeight(4)}
          />
          <Heading
            mt={1}
            ml={3}
            textAlign="center"
            fontSize="14"
            lineHeight="20"
            fontWeight="400"
            color="black.500"
          >
            Promo Code
          </Heading>
        </Stack>
        <IconButton
          onPress={handlePromoCode}
          p="1.5"
          bg={discountID ? "green.500" : "white.500"}
          borderWidth={1}
          borderColor={discountID ? "green.500" : "grey.700"}
          rounded="full"
          variant="solid"
          _icon={{
            as: Feather,
            name: discountID ? "check" : "plus",
            size: "5",
            color: discountID ? "white.500" : "grey.700",
            textAlign: "center",
          }}
        />
      </HStack>
      <Divider my={1.5} bg="grey.500" py={0.3} />
    </Fragment>
  );
};

export default CheckoutPromoCard;
