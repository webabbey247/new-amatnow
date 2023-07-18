import {
  Center,
  Box,
  useColorMode,
  ScrollView,
  Image,
  VStack,
  Text,
  Heading,
} from "native-base";
import images from "../../constants/images";
import { setHeight, setWidth } from "../../utils/helper";
import { OTPForm } from "../../components/forms";
import { useSearchParams } from "expo-router";

const OTPPage = () => {
  const params = useSearchParams();
  // console.log("hello prams", params.phone)
  console.log("hello title", params.title);
  const phone = params.phone;
  const { colorMode } = useColorMode();

  return (
    <Box
      flex={1}
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        px={4}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <Center flex={1}>
          <VStack justifyContent="center" w="100%" maxW="300" mt="10" mb="5">
            <Image
              resizeMode="cover"
              source={images.TWOFACTORAUTHIMG}
              alt="OTP"
              height={setHeight(30)}
              width={setWidth(80)}
            />
            <Heading
              letterSpacing="0.165"
              fontWeight="500"
              textAlign="center"
              mt={4}
            >
              Verify your phone number
            </Heading>
            <Text
              py={2}
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              color="grey.700"
              fontWeight="400"
              textAlign="center"
            >
              A special code has been sent to {phone ? phone : null}, enter code
              below to proceed
            </Text>
          </VStack>
        </Center>
        <OTPForm mobileNumber={phone} title={params.title} />
      </ScrollView>
    </Box>
  );
};

export default OTPPage;
