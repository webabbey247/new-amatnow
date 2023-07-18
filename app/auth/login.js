import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Center,
  useColorMode,
  ScrollView,
  Image,
  Text,
  Pressable,
} from "native-base";
import { AuthToggle } from "../../components/toggles";
// import icons from "../../constants/icons";
import { LoginForm } from "../../components/forms";
import CheckNetwork from "../../hooks/useNetworkConnection";
import { LoginOptionsCard } from "../../components/general";

const LoginPage = () => {
  const { colorMode } = useColorMode();
  const [isConnected, setIsConnected] = useState(false);

  return (
    <Box
      flex={1}
      h="100%"
      px={4}
      maxHeight="100%"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      {isConnected ? (
        <Fragment>
          <AuthToggle auth={true} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            bg={colorMode === "dark" ? "black.500" : "white.500"}
          >
            <LoginForm />
            <LoginOptionsCard />
          </ScrollView>
        </Fragment>
      ) : (
        <CheckNetwork setIsConnected={setIsConnected} />
      )}
    </Box>
  );
};

export default LoginPage;
