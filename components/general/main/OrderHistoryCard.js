import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Text,
  Divider,
  Button,
  Image,
  Stack,
  HStack,
  Center,
  IconButton,
  VStack,
  Pressable,
  Spinner,
} from "native-base";
import images from "../../../constants/images";
import { setWidth, setHeight } from "../../../utils/helper";
import { Feather } from "@expo/vector-icons";
import { formatDistance, subDays } from "date-fns";
import { useRouter } from "expo-router";
import { useLazyReOrderMenuQuery } from "../../../redux/cart/cartApiSlice";
import { ToastAlert } from "../../alerts";

const OrderHistoryCard = ({
  restuarantName,
  id,
  restuarantID,
  totatNairaPrice,
  referenceID,
  coverImage,
  createdDate,
  menu,
}) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [
    reOrderMenu,
    { data: isReOrderData, isError, isLoading, isSuccess, isFetching, error },
  ] = useLazyReOrderMenuQuery();

  const handleReOrderMenu = async () => {
    try {
      const menuReOrder = await reOrderMenu(id);
      return menuReOrder;
    } catch (err) {
      console.log("err reponse:", err);
    }
  };

  useEffect(() => {
    if (isError) {
      setMessage(error.message || error.data.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      console.log("success reponse:", isReOrderData?.message);
      setMessage(isReOrderData?.message);
      setShowAlert(true);
      setAlertStatus("success");
      router.push("(tabs)/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReOrderData, isError, isSuccess, error]);

  return (
    <Fragment>
      {showAlert ? (
        <ToastAlert
          message={message}
          status={alertStatus}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      ) : null}
      <Box
        key={id}
        borderColor="grey.400"
        borderWidth="1"
        borderRadius="8"
        py="2"
        px="4"
        my="2"
      >
        <HStack justifyContent="space-between" alignItems="center">
          <Stack direction="row" space="3">
            <Image
              h={setHeight(5)}
              w={setWidth(11)}
              source={{
                uri: coverImage,
              }}
              // source={images.ORDERHISTORYIMG}
              alt={restuarantName}
              resizeMode="cover"
              rounded="full"
            />
            <Center>
              <Text
                fontSize="16"
                lineHeight="24"
                letterSpacing="-0.165"
                textAlign="center"
                fontWeight="500"
                textTransform="capitalize"
                color="black.500"
              >
                {restuarantName}
              </Text>
            </Center>
          </Stack>
          <IconButton
            onPress={() => {
              router.push(`main/orders/${id}?title="restuarant"`);
            }}
            _icon={{
              as: Feather,
              name: "arrow-right",
              size: "5",
              color: " black.500",
              textAlign: "center",
            }}
          />
        </HStack>

        <Divider my="2.5" py="0.4" bg="grey.300" w="100%" borderRadius="8" />

        <VStack my="3" space="4">
          <Stack direction="row" space="4">
            <Text
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="500"
              color="grey.700"
            >
              {formatDistance(subDays(new Date(createdDate), 3), new Date(), {
                addSuffix: true,
              })}
            </Text>
            <Divider
              bg="grey.700"
              rounded="full"
              mt="2"
              h={setHeight(0.5)}
              w={setWidth(1)}
            />
            <Text
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="500"
              color="grey.700"
              textTransform="capitalize"
            >
              {totatNairaPrice}
            </Text>
            <Divider
              mt="2"
              bg="grey.700"
              rounded="full"
              h={setHeight(0.5)}
              w={setWidth(1)}
            />
            <Text
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="500"
              color="grey.700"
            >
              {menu.length} items(s)
              {/* {menu.length <= 1 ? `${}`} Items */}
            </Text>
          </Stack>

          {/* <Stack direction="row" space="4" flex="1" flexWrap="wrap">
            <Text
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="500"
              color="black.500"
              textTransform="capitalize"
            >
              Ofada rice
            </Text>
            <Divider
              bg="black.500"
              rounded="full"
              mt="2"
              h={setHeight(0.5)}
              w={setWidth(1)}
            />
            <Text
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="500"
              color="black.500"
              textTransform="capitalize"
            >
              Tomato stew
            </Text>
            <Divider
              bg="black.500"
              rounded="full"
              mt="2"
              h={setHeight(0.5)}
              w={setWidth(1)}
            />
            <Text
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="500"
              color="black.500"
              textTransform="capitalize"
            >
              Tomato stew
            </Text>
            <Divider
              bg="black.500"
              rounded="full"
              mt="2"
              h={setHeight(0.5)}
              w={setWidth(1)}
            />
            <Text
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="500"
              color="black.500"
              textTransform="capitalize"
            >
              Tomato stew
            </Text>
            <Divider
              bg="black.500"
              rounded="full"
              mt="2"
              h={setHeight(0.5)}
              w={setWidth(1)}
            />
            <Text
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="500"
              color="black.500"
              textTransform="capitalize"
            >
              Tomato stew
            </Text>
            <Divider
              bg="black.500"
              rounded="full"
              mt="2"
              h={setHeight(0.5)}
              w={setWidth(1)}
            />
            <Text
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="500"
              color="black.500"
              textTransform="capitalize"
            >
              Tomato stew
            </Text>
          </Stack> */}

          {isLoading || isFetching ? (
            <Spinner color="red.500" size="sm" />
          ) : (
            <Button
              onPress={handleReOrderMenu}
              w={setWidth(35)}
              bg="grey.500"
              rounded="full"
              px="4"
              colorScheme="red.500"
              py="2"
              _text={{
                color: "red.500",
                fontWeight: "500",
                textTransform: "none",
                fontSize: "16",
                lineHeight: "24",
                letterSpacing: "0.165",
              }}
            >
              Reorder
            </Button>
          )}
        </VStack>
      </Box>
    </Fragment>
  );
};

export default OrderHistoryCard;
