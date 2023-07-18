import { Box, Pressable, Image, Text, Stack, VStack } from "native-base";
import images from "../../../constants/images";
import { setWidth, setHeight } from "../../../utils/helper";

const PromotionsCard = () => {
  return (
    <Box my="6" space="4">
      <Pressable my="3" onPress={() => console.log("Promotions")}>
        <Image
          h={setHeight(20)}
          borderRadius="8"
          w="100%"
          maxW="100%"
          source={images.ADSIMG}
          resizeMode="cover"
          alt="Use code VITAL2746 for 10% off all orders"
        />
      </Pressable>
      <VStack justifyContent="space-between" py={2} bg="white.500">
        <Stack direction="row" space="3">
          <Text
            fontSize="14"
            lineHeight="22"
            fontWeight="500"
            color="red.500"
            letterSpacing="-0.165"
          >
            Vztal
          </Text>
          <Text
            fontSize="14"
            lineHeight="22"
            fontWeight="400"
            color="black.500"
            letterSpacing="-0.165"
          >
            10 - 18 December
          </Text>
        </Stack>
        <Text
          fontSize="12"
          lineHeight="20"
          fontWeight="400"
          color="grey.700"
          letterSpacing="-0.165"
        >
          Use code <Text color="black.500">VITAL2746</Text> for 10% off all
          orders
        </Text>
      </VStack>
    </Box>
  );
};

export default PromotionsCard;
