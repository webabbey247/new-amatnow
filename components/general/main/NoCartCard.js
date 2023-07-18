import { Image, Text, Heading, Center } from "native-base";
import images from "../../../constants/images";
import { setHeight, setWidth } from "../../../utils/helper";

const NoCartCard = () => {
  return (
    <Center flex={1} my={6}>
      <Image
        w={setWidth(80)}
        h={setHeight(30)}
        source={images.NOCARTITEMIMG}
        alt="No Saved Item"
        resizeMode="contain"
      />
      <Heading
        fontSize="18"
        lienHeight="28"
        color="black.500"
        fontWeight="700"
        textAlign="center"
        textTransform="capitalize"
        mt={6}
        letterSpacing="-0.165"
      >
        Your cart is empty
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
        Items added to cart will appear here.
      </Text>
    </Center>
  );
};

export default NoCartCard;
