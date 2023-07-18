import { Button, Image, VStack, Text, Box } from "native-base";
import { useRouter } from "expo-router";
import icons from "../../constants/icons";

const ConfirmationPage = () => {
  const router = useRouter();
  return (
    <Box
      px={4}
      flex={1}
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <Image
        resizeMode="contain"
        source={icons.SUCCESSICON}
        alt="Success Icon"
        height="70"
        width="70"
      />
      <Text
        mt={3}
        color="black.500"
        fontWeight="500"
        textTransform="none"
        fontSize="16"
        lineHeight="24"
        letterSpacing="-0.17"
      >
        Password successfully reset
      </Text>
      <VStack justifyContent="flex-end" w="300" maxW="100%" mt={5}>
        <Button
          width="100%"
          rounded="full"
          bg="red.500"
          alignSelf="flex-start"
          py="4"
          _text={{
            color: "white.500",
            fontWeight: "500",
            textTransform: "none",
            fontSize: "16",
            lineHeight: "24",
            letterSpacing: "-0.165",
          }}
          onPress={() => router.push("auth/login")}
        >
          Log In
        </Button>
      </VStack>
    </Box>
  );
};

export default ConfirmationPage;
