import {
  Stack,
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  Radio,
  FormControl,
} from "native-base";
import icons from "../../constants/icons";
import { setHeight, setWidth } from "../../utils/helper";

const CheckoutPaymentOptionsForm = ({
  paymentOption,
  setPaymentOption,
  delivery,
}) => {
  return (
    <VStack my={4}>
      <Heading
        fontSize="18"
        lineHeight="24"
        letterSpacing="-0.165"
        fontWeight="800"
        textAlign="left"
        textTransform="capitalize"
      >
        Payment method
      </Heading>

      <FormControl>
        <Radio.Group
          defaultValue="2"
          name="paymentDetails"
          my={3}
          value={paymentOption}
          onChange={(payment) => {
            setPaymentOption(payment);
          }}
        >
          <HStack justifyContent="space-between" w="100%" my={3}>
            <Stack flexDirection="row">
              <Image
                source={icons.WALLETICON}
                alt="Amat wallet"
                w={setWidth(8)}
                h={setHeight(4)}
              />
              <Text
                mt={1}
                ml={3}
                textAlign="center"
                fontSize="14"
                lineHeight="20"
                fontWeight="400"
                color="black.500"
              >
                Amat wallet - N0.00
              </Text>
            </Stack>
            <Radio value="WALLET" colorScheme="red" isDisabled>
              {""}
            </Radio>
          </HStack>

          <HStack justifyContent="space-between" w="100%" my={3}>
            <Stack flexDirection="row">
              <Image
                source={icons.PAYONLINEICON}
                alt="Delivery address"
                w={setWidth(8)}
                h={setHeight(4)}
              />
              <Text
                mt={1}
                ml={3}
                textAlign="center"
                fontSize="14"
                lineHeight="20"
                fontWeight="400"
                color="black.500"
              >
                Pay online
              </Text>
            </Stack>
            <Radio value="PAYMENT_ONLINE" colorScheme="red">
              {""}
            </Radio>
          </HStack>

          {delivery ? (
            <HStack justifyContent="space-between" w="100%" my={3}>
              <Stack flexDirection="row">
                <Image
                  source={icons.PAYONDELIVERYICON}
                  alt="Pay on delivery"
                  w={setWidth(8)}
                  h={setHeight(4)}
                />
                <Text
                  mt={1}
                  ml={3}
                  textAlign="center"
                  fontSize="14"
                  lineHeight="20"
                  fontWeight="400"
                  color="black.500"
                >
                  Pay on delivery
                </Text>
              </Stack>
              <Radio value="PAYMENT_ON_DELIVERY" colorScheme="red">
                {""}
              </Radio>
            </HStack>
          ) : null}

          <HStack justifyContent="space-between" w="100%" my={3}>
            <Stack flexDirection="row">
              <Image
                source={icons.CREDITCARDICON}
                alt="Pay with saved card"
                w={setWidth(8)}
                h={setHeight(4)}
              />
              <Text
                mt={1}
                ml={3}
                textAlign="center"
                fontSize="14"
                lineHeight="20"
                fontWeight="400"
                color="black.500"
              >
                Pay with saved card
              </Text>
            </Stack>
            <Radio value="CARD" colorScheme="red" isDisabled>
              {""}
            </Radio>
          </HStack>
        </Radio.Group>
      </FormControl>
    </VStack>
  );
};

export default CheckoutPaymentOptionsForm;
