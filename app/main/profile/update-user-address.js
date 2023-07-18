import { useEffect, useState } from "react";
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
import { useSearchParams } from "expo-router";
import { UpdateAddressForm } from "../../../components/forms";
import { useGetSingleUserAddressQuery } from "../../../redux/general/generalApiSlice";
import { deliveryInstructionTags } from "../../../constants/mock";

const UpdateUserAdressPage = () => {
  const { colorMode } = useColorMode();
  const params = useSearchParams();
  const {
    data: isAddress,
    isLoading,
    isFetching,
  } = useGetSingleUserAddressQuery(params.data);

  console.log("single params", params.data);
  console.log("single address", isAddress);

  return (
    <Box
      px={4}
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        {isLoading || isFetching ? (
          <Spinner color="red.500" size="sm" />
        ) : (
          <UpdateAddressForm isAddressData={isAddress} />
        )}
      </ScrollView>
    </Box>
  );
};

export default UpdateUserAdressPage;
