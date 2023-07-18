import {
  Box,
  useColorMode,
  VStack,
  HStack,
  Center,
  Button,
  ScrollView,
  Badge,
  Pressable,
  Link,
} from "native-base";
import { useRouter } from "expo-router";
import { setWidth, setHeight } from "../utils/helper";
import { WelcomeSlider } from "../components/sliders";

const WelcomePage = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  return (
    <Box
      h="100%"
      maxWidth="960"
      px={4}
      maxHeight="100%"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
      /> */}

      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        backgroundColor={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <Center flex={1} my={4}>
          <VStack
            bg={colorMode === "dark" ? "white.500" : "white.500"}
            justifyContent="flex-end"
            w="300"
            maxW="100%"
          >
            <HStack justifyContent="flex-end" alignItems="flex-end">
              <Pressable onPress={() => console.log("hello Guest")}>
                <Badge
                  w={setWidth(25)}
                  h={setHeight(5)}
                  rounded="full"
                  _text={{
                    textTransform: "capitalize",
                    fontSize: "14",
                    lineHeight: "22",
                    fontWeight: "500",
                    color: "red.500",
                  }}
                >
                  Guest
                </Badge>
              </Pressable>
            </HStack>
            <WelcomeSlider />
          </VStack>
        </Center>

        <VStack flex={1} justifyContent="center" w="100%" my={4}>
          <Button
            width="100%"
            rounded="full"
            bg="red.500"
            py="4"
            _text={{
              color: "white.500",
              fontWeight: "500",
              textTransform: "none",
              fontSize: "16",
              lineHeight: "24",
              letterSpacing: "-0.165",
              textAlign: "center",
            }}
            onPress={() => router.push("auth/register")}
          >
            Create My Account
          </Button>

          <Button
            width="100%"
            rounded="full"
            bg="grey.500"
            mt="3"
            py="4"
            _text={{
              color: "red.500",
              fontWeight: "500",
              textTransform: "capitalize",
              fontSize: "16",
              lineHeight: "24",
              letterSpacing: "0.165",
            }}
            onPress={() => router.push("auth/login")}
          >
            Log In
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default WelcomePage;
