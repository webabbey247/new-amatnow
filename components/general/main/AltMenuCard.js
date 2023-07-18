import {
  Text,
  Heading,
  Icon,
  HStack,
  Box,
  Image,
  IconButton,
  Skeleton,
  Center,
  Stack,
  Pressable,
  Spinner,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { setHeight, setWidth } from "../../../utils/helper";
import { useSession } from "../../../hooks";
import {
  useFavoriteRestuarantMenuMutation,
  useUnFavoriteRestuarantMenuMutation,
} from "../../../redux/restuarant/restaurantApiSlice";

const AltMenuCard = ({
  isLoading,
  id,
  title,
  price,
  image,
  onOpen,
  setMenuCategoryID,
  restuarantID,
  favorite,
  setMessage,
  setAlertStatus,
  setShowAlert,
}) => {
  const { isAuthenticated, isToken } = useSession();

  const [favoriteRestuarantMenu, { isLoading: favLoading }] =
    useFavoriteRestuarantMenuMutation();

  const [unFavoriteRestuarantMenu, { isLoading: unFavLoading }] =
    useUnFavoriteRestuarantMenuMutation();

  // console.log("restuarantID :", restuarantID);
  // console.log("id :", id);

  const handleFavoriteMenu = async () => {
    try {
      if (isToken && isToken !== "" && isToken !== null) {
        const responseData = await favoriteRestuarantMenu({
          id: restuarantID,
          menuID: id,
        });
        console.log("hello favorite", responseData);
        if (responseData?.data.status === "success") {
          setMessage(responseData?.data.message);
          setShowAlert(true);
          setAlertStatus("success");
          console.log("favorite success data", responseData?.data.message);
          onClose();
        } else {
          console.log("favorite error response", responseData?.data.message);
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

  const handleUnFavoriteMenu = async () => {
    try {
      if (isToken && isToken !== "" && isToken !== null) {
        const responseData = await unFavoriteRestuarantMenu({
          id: restuarantID,
          menuID: id,
        });
        console.log("hello unfav", responseData);
        if (responseData?.data.status === "success") {
          setMessage(responseData?.data.message);
          setShowAlert(true);
          setAlertStatus("success");
          console.log("unFavorite success data", responseData?.data.message);
          onClose();
        } else {
          setMessage(responseData?.data.message);
          setShowAlert(true);
          setAlertStatus("error");
          console.log("favorite error response", responseData?.data.message);
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
  return (
    <Pressable
      my={3}
      key={id}
      onPress={() => {
        setMenuCategoryID(id);
        onOpen();
      }}
    >
      <HStack justifyContent="space-between" alignItems="space-between">
        <Center
          bg="white.500"
          justifyContent="center"
          alignItems="flex-start"
          w={setWidth(50)}
          h={setHeight(15)}
        >
          <Heading
            isTruncated
            noOfLines={2}
            fontSize="14"
            lineHeight="22"
            fontWeight="700"
            color="black.500"
            letterSpacing="-0.165"
            textAlign="left"
          >
            {title}
          </Heading>
          <Text
            my={2}
            fontSize="14"
            lineHeight="20"
            fontWeight="400"
            color="black.500"
            letterSpacing="-0.165"
          >
            N{price}
          </Text>
        </Center>
        <Box>
          <Image
            w={setWidth(30)}
            h={setHeight(15)}
            borderRadius="8"
            source={{ uri: image }}
            resizeMode="cover"
            alt={title}
          />
          {isLoading || unFavLoading || favLoading ? (
            <Spinner
              position="absolute"
              color="red.500"
              size="sm"
              bottom="10%"
              right="5%"
            />
          ) : (
            <IconButton
              onPress={
                favorite === 1 ? handleUnFavoriteMenu : handleFavoriteMenu
              }
              size={8}
              rounded="full"
              position="absolute"
              bg="grey.500"
              bottom="10%"
              right="5%"
              _icon={{
                as: FontAwesome,
                name: "heart",
                size: "4",
                color: favorite === 1 ? "red.500" : "grey.600",
              }}
            />
          )}
        </Box>
      </HStack>
    </Pressable>
  );
};

export default AltMenuCard;
