import { useState } from "react";
import {
  IconButton,
  HStack,
  Box,
  Text,
  Actionsheet,
  Image,
  Pressable,
  Center,
  VStack,
  Divider,
  Spinner,
} from "native-base";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import icons from "../../constants/icons";
import { setHeight } from "../../utils/helper";
import {
  useFavoriteRestuarantMutation,
  useUnFavoriteRestuarantMutation,
} from "../../redux/restuarant/restaurantApiSlice";
import { useSession } from "../../hooks";
import { ToastAlert } from "../alerts";

const StoreMoreInfoActionSheet = ({
  isOpen,
  onClose,
  restuarantID,
  isFavorite,
}) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const { isAuthenticated } = useSession();

  const [favoriteRestuarant, { isLoading, isFetching }] =
    useFavoriteRestuarantMutation();

  const [
    unFavoriteRestuarant,
    { isLoading: unFavLoading, isFetching: unFavFetching },
  ] = useUnFavoriteRestuarantMutation();


  const handleFavortiteStore = async () => {
    try {
      if (isAuthenticated) {
        const responseData = await favoriteRestuarant(restuarantID);
        if (responseData?.data.status === "success") {
          setMessage(responseData?.data.message);
          setShowAlert(true);
          setAlertStatus("success");
          console.log("success data", responseData?.data.message);
          onClose();
        } else {
          // console.log('error response', responseData?.data.message);
          setMessage(responseData?.data.message);
          setShowAlert(true);
          setAlertStatus("error");
          onClose();
        }
      } else {
        setMessage("Kindly login to favorite a restuarant!");
        setShowAlert(true);
        setAlertStatus("error");
        onClose();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleUnFavoriteStore = async () => {
    try {
      if (isAuthenticated) {
        const responseData = await unFavoriteRestuarant(restuarantID);
        if (responseData?.data.status === "success") {
          setMessage(responseData?.data.message);
          setShowAlert(true);
          setAlertStatus("success");
          console.log("success data", responseData?.data.message);
          onClose();
        } else {
          setMessage(responseData?.data.message);
          setShowAlert(true);
          setAlertStatus("error");
          console.log("error response", responseData?.data.message);
          onClose();
        }
      } else {
        setMessage("Kindly login to favorite a restuarant!");
        setShowAlert(true);
        setAlertStatus("error");
        onClose();
      }
    } catch (err) {
      console.log("error response", err);
    }
  };

  const handleStartGroupOrder = () => {
    console.log("start group order");
    onClose();
  };

  const handleShareStore = () => {
    onClose();
    console.log("share this store");
  };

  const handleStoreInfo = () => {
    onPress = { onClose };
    router.replace(`/main/restuarant/restuarant-profile/${restuarantID}`);
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content p={0} m={0} px={3} bg="white.500" h={setHeight(38)}>
        <Box w="100%" justifyContent="flex-start">
          {showAlert ? (
            <ToastAlert
              message={message}
              status={alertStatus}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          ) : null}
          <VStack w="100%" py={3}>
            <Pressable onPress={handleShareStore}>
              <HStack mt={2}>
                <IconButton
                  p="2.5"
                  bg="white.500"
                  borderWidth={1}
                  borderColor="grey.500"
                  rounded="full"
                  shadow={0.5}
                  variant="solid"
                  _icon={{
                    as: FontAwesome,
                    name: "share-alt",
                    size: "5",
                    color: "grey.600",
                  }}
                />
                <Text
                  ml={4}
                  fontSize="16"
                  lineHeight="24"
                  letterSpacing="-0.165"
                  textAling="center"
                  fontWeight="500"
                  textTransform="none"
                  mt={2}
                  color="black.500"
                >
                  Share this store
                </Text>
              </HStack>
            </Pressable>
            <Divider
              my={3}
              py="0.3px"
              bg="grey.300"
              w="100%"
              borderRadius="8"
            />
            <Pressable
              onPress={
                isFavorite ? handleUnFavoriteStore : handleFavortiteStore
              }
            >
              <HStack>
                {isLoading || isFetching || unFavLoading || unFavFetching ? (
                  <Spinner color="red.500" size="sm" />
                ) : (
                  <IconButton
                    p="2.5"
                    bg="white.500"
                    borderWidth={1}
                    borderColor="grey.500"
                    rounded="full"
                    shadow={0.5}
                    variant="solid"
                    _icon={{
                      as: FontAwesome,
                      name: "heart",
                      size: "5",
                      color: isFavorite ? "red.500" : "grey.600",
                    }}
                  />
                )}

                <Text
                  ml={4}
                  fontSize="16"
                  lineHeight="24"
                  letterSpacing="-0.165"
                  textAling="center"
                  fontWeight="500"
                  textTransform="none"
                  mt={2}
                  color="black.500"
                >
                  {isFavorite
                    ? " Remove store from favorites"
                    : " Add store to favorites"}
                </Text>
              </HStack>
            </Pressable>

            <Divider
              my={3}
              py="0.3px"
              bg="grey.300"
              w="100%"
              borderRadius="8"
            />
            <Pressable onPress={handleStartGroupOrder}>
              <HStack>
                <Center
                  p="2.5"
                  bg="white.500"
                  borderWidth={1}
                  borderColor="grey.500"
                  rounded="full"
                  shadow={0.5}
                  variant="solid"
                >
                  <Image
                    size="6"
                    source={icons.USERICON}
                    alt="Food"
                    tintColor="black.500"
                    resizeMode="contain"
                  />
                </Center>
                <Text
                  ml={4}
                  fontSize="16"
                  lineHeight="24"
                  letterSpacing="-0.165"
                  textAling="center"
                  fontWeight="500"
                  textTransform="none"
                  mt={2}
                  color="black.500"
                >
                  Start Group order
                </Text>
              </HStack>
            </Pressable>
            <Divider
              my={3}
              py="0.3px"
              bg="grey.300"
              w="100%"
              borderRadius="8"
            />
            <Pressable onPress={handleStoreInfo}>
              <HStack>
                <IconButton
                  p="2.5"
                  bg="white.500"
                  borderWidth={1}
                  borderColor="grey.500"
                  rounded="full"
                  shadow={0.5}
                  variant="solid"
                  _icon={{
                    as: FontAwesome,
                    name: "arrow-right",
                    size: "5",
                    color: "grey.600",
                    textAlign: "center",
                  }}
                />
                <Text
                  ml={4}
                  fontSize="16"
                  lineHeight="24"
                  letterSpacing="-0.165"
                  textAling="center"
                  fontWeight="500"
                  textTransform="none"
                  mt={2}
                  color="black.500"
                >
                  Store info
                </Text>
              </HStack>
            </Pressable>
          </VStack>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default StoreMoreInfoActionSheet;
