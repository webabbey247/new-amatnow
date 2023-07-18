import { useState } from "react";
import {
  Box,
  View,
  Center,
  useColorMode,
  ScrollView,
  Image,
  Text,
  Pressable,
} from "native-base";
import { AuthToggle } from "../../components/toggles";
import { RegisterForm } from "../../components/forms";
// import icons from "../../constants/icons";
import { LoginOptionsCard } from "../../components/general";

const RegisterPage = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      flex={1}
      h="100%"
      px={4}
      maxHeight="100%"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <AuthToggle auth={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <RegisterForm />

        <LoginOptionsCard />

        {/* <Center flex={1} my={4}>
          <Text
            color="grey.700"
            fontSize="16"
            lineHeight="24"
            letterSpacing="-0.17"
            borderBottomColor="grey.700"
            borderBottomWidth="1"
            fontWeight="400"
          >
            or
          </Text>

          <Pressable
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            w="100%"
            rounded="full"
            bg="grey.500"
            mt="4"
            p="4"
          >
            <Image
              mr={5}
              h="8"
              w="8"
              source={icons.GOOGLEICON}
              alt="Continue With Google"
            />
            <Text
              mt={0.5}
              fontWeight="500"
              color="black.500"
              fontSize="14"
              lineHeight="22"
              letterSpacing="-0.165"
            >
              Continue With Google
            </Text>
          </Pressable>

          <Pressable
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            w="100%"
            rounded="full"
            bg="grey.500"
            mt="3"
            p="4"
          >
            <Image
              mr={5}
              h="7"
              w="7"
              source={icons.APPLEICON}
              alt="Continue With Apple"
            />
            <Text
              mt={0.5}
              fontWeight="500"
              color="black.500"
              fontSize="14"
              lineHeight="22"
              letterSpacing="-0.165"
            >
              Continue With Apple
            </Text>
          </Pressable>
        </Center> */}
      </ScrollView>
    </Box>
  );
};

export default RegisterPage;
