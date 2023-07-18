import { IconButton, VStack } from "native-base";
import Feather from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import { Platform } from "react-native";

const HeaderBackNav = ({ dimension, iconType }) => {
  const router = useRouter();
  return (
    <VStack bg="white.500">
      <IconButton
        onPress={() => router.back()}
        p={Platform.OS === "ios" ? "3" : "2"}
        bg="white.500"
        rounded="full"
        shadow={1}
        variant="solid"
        _icon={{
          as: Feather,
          name: iconType === "close" ? "x" : "arrow-left",
          size: "5",
          color: "black.500",
        }}
      />
    </VStack>
  );
};

export default HeaderBackNav;
