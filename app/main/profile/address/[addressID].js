import { ScrollView, useColorMode, Box, Spinner, Center } from "native-base";
import { useSearchParams } from "expo-router";
import { UpdateAddressForm } from "../../../../components/forms";
import { DynamicHeader } from "../../../../components/headings";
import {
  useGetSingleUserAddressQuery,
  useGetCountryListQuery,
} from "../../../../redux/general/generalApiSlice";

const UserAddressInfoPage = () => {
  const { colorMode } = useColorMode();
  const params = useSearchParams();
  const {
    data: isAddressData,
    isLoading,
    isFetching,
  } = useGetSingleUserAddressQuery(params.addressID);

  const {
    data: isCountryList,
    isLoading: isCountryLoading,
    isFetching: isCountryFetching,
  } = useGetCountryListQuery();

  return (
    <Box
      px={4}
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <DynamicHeader title="Update Address" icon="close" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        {isLoading || isFetching || isCountryLoading || isCountryFetching ? (
          <Center flex={1}>
            <Spinner color="red.500" size="sm" />
          </Center>
        ) : (
          <UpdateAddressForm
            isCountryData={isCountryList}
            isAddressData={isAddressData}
          />
        )}
      </ScrollView>
    </Box>
  );
};

export default UserAddressInfoPage;
