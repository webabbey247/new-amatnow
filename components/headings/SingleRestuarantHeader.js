import { Fragment } from "react";
import { Platform } from "react-native";
import {
  Text,
  VStack,
  Center,
  Heading,
  Stack,
  Icon,
  HStack,
  Image,
  IconButton,
  useDisclose,
  Skeleton,
} from "native-base";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import images from "../../constants/images";
import icons from "../../constants/icons";
import { setHeight, setWidth } from "../../utils/helper";
import { StoreMoreInfoActionSheet } from "../actionsheets";
import { WaitTimerAlert } from "../alerts";

const SingleRestuarantHeader = ({ loading, responseData }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Fragment>
      {loading ? (
        <VStack space="5">
          <Skeleton
            startColor="grey.500"
            endColor="warmGray.50"
            w="100%"
            h={setHeight(25)}
            borderRadius="8"
            maxW="100%"
          />

          <Skeleton
            rounded="full"
            position="absolute"
            top="45%"
            left="5"
            w="100"
            h="100"
          />
          <Skeleton.Text
            p={2}
            startColor="grey.500"
            endColor="warmGray.50"
            mt={3}
          />
        </VStack>
      ) : (
        <Fragment>
          <VStack space="5" id={responseData?.id}>
            <Center width="100%" maxHeight="100%">
              <Image
                width="100%"
                h={setHeight(30)}
                source={{
                  uri: responseData?.image,
                }}
                resizeMode="cover"
                alt={responseData?.name}
              />
              <IconButton
                onPress={() => router.back()}
                size={8}
                rounded="full"
                position="absolute"
                bg="grey.500"
                top={Platform.OS === "ios" ? "20%" : "12%"}
                left="3"
                shadow={2}
                _icon={{
                  as: Feather,
                  name: "x",
                  size: "5",
                  strokeWidth: "2",
                  color: "grey.600",
                  textAlign: "center",
                }}
              />
              <HStack
                position="absolute"
                top={Platform.OS === "ios" ? "20%" : "12%"}
                right="3"
              >
                <IconButton
                  size={8}
                  rounded="full"
                  bg="grey.500"
                  mr={3}
                  shadow={2}
                  _icon={{
                    as: Feather,
                    name: "search",
                    strokeWidth: "2",
                    size: "5",
                    color: "grey.600",
                    textAlign: "center",
                  }}
                />

                <IconButton
                  onPress={onOpen}
                  size={8}
                  rounded="full"
                  bg="grey.500"
                  shadow={2}
                  _icon={{
                    as: Feather,
                    name: "more-horizontal",
                    strokeWidth: "2",
                    size: "5",
                    color: "grey.600",
                    textAlign: "center",
                  }}
                />
              </HStack>
            </Center>

            <Center
              bg="white.500"
              w="100"
              h="100"
              rounded="full"
              mx={5}
              mt={-20}
              shadow={3}
            >
              <Image
                size={20}
                source={images.LOGOPLACEHOLDER}
                resizeMode="contain"
                alt={responseData?.name}
              />
            </Center>
            <Stack direction="column" px={4} mt={-4} py={2}>
              <Heading
                fontSize="20"
                lineHeight="28"
                fontWeight="800"
                color="black.500"
                textTransform="capitalize"
                letterSpacing="0.165"
              >
                {responseData?.name}
              </Heading>
              <HStack justifyContent="space-between">
                <Stack direction="row" my={2} w="80%">
                  <Icon
                    as={FontAwesome}
                    name="star"
                    mt={0.5}
                    size="5"
                    color={responseData?.is_favorite ? "red.500" : "black.500"}
                  />
                  <Text
                    fontSize="12"
                    lineHeight="22"
                    fontWeight="500"
                    color="black.500"
                    letterSpacing="0.165"
                    ml={1}
                  >
                    {responseData?.rating} ({responseData?.reviews} ratings)
                  </Text>
                  <Text
                    ml={2}
                    fontSize="12"
                    lineHeight="22"
                    fontWeight="500"
                    color="black.500"
                    letterSpacing="0.165"
                  >
                    {responseData?.speciality}
                  </Text>
                  <Center
                    mx={2}
                    size={1}
                    rounded={"full"}
                    bg="black.500"
                    mt={3}
                  />
                  <Text
                    fontSize="12"
                    lineHeight="22"
                    fontWeight="500"
                    color="black.500"
                    letterSpacing="0.165"
                  >
                    {responseData?.avg_preparation_time} min
                  </Text>
                </Stack>
                <Center w="20%" justifyContent="flex-end" alignItems="flex-end">
                  <IconButton
                    onPress={() =>
                      router.replace(
                        `/main/restuarant/restuarant-profile/${responseData?.id}`
                      )
                    }
                    p="2"
                    bg="white.500"
                    rounded="full"
                    shadow={2}
                    variant="solid"
                    _icon={{
                      as: Feather,
                      name: "arrow-right",
                      size: "5",
                      color: "grey.600",
                      textAlign: "center",
                    }}
                  />
                </Center>
              </HStack>

              <Center
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                w={setWidth(37)}
                bg="grey.500"
                px={3}
                borderWidth={1}
                shadow={0.5}
                borderColor="grey.500"
                rounded="full"
                py={3}
                my={2}
              >
                <Image
                  size="6"
                  source={icons.USERICON}
                  alt="User Icon"
                  resizeMode="contain"
                />
                <Text
                  textAlign="center"
                  ml={3}
                  fontSize="14"
                  lineHeight="20"
                  fontWeight="500"
                  color="black.500"
                  letterSpacing="0.165"
                >
                  Group Order
                </Text>
              </Center>
            </Stack>
          </VStack>

          {responseData?.avg_preparation_time > 30 ? (
            <WaitTimerAlert prepTIme={responseData?.avg_preparation_time} />
          ) : null}
          <StoreMoreInfoActionSheet
            isFavorite={responseData?.is_favorite}
            restuarantID={responseData?.id}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default SingleRestuarantHeader;
