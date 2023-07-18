import { Text, HStack, Pressable, useColorMode, VStack } from "native-base";
import { setWidth } from "../../utils/helper";
import { useRouter } from "expo-router";

const AuthToggle = ({ auth }) => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const handleLoginTab = () => {
    router.push("/auth/login");
  };

  const handleRegisterTab = () => {
    router.push("/auth/register");
  };
  return (
    <VStack bg={colorMode === "dark" ? "black.500" : "white.500"} py={2}>
      <HStack
        py="1.5"
        bg="grey.500"
        justifyContent="space-around"
        borderRadius="50"
        w="100%"
      >
        <Pressable
          onPress={() => handleRegisterTab()}
          shadow={!auth ? "1" : ""}
          bg={!auth ? "white.500" : "grey.500"}
          py="2"
          borderRadius="50"
          borderColor={!auth ? "white.500" : "grey.500"}
          w={setWidth(40)}
        >
          <Text
            textAlign="center"
            fontSize="16px"
            lineHeight="20px"
            letterSpacing="0.165"
            color={!auth ? "red.500" : "grey.700"}
          >
            Create account
          </Text>
        </Pressable>

        <Pressable
          onPress={() => handleLoginTab()}
          bg={auth ? "white.500" : "grey.500"}
          py="2"
          shadow={auth ? "1" : ""}
          borderRadius="50"
          borderColor={auth ? "white.500" : "grey.500"}
          w={setWidth(40)}
        >
          <Text
            textAlign="center"
            fontSize="16px"
            lineHeight="20px"
            letterSpacing="0.165"
            color={auth ? "red.500" : "grey.700"}
          >
            Log In
          </Text>
        </Pressable>
      </HStack>
    </VStack>
  );
};

export default AuthToggle;
