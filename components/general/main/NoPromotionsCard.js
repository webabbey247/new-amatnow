import { Center, Image, Heading, Text } from "native-base";
import images from "../../../constants/images";
import { setWidth, setHeight } from "../../../utils/helper";

const NoPromotionsCard = () => {
  return (
    <Center flex="1" mb="3">
      <Image
        w={setWidth(70)}
        h={setHeight(30)}
        source={images.NOPROMOTIONSIMG}
        alt="No Promotions"
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
        No promotions yet
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
        Check back later.
      </Text>
    </Center>
  );
};

export default NoPromotionsCard;
