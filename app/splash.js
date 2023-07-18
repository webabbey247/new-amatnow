import { Fragment, useEffect, useState } from "react";
import { Box, Center, Image, Spinner, useColorMode } from "native-base";
import { useRouter } from "expo-router";
import images from "../constants/images";
import { firstTimeUser, setFirstTimeUser } from "../utils/storage";
import { useSession } from "../hooks";
import CheckNetwork from "../hooks/useNetworkConnection";

export default function SplashPage() {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  // const [hasLaunched, setHasLaunched] = useState(false);
  const { isToken } = useSession();

  const verifyEntry = async () => {
    const hasLaunched = await firstTimeUser();
    if (hasLaunched || hasLaunched !== "" || hasLaunched !== null) {
      router.push("auth/login");
    } else {
      router.push("welcome");
      setFirstTimeUser("true");
    }
    if (isToken || isToken !== "" || isToken !== null) {
      router.push("main/(tabs)/market");
    } else {
      router.push("auth/login");
    }
  };

  console.log("hello auth token", isToken);

  useEffect(() => {
    verifyEntry();
  });
  return (
    <Box
      h="100%"
      maxHeight="100%"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      {isConnected ? (
        <Fragment>
          <Center
            flex={1}
            justifyContent="center"
            alignItems="center"
            bg="white.500"
          >
            <Image
              source={images.AMATLOGO}
              alt="AmatNow Logo"
              height="50"
              width="130"
            />
          </Center>

          <Center
            flex={0.1}
            justifyContent="center"
            alignItems="center"
            bg="white.500"
          >
            <Spinner color="red.500" size="sm" />
          </Center>
        </Fragment>
      ) : (
        <CheckNetwork setIsConnected={setIsConnected} />
      )}
    </Box>
  );
}
