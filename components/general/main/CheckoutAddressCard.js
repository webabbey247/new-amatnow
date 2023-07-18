import { Fragment } from "react";
import {
  Stack,
  Image,
  Heading,
  Divider,
  HStack,
  Badge,
  Pressable,
  Button,
} from "native-base";
import icons from "../../../constants/icons";
import { setWidth, setHeight } from "../../../utils/helper";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

const CheckoutAddressCard = ({
  restuarantID,
  locationAddress,
  userAddressStatus,
  userAddress,
}) => {
  // const { userAddress, userAddressStatus, locationAddress } = useSelector((state) => state.general);
  const router = useRouter();
  return (
    <Fragment>
      <HStack my={3} justifyContent="flex-start" alignItems="flex-start">
        <Image
          source={icons.CLOCKICON}
          alt="Delivery address"
          w={setWidth(8)}
          h={setHeight(4)}
        />
        <Stack flexDirection="column">
          <Heading
            isTruncated
            noOfLines={2}
            ml={3}
            mt={1}
            fontSize="14"
            lineHeight="20"
            fontWeight="400"
            color="black.500"
          >
            {userAddressStatus ? userAddress : locationAddress}
          </Heading>
          <Button
          colorScheme="red.100"
            onPress={() =>
              router.push(
                `main/modals/fullscreen-map/?redirectUrl="${restuarantID}"`
              )
            }
            w={setWidth(30)}
            mt="2"
            py="1"
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
            Change address
          </Button>
          {/* <Pressable
            
          >
            <Badge
              w={setWidth(30)}
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
              Change address
            </Badge> */}
          {/* </Pressable> */}
        </Stack>
      </HStack>
      <Divider my={1.5} bg="grey.500" py={0.3} />
    </Fragment>
  );
};

export default CheckoutAddressCard;
