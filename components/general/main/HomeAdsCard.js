import { HStack, Center, Box, Button, Text, Image, Stack } from "native-base";
import images from "../../../constants/images";
import { setWidth, setHeight } from "../../../utils/helper";

const HomeAdsCard = ({ title, subTitle, image, id, bgColor, btnColor }) => {
  return (
    <Center
      justifyContent="flex-start"
      bg={
        bgColor === "DEFAULT_RED"
          ? "red.600"
          : bgColor === "DEFAULT_GREEN"
          ? "green.400"
          : "pink.400"
      }
      borderRadius="8"
      mr={4}
      key={id}
      id={id}
    >
      <HStack
        py={2}
        justifyContent="flex-start"
        w={setWidth(80)}
        h={setHeight(20)}
      >
        <Stack w="70%" py={2.5} px={2.5}>
          <Text
            fontSize="16"
            lineHeight="20"
            fontWeight="500"
            color="white.500"
            letterSpacing="-0.165"
          >
            {title}
          </Text>
          <Text
            fontSize="12"
            lineHeight="20"
            fontWeight="400"
            color="white.500"
            letterSpacing="-0.165"
            py={1}
          >
            {subTitle}
          </Text>
          <Button
            mt={2}
            p="2"
            w="50%"
            borderRadius="100"
            bg={
              btnColor === "DEFAULT_RED_2"
                ? "red.700"
                : btnColor === "DEFAULT_GREEN_2"
                ? "green.600"
                : "pink.500"
            }
          >
            Order Now
          </Button>
        </Stack>
        <Box w="30%" mt={-2}>
          <Image
            source={images[image]}
            alt={title}
            resizeMode="cover"
            w="100%"
            h={setHeight(20)}
            borderRightRadius="8"
          />
        </Box>
      </HStack>
    </Center>
  );
};

export default HomeAdsCard;
