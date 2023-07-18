import { Center, Text, HStack, Image, Button } from "native-base";
import { setHeight } from "../../../utils/helper";
import images from "../../../constants/images";

const ProfileAdsCard = () => {
  return (
    <Center justifyContent="flex-start" alignItems="flex-start">
      <HStack justifyContent="flex-start" w="100%" mt={2}>
        <Center
          justifyContent="flex-start"
          alignItems="flex-start"
          py={4}
          px={3}
          bg="green.300"
          w="70%"
          borderLeftRadius={8}
        >
          <Text
            fontSize="14"
            lineHeight="20"
            letterSpacing="0.165"
            textAling="center"
            fontWeight="500"
            color="white.500"
            w="80%"
            mb={2}
          >
            $0 Delivery fee + up to 10% off when you use Amat prime.
          </Text>
          <Button mt={2} p="3" w="70%" rounded={"full"} bg="green.800">
            Try one month free
          </Button>
        </Center>
        <Center w="30%">
          <Image
            source={images.ADSIMG4}
            alt="Active Promotions"
            resizeMode="cover"
            w="100%"
            h={setHeight(20)}
            borderRightRadius="8"
          />
        </Center>
      </HStack>
    </Center>
  );
};

export default ProfileAdsCard;
