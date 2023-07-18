import { Pressable, HStack, Text, Divider } from "native-base";

const CountryCodeCard = ({ item, setSelectedAreaCode, setShowModal }) => {
  return (
    <Pressable
      id={item.id}
      px={2}
      mx={0}
      onPress={() => {
        setSelectedAreaCode(item);
        setShowModal(false);
      }}
    >
      <HStack justifyContent="space-between" py={3} px={0} mx={0}>
        <Text
          fontSize="14px"
          lineHeight="20px"
          color="black.500"
          letterSpacing="0.165"
          fontWeight="400"
          ml={2}
        >
          {item.name}
        </Text>
        <Text
          fontSize="14"
          lineHeight="20"
          fontWeight="400"
          color="black.500"
          letterSpacing="0.165"
        >
          {item.phone_code}
        </Text>
      </HStack>
      <Divider color="grey.500" />
    </Pressable>
  );
};
export default CountryCodeCard;
