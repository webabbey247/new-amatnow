import { Center, Image, Heading, Text } from "native-base";
import images from "../../../constants/images";
import { setWidth, setHeight } from "../../../utils/helper";

const LocationStatusCard = () => {
  return (
    <Center flex="1">
      <Image
        w={setWidth(70)}
        h={setHeight(30)}
        source={images.NOINTERNETIMG}
        alt="No permisson"
        resizeMode="contain"
      />
      <Heading
        fontSize="18"
        lienHeight="28"
        color="black.500"
        fontWeight="700"
        textAlign="center"
        mt="4"
        letterSpacing="-0.165"
      >
        Unable to access location
      </Heading>
      <Text
        fontSize="14"
        lienHeight="20"
        color="black.500"
        fontWeight="400"
        textAlign="center"
        letterSpacing="-0.165"
        w="80%"
      >
        For better experience, please enable geolocation via settings
      </Text>
    </Center>
  );
};

export default LocationStatusCard;
