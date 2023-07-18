import { useState } from "react";
import {
  Icon,
  HStack,
  Image,
  Box,
  VStack,
  Text,
  Skeleton,
  Pressable,
  Heading,
  Spinner,
  Stack,
} from "native-base";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  useUnFavoriteRestuarantMutation,
  useFavoriteRestuarantMutation,
} from "../../../redux/restuarant/restaurantApiSlice";
import { ToastAlert } from "../../alerts";
import { useSession } from "../../../hooks";

const HomeRestuarantCard = ({
  loading,
  fetching,
  isError,
  coverImage,
  title,
  reviews,
  ratings,
  width,
  height,
  prepTime,
  isOpen,
  restuarantID,
  favorite,
  typeUrl,
  pageType,
  pageTitle,
}) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { isAuthenticated, isToken } = useSession();

  const [alertStatus, setAlertStatus] = useState("");
  const [favoriteRestuarant, { isLoading, isFetching }] =
    useFavoriteRestuarantMutation();
  const [
    unFavoriteRestuarant,
    { isLoading: unFavLoading, isFetching: unFavFetching },
  ] = useUnFavoriteRestuarantMutation();

  const favRestuarant = async () => {
    try {
      if (isToken || isToken !== "" || isToken !== null) {
        const responseData = await favoriteRestuarant(restuarantID);
        if (responseData?.data.status === "success") {
          setMessage(responseData?.data.message);
          setShowAlert(true);
          setAlertStatus("success");
          console.log("success data", responseData?.data.message);
        } else {
          // console.log('error response', responseData?.data.message);
          setMessage(responseData?.data.message);
          setShowAlert(true);
          setAlertStatus("error");
        }
      } else {
        setMessage("Kindly login to favorite a restuarant!");
        setShowAlert(true);
        setAlertStatus("error");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const unFavRestuarant = async () => {
    try {
      if (isToken || isToken !== "" || isToken !== null) {
        const responseData = await unFavoriteRestuarant(restuarantID);
        if (responseData?.data.status === "success") {
          setMessage(responseData?.data.message);
          setShowAlert(true);
          setAlertStatus("success");
          console.log("success data", responseData?.data.message);
        } else {
          setMessage(responseData?.data.message);
          setShowAlert(true);
          setAlertStatus("error");
          console.log("error response", responseData?.data.message);
        }
      } else {
        setMessage("Kindly login to favorite a restuarant!");
        setShowAlert(true);
        setAlertStatus("error");
      }
    } catch (err) {
      console.log("error response", err);
    }
  };

  if (isError) {
    return (
      <VStack bg="white.500" py={2} mx="2">
        <Skeleton
          startColor="grey.500"
          endColor="warmGray.50"
          h={height}
          borderRadius="8"
          w={width}
          maxW="100%"
        />
        <Skeleton.Text p="2" lines={2} />
      </VStack>
    );
  }

  if (loading || fetching) {
    return (
      <VStack bg="white.500" py={2} mx="2">
        <Skeleton
          startColor="grey.500"
          endColor="warmGray.50"
          h={height}
          borderRadius="8"
          w={width}
          maxW="100%"
        />
        <Skeleton.Text p="2" lines={2} />
      </VStack>
    );
  }

  return (
    <>
      {showAlert ? (
        <ToastAlert
          message={message}
          status={alertStatus}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      ) : null}
      {/* <ToastAlert
          message="hello"
          status="success"
          showAlert={true}
          setShowAlert={setShowAlert}
        /> */}
      <VStack mr={typeUrl === "restuarant" ? 0 : 4} w={width}>
        <Pressable
          my={typeUrl === "restuarant" ? 3 : 0}
          onPress={() =>
            router.push(
              `/main/restuarant/restuarant-details/${restuarantID}/?title=${pageType}`
            )
          }
        >
          <Image
            h={height}
            borderRadius="8"
            w={width}
            maxW="100%"
            source={{
              uri: coverImage,
            }}
            resizeMode="cover"
            alt={title}
          />
        </Pressable>
        <HStack justifyContent="space-between" py={3} bg="white.500">
          <Box>
            <Heading
              isTruncated
              fontSize="16"
              lineHeight="24"
              fontWeight="700"
              color="black.500"
              letterSpacing="-0.165"
              noOfLines={1}
            >
              {title}
            </Heading>
            <Stack flexDirection="row">
              {!pageTitle === "pharmacy" ? (
                <Text
                  fontSize="12"
                  lineHeight="20"
                  fontWeight="400"
                  color="black.500"
                  letterSpacing="-0.165"
                >
                  {prepTime ? prepTime : 0} mins
                </Text>
              ) : null}

              <Text
                fontSize="12"
                lineHeight="20"
                fontWeight="400"
                color={isOpen ? "green.500" : "red.500"}
                letterSpacing="-0.165"
                mr="2"
              >
                {isOpen ? "Open" : "Closed"}
              </Text>
            </Stack>
            {/* <Text
              fontSize="12"
              lineHeight="20"
              fontWeight="400"
              color="black.500"
              letterSpacing="-0.165"
            >
             
              {isOpen ? (
                <Text color="green.500">. Open</Text>
              ) : (
                <Text color="red.500">. Closed</Text>
              )}
            </Text> */}
          </Box>
          <Box justifyContent="flex-end" alignItems="flex-end">
            <Pressable onPress={favorite ? unFavRestuarant : favRestuarant}>
              {isLoading || isFetching || unFavLoading || unFavFetching ? (
                <Spinner color="red.500" size="sm" />
              ) : (
                <Icon
                  as={FontAwesome}
                  name="heart"
                  size="5"
                  color={favorite ? "red.500" : "grey.700"}
                />
              )}

              <Text
                fontSize="12px"
                lineHeight="20px"
                fontWeight="400"
                color="black.500"
                letterSpacing="0.165"
              >
                {ratings} ({reviews ? reviews : 0})
              </Text>
            </Pressable>
          </Box>
        </HStack>
      </VStack>
    </>
  );
};

export default HomeRestuarantCard;
