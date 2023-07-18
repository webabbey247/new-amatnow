import {
  Box,
  useColorMode,
  ScrollView,
  Center,
  Image,
  VStack,
  IconButton,
  Heading,
  HStack,
  Text,
  Divider,
  Icon,
  Stack,
} from "native-base";
// import images from '../../../constants/images';
import { setHeight, setWidth } from "../../../utils/helper";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
// import {StoreInfoReviewSlider} from '../../components/CustomSlider';
// import {StoreInfoReviewList} from '../../components/General';
import { useGetSingleRestuarantQuery } from "../../../redux/restuarant/restaurantApiSlice";

const StoreInfoModal = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { colorMode } = useColorMode();
  // console.log('hello restuarant0', restuarantID);
  const { data: responseData, isLoading } = useGetSingleRestuarantQuery(
    params.restuarantid
  );

  return (
    <Box
      flex={1}
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <VStack mb={5}>
          <Center width="100%" maxHeight="100%">
            <Image
              width="100%"
              h={setHeight(22)}
              source={{
                uri: responseData?.image,
              }}
              resizeMode="cover"
              alt={responseData?.name}
            />
            <IconButton
              onPress={() => navigation.goBack()}
              size={8}
              rounded="full"
              position="absolute"
              bg="grey.500"
              top="15%"
              left="5"
              shadow={2}
              _icon={{
                as: Feather,
                name: "arrow-left",
                size: "5",
                color: "black.500",
              }}
            />
          </Center>

          <Center
            py={3}
            justifyContent="flex-start"
            alignItems="flex-start"
            px={4}
            width="100%"
            maxHeight="100%"
          >
            <Heading
              textAlign="left"
              mt={3}
              fontSize="20"
              lineHeight="28"
              fontWeight="800"
              letterSpacing="-0.165"
            >
              {responseData?.name}
            </Heading>
            <VStack w="100%" py={3}>
              <HStack mt={2} justifyContent="space-between">
                <Stack flexDirection="row" w="70%">
                  <IconButton
                    bg="white.500"
                    _icon={{
                      as: Feather,
                      name: "map-pin",
                      size: "6",
                      color: "black.500",
                    }}
                  />
                  <Text
                    ml={4}
                    fontSize="14"
                    lineHeight="22"
                    letterSpacing="-0.165"
                    textAlign="left"
                    fontWeight="400"
                    textTransform="none"
                    mb={2}
                    color="black.500"
                  >
                    {responseData?.location.address}
                  </Text>
                </Stack>
                <IconButton
                  size={12}
                  rounded="full"
                  bg="pink.300"
                  _icon={{
                    as: Feather,
                    name: "arrow-up-right",
                    size: "5",
                    color: "orange.500",
                  }}
                />
              </HStack>

              <Divider
                my={3}
                py="0.3"
                bg="grey.300"
                w="100%"
                borderRadius="8"
              />

              <HStack mt={2} justifyContent="space-between">
                <Stack flexDirection="row" w="70%">
                  <IconButton
                    bg="white.500"
                    _icon={{
                      as: Feather,
                      name: "phone",
                      size: "6",
                      color: "black.500",
                    }}
                  />
                  <Text
                    ml={4}
                    fontSize="14"
                    lineHeight="22"
                    letterSpacing="-0.165"
                    textAlign="left"
                    fontWeight="400"
                    textTransform="none"
                    mt={2}
                    color="black.500"
                  >
                    {responseData?.phone}
                  </Text>
                </Stack>
                <IconButton
                  size={12}
                  rounded="full"
                  bg="blue.200"
                  _icon={{
                    as: Feather,
                    name: "file",
                    size: "5",
                    color: "blue.400",
                  }}
                />
              </HStack>
              <Divider
                my={4}
                py="0.3"
                bg="grey.300"
                w="100%"
                borderRadius="8"
              />
              <HStack my={4} justifyContent="space-between">
                <Stack flexDirection="row" w="70%">
                  <IconButton
                    bg="white.500"
                    _icon={{
                      as: Feather,
                      name: "share-2",
                      size: "6",
                      color: "black.500",
                    }}
                  />
                  <Text
                    ml={4}
                    fontSize="14"
                    lineHeight="22"
                    letterSpacing="-0.165"
                    textAling="center"
                    fontWeight="400"
                    textTransform="none"
                    mt={2}
                    color="black.500"
                  >
                    Share store
                  </Text>
                </Stack>
                <IconButton
                  size={12}
                  rounded="full"
                  bg="green.200"
                  _icon={{
                    as: Feather,
                    name: "share",
                    size: "5",
                    color: "green.700",
                  }}
                />
              </HStack>
              <Divider py="0.3" bg="grey.300" w="100%" borderRadius="8" />
            </VStack>
          </Center>

          {/* <Divider my={4} py="0.3" bg="grey.300" w="100%" borderRadius="8" /> */}

          {/* <StoreInfoReviewList
              responseData={responseData}
              restuarantID={  params.restuarantid}
            /> */}
          <Divider my={4} py="0.3" bg="grey.300" w="100%" borderRadius="8" />
          <Center
            my={3}
            justifyContent="flex-start"
            alignItems="flex-start"
            px={4}
            width="100%"
            maxHeight="100%"
          >
            <Heading
              textAlign="left"
              fontSize="18"
              lineHeight="24"
              fontWeight="800"
              color="black.500"
              letterSpacing="-0.165"
            >
              Opening Times
            </Heading>
            <VStack my={3}>
              <Text
                textAlign="left"
                fontSize="14"
                lineHeight="20"
                fontWeight="500"
                color="grey.700"
                letterSpacing="-0.165"
              >
                {responseData?.opening_hour} - {responseData?.closing_hour}{" "}
                (closed on sundays)
              </Text>
            </VStack>
          </Center>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default StoreInfoModal;
