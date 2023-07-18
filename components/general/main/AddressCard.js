import { VStack, Radio, Center, Stack, HStack, Text } from "native-base";

const AddressCard = ({ id, alias, street, city, state, zipCode, country }) => {
  const complete_address = [
    street ? street : "null",
    city,
    state,
    country,
    zipCode,
  ].join(", ");
  return (
    <VStack
      key={id}
      py={4}
      w="100%"
      borderRadius={8}
      borderColor="grey.400"
      borderWidth={1}
      my={2}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Center
        py={2}
        bg="grey.500"
        borderRadius={8}
        mb={1}
        px={6}
        mx={3}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Text
          textAlign="center"
          fontSize="14"
          lineHeight="20"
          fontWeight="400"
          color="black.500"
        >
          {alias}
        </Text>
      </Center>
      <HStack justifyContent="space-between" my={1.5} maxW="100%">
        <Text
          mt="1"
          textAlign="left"
          fontSize="14"
          lineHeight="20"
          fontWeight="400"
          color="black.500"
          textTransform="uppercase"
          isTruncated
          noOfLines={2}
          w="85%"
          // flexWrap="nowrap"
          // flex="1"
          mx="3"
        >
          {complete_address}
        </Text>
        <Radio value={id} colorScheme="red" maxW="100%">
          {""}
        </Radio>
      </HStack>
    </VStack>
  );
};

export default AddressCard;
