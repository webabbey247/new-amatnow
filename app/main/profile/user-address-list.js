import { useEffect } from "react";
import { Platform } from "react-native";
import {
  ScrollView,
  useColorMode,
  Text,
  Center,
  Box,
  Icon,
  VStack,
  Heading,
  HStack,
  Image,
  Pressable,
  Button,
  Spinner,
} from "native-base";
import { setHeight, setWidth } from "../../../utils/helper";
import { UserAddressList } from "../../../components/sliders";
import { useGetAllUserAddressQuery } from "../../../redux/general/generalApiSlice";
import { useRouter } from "expo-router";

const UserAdressListPage = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  // All saved user addresses
  const {
    data: isUserAddressData,
    isFetching,
    isLoading,
  } = useGetAllUserAddressQuery();
  // console.log("hello adfdress", isAddressData);

  useEffect(() => {}, [isUserAddressData]);
  return (
    <Box
      flex={1}
      px={4}
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      py={4}
    >
      <Button
        borderRadius="100"
        my={Platform === "ios" ? 3 : 2}
        w={setWidth(42)}
        bg="grey.500"
        py={Platform === "ios" ? 4 : 3}
        _text={{
          fontSize: 14,
          lineHeight: 20,
          letterSpacing: -0.165,
          fontWeight: 400,
          color: "red.500",
        }}
        colorScheme="primary"
        onPress={() => {
          router.push("main/profile/add-user-address/?title='newAddress'");
        }}
      >
        + Add new address
      </Button>

      {isLoading || isFetching ? (
        <Center flex={1}>
          <Spinner color="red.500" size="lg" />
        </Center>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <UserAddressList isAddressData={isUserAddressData?.data} />
        </ScrollView>
      )}
    </Box>
  );
};

export default UserAdressListPage;
