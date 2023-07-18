import { IconButton, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Platform } from "react-native";

const CustomHeader = () => {
  const router = useRouter();
  return (
    <VStack bg="white.500" justifyContent="flex-start" alignItems="flex-start" px="4" my="2">
      <IconButton
      
        onPress={() => router.back()}
        p={Platform.OS === "ios" ? "3" : "2"}
        bg="white.500"
        rounded="full"
        shadow={1}
        variant="solid"
        _icon={{
          as: Feather,
          name: "x",
          size: "5",
          color: "black.500",
        }}
      />
    </VStack>
  );
};

export default CustomHeader;
