import {
  Pressable,
  Center,
  Icon,
  HStack,
  Text,
  IconButton,
  useColorMode,
  useDisclose,
} from "native-base";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const SearchHeader = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclose();
  const { locationAddress,
    userAddressStatus,
    userAddress } = useSelector((state) => state.general);
  return (
    <HStack
      alignItems="center"
      justifyContent="flex-start"
      py={2}
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      w="100%"
    >
      <Center w="20%" justifyContent="flex-start" alignItems="flex-start">
        <IconButton
          onPress={() => router.back()}
          p="2"
          bg="white.500"
          rounded="full"
          shadow={2}
          variant="solid"
          _icon={{
            as: Feather,
            name: "arrow-left",
            size: "5",
            color: "black.500",
          }}
        />
      </Center>
      <Pressable
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        onPress={onOpen}
        w="70%"
      >
        <Text
          isTruncated
          noOfLines={1}
          color="black.500"
          marginLeft="4"
          fontSize="16"
          lineHeight="26"
          letterSpacing="0.165"
          fontWeight="500"
        >
          {/* Search */}
          {userAddressStatus ? userAddress : locationAddress}
        </Text>
        <Icon
          as={Feather}
          name="chevron-down"
          color="black.500"
          ml="1"
          mt={1.5}
        />
      </Pressable>
    </HStack>
  );
};

export default SearchHeader;
