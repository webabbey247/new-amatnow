import { VStack, Heading, HStack, Center, Text, Image } from "native-base";
import icons from "../../../constants/icons";

const SearchResultCard = ({ searchTerm }) => {
  return (
    <VStack py={3}>
      <Heading
        fontSize="16"
        lineHeight="24"
        letterSpacing="-0.165"
        textAling="center"
        fontWeight="500"
        textTransform="none"
        my={2}
        color="black.500"
      >
        Recent Searches
      </Heading>
      <HStack mt={3}>
        <Center bg="grey.500" rounded="full" p={2}>
          <Image
            size="6"
            source={icons.CLOCKICON}
            alt="Food"
            resizeMode="contain"
          />
        </Center>
        <Text
          ml={4}
          fontSize="14"
          lineHeight="20"
          letterSpacing="0.165"
          textAling="center"
          fontWeight="500"
          textTransform="none"
          mt={2}
          color="black.500"
        >
          Rice and egg sauce
        </Text>
      </HStack>
    </VStack>
  );
};

export default SearchResultCard;
