import { Center, Image, Heading, Text } from "native-base";
import images from "../../../constants/images";
import { setWidth, setHeight } from "../../../utils/helper";

const NoOrderHistoryCard = () => {
  return (
    <Center flex="1" mb={3}>
      <Image
      
        w={setWidth(70)}
        h={setHeight(30)}
        source={images.NOORDERHISTORYIMG}
        alt="No Saved Item"
        resizeMode="contain"
      />
      <Heading
        fontSize="18"
        lienHeight="28"
        color="black.500"
        fontWeight="700"
        textAlign="center"
        mt={4}
        letterSpacing="-0.165"
        textTransform="capitalize"
      >
       No order history yet
      </Heading>
      <Text
        fontSize="14"
        lienHeight="20"
        color="black.500"
        fontWeight="400"
        textAlign="center"
        px={12}
        letterSpacing="-0.165"
      >
       Your orders will appeare here.
      </Text>
    </Center>
  );
};

export default NoOrderHistoryCard;
