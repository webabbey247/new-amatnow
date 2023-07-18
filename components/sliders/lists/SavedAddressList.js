import { useEffect, useState } from "react";
import {
  Box,
  FlatList,
  useColorMode,
  Center,
  VStack,
  Text,
  Radio,
  Spinner,
} from "native-base";
import { AddressCard } from "../../general";
import { useSetUserAddressMutation } from "../../../redux/general/generalApiSlice";
import {
  setLocationAddress,
  setCoordinate,
  setUserAddressInfo,
  setLocationStatus,
} from "../../../redux/general/generalSlice";
import { useDispatch } from "react-redux";

const SavedAddressList = ({
  setMessage,
  setShowAlert,
  setAlertStatus,
  isAddressData,
}) => {
  const dispatch = useDispatch();
  const [activeAddress, setActiveAddress] = useState("");
  const [
    setUserAddress,
    { data: isUserAddressData, isLoading, isSuccess, isError, error },
  ] = useSetUserAddressMutation();

  // const verifyDefaultAddress = () => {
  //   const approvedAddress = isAddressData.filter(
  //     (item) => item.default == true
  //   );
  //   setActiveAddress(approvedAddress[0].id);
  // };

  const handleDefaultAddress = async (addressID) => {
    console.log("i got clicked", addressID);
    if (addressID) {
      setActiveAddress(addressID);
      try {
        const defaultResponse = await setUserAddress(addressID);
        return defaultResponse;
      } catch (err) {
        console.log("err reponse", err);
      }
    } else {
      console.log("hello address id", addressID);
    }
  };

  // useEffect(() => {
  //   verifyDefaultAddress();
  // }, [isUserAddressData, isAddressData]);

  useEffect(() => {
    if (isError) {
      setMessage(error.data.message || error.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      const filteredAddress = isAddressData.filter(
        (item) => item.id === activeAddress
      );
      // const coordinate = {
      //   longitude: filteredAddress[0].lat,
      //   latitude: filteredAddress[0].long,
      // };

      if (
        filteredAddress[0]?.street === "" ||
        filteredAddress[0]?.street === null
      ) {
        const completeAddress = [
          filteredAddress[0]?.city,
          filteredAddress[0]?.state,
          filteredAddress[0]?.country.name,
          filteredAddress[0]?.zip,
        ].join(", ");
        dispatch(
          setUserAddressInfo({
            id: filteredAddress[0]?.id,
            address: completeAddress,
            longitude: filteredAddress[0].lat,
            latitude: filteredAddress[0].long,
          })
        );
      } else {
        const completeAddress = [
          filteredAddress[0]?.street,
          filteredAddress[0]?.city,
          filteredAddress[0]?.state,
          filteredAddress[0]?.country.name,
          filteredAddress[0]?.zip,
        ].join(", ");
        dispatch(
          setUserAddressInfo({
            id: filteredAddress[0]?.id,
            address: completeAddress,
            longitude: filteredAddress[0].lat,
            latitude: filteredAddress[0].long,
          })
        );
      }
      setMessage(isUserAddressData?.message);
      setShowAlert(true);
      setAlertStatus("success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserAddressData, isAddressData, isSuccess, isError, error]);

  return (
    <VStack py={2} px={1}>
      <Text
        my={2}
        fontSize="16"
        lineHeight="24"
        letterSpacing="-0.165"
        fontWeight="700"
        color="black.500"
      >
        Saved addresses
      </Text>
      <Box w="100%">
        {isLoading ? (
          <Spinner color="red.500" size="sm" />
        ) : (
          <Radio.Group
            onChange={(addressID) => {
              handleDefaultAddress(addressID);
            }}
            value={activeAddress ? activeAddress : ""}
            name="address"
            size="md"
            w="100%"
            colorScheme="red"
          >
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={isAddressData}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <AddressCard
                  id={item?.id}
                  alias={item?.alias}
                  street={item?.street}
                  city={item?.city}
                  state={item?.state}
                  zipCode={item?.zip}
                  country={item?.country.name}
                />
              )}
            />
          </Radio.Group>
        )}
      </Box>
    </VStack>
  );
};

export default SavedAddressList;
