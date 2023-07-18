import { Fragment } from "react";
import {
  IconButton,
  Stack,
  Image,
  Heading,
  Divider,
  HStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import icons from "../../../constants/icons";
import { setWidth, setHeight } from "../../../utils/helper";
import { useSelector } from "react-redux";

const CheckoutRiderTipsCard = ({ setFormType, onOpen }) => {
  const { riderTips } = useSelector((state) => state.cart);
  const handleRiderTips = () => {
    setFormType("tips");
    onOpen(true);
  };
  return (
    <Fragment>
      <HStack my={3} justifyContent="space-between" alignItems="space-between">
        <Stack flexDirection="row">
          <Image
            source={icons.BECOMERIDER}
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
            Rider's Tip
          </Heading>
        </Stack>
        <IconButton
          onPress={handleRiderTips}
          p="1.5"
          bg={riderTips ? "green.500" : "white.500"}
          borderWidth={1}
          borderColor={riderTips ? "green.500" : "grey.700"}
          rounded="full"
          variant="solid"
          _icon={{
            as: Feather,
            name: riderTips ? "check" : "plus",
            size: "5",
            color: riderTips ? "white.500" : "grey.700",
            textAlign: "center",
          }}
        />
      </HStack>
      <Divider my={1.5} bg="grey.500" py={0.3} />
    </Fragment>
  );
};

export default CheckoutRiderTipsCard;
