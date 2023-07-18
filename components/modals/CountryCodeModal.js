import { useEffect, useState, useMemo } from "react";
import { Modal } from "react-native";
import {
  Center,
  VStack,
  FlatList,
  Text,
  FormControl,
  Input,
  Icon,
  HStack,
  IconButton,
  KeyboardAvoidingView,
} from "native-base";
import { useRouter } from "expo-router";
import { CountryCodeCard } from "../general";
import { setHeight } from "../../utils/helper";
import { Feather } from "@expo/vector-icons";
import useDebounce from "../../hooks/useDebounce";

const CountryCodeModal = ({
  setSelectedAreaCode,
  isCountryData,
  setShowModal,
  showModal,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [countryData, setCountryData] = useState("");

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  console.log("hello Country", isCountryData);

  const defualtCountryData = () => {
    const defaultData = [...isCountryData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setCountryData(defaultData);
  };

  const countries = useMemo(() => {
    if (!searchQuery) return countryData;
    return countryData.filter((country) => {
      return country.name
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase())
    });
  }, [debouncedSearchTerm, countryData]);

  // const handleSearchFilter = (text) => {
  //   if (text) {
  //     const filteredData = isCountryData.filter(function (item) {
  //       const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
  //       const formattedQuery = text.toUpperCase();
  //       return itemData.indexOf(formattedQuery) > -1;
  //     });
  //     setCountryData(filteredData);
  //     setSearchQuery(text);
  //   } else {
  //     setSearchQuery(text);
  //   }
  // };

  useEffect(() => {
    defualtCountryData();
  }, [isCountryData]);

  const CountrySearchForm = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <HStack
          justifyContent="flex-start"
          alignItems="flex-start"
          py={3}
          px={2}
          bg="red.500"
        >
          <IconButton
            onPress={() => router.back()}
            p="2.5"
            // mt={1}
            mr={1}
            bg="white.500"
            rounded="full"
            shadow={1}
            variant="solid"
            _icon={{
              as: Feather,
              name: "arrow-left",
              size: "5",
              color: "black.500",
            }}
          />
          <FormControl w="90%">
            <Input
              placeholder=""
              textAlign="left"
              fontSize="14"
              lineHeight="22"
              placeholderTextColor="grey.700"
              bg="grey.500"
              height={setHeight(5)}
              borderColor="grey.500"
              borderRadius="4"
              rounded="full"
              clearButtonMode="always"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              // onChangeText={(text) => handleSearchFilter(text)}
              InputLeftElement={
                <Icon
                  as={<Feather name="search" />}
                  size={5}
                  ml="2"
                  color="grey.700"
                />
              }
            />
          </FormControl>
        </HStack>
      </KeyboardAvoidingView>
    );
  };
  return (
    <Center flex={1} height="100%">
      <Modal animationType="slide" visible={showModal}>
        <CountrySearchForm />
        <VStack bg="white.500" w="100%" mt={3}>
          <FlatList
            data={countries}
            keyExtractor={(item) => item.iso2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CountryCodeCard
                item={item}
                setSelectedAreaCode={setSelectedAreaCode}
                setShowModal={setShowModal}
              />
            )}
          />
        </VStack>
      </Modal>
    </Center>
  );
};
export default CountryCodeModal;
