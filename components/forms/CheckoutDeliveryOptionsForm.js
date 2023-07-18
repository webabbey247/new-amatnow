import { FormControl, HStack, Text, Radio, Heading, VStack } from "native-base";
const CheckoutDeliveryOptionsForm = ({ delivery }) => {
  return (
    <VStack flex={1}>
      <Heading
        my={2}
        fontSize="18"
        lineHeight="24"
        letterSpacing="-0.165"
        fontWeight="800"
        textAlign="left"
        textTransform="capitalize"
      >
        {delivery ? "Delivery" : "Pick Up"}
      </Heading>
      <FormControl mt={-3}>
        <Radio.Group defaultValue="Instant" name="delivery" value="Instant">
          <HStack justifyContent="space-between" w="100%" my={3}>
            <Text
              mt={1}
              fontSize="14"
              lineHeight="20"
              fontWeight="400"
              letterSpacing="-0.165"
              color="black.500"
            >
              Right now
            </Text>
            <Radio value="Instant" colorScheme="red">
              {""}
            </Radio>
          </HStack>

          {delivery ? (
            <HStack justifyContent="space-between" w="100%" my={3}>
              <Text
                mt={1}
                fontSize="14"
                lineHeight="20"
                fontWeight="400"
                letterSpacing="-0.165"
                color="black.500"
              >
                Schedule delivery
              </Text>
              <Radio value="Schedule" colorScheme="red" isDisabled>
                {""}
              </Radio>
            </HStack>
          ) : null}
        </Radio.Group>
      </FormControl>
    </VStack>
  );
};

export default CheckoutDeliveryOptionsForm;
