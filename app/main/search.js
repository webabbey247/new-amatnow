import { useState } from "react";
import {
  ScrollView,
  useColorMode,
  Text,
  Center,
  Box,
  VStack,
  Heading,
  HStack,
  Image,
  Pressable,
} from "native-base";
import icons from "../../constants/icons";
import { useRouter } from "expo-router";
import { SearchHeader } from "../../components/headings";
import { SearchForm } from "../../components/forms";
import { SearchResultCard } from "../../components/general";
import useDebounce from "../../hooks/useDebounce";

const SearchPage = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  return (
    <Box
      px={4}
      flex={1}
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <SearchHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />

        <SearchResultCard searchTerm={debouncedSearchValue} />

        <VStack w="100%" py={3}>
          <Heading
            fontSize="16"
            lineHeight="24"
            letterSpacing="0.165"
            textAling="center"
            fontWeight="500"
            textTransform="none"
            my={2}
            color="black.500"
          >
            Suggested
          </Heading>
          <Pressable onPress={() => router.push("main")}>
            <HStack mt={3}>
              <Center bg="grey.500" rounded="full" p={2}>
                <Image
                  size="6"
                  source={icons.CHEFHATICON}
                  alt="Food"
                  resizeMode="contain"
                />
              </Center>
              <Text
                ml={4}
                fontSize="14"
                lineHeight="20"
                letterSpacing="0.165"
                textAling="center"
                fontWeight="500"
                textTransform="none"
                mt={2}
                color="black.500"
              >
                Restaurants
              </Text>
            </HStack>
          </Pressable>
          <HStack mt={3}>
            <Center bg="grey.500" rounded="full" p={2}>
              <Image
                size="6"
                source={icons.CARROTICON}
                alt="Food"
                resizeMode="contain"
              />
            </Center>
            <Text
              ml={4}
              fontSize="14"
              lineHeight="20"
              letterSpacing="0.165"
              textAling="center"
              fontWeight="500"
              textTransform="none"
              mt={2}
              color="black.500"
            >
              Groceries
            </Text>
          </HStack>

          <HStack mt={3}>
            <Center bg="grey.500" rounded="full" p={2}>
              <Image
                size="6"
                source={icons.GIFTICON}
                alt="Food"
                resizeMode="contain"
              />
            </Center>
            <Text
              ml={4}
              fontSize="14"
              lineHeight="20"
              letterSpacing="0.165"
              textAling="center"
              fontWeight="500"
              textTransform="none"
              mt={2}
              color="black.500"
            >
              Essentials
            </Text>
          </HStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default SearchPage;
