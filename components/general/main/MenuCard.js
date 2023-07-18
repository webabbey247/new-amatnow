import {
  IconButton,
  Image,
  Heading,
  Text,
  Pressable,
  Spinner,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { MenuCardSkeleton } from "../../skeleton";
import { Fragment } from "react";
import { useSession } from "../../../hooks";
import {
  useFavoriteRestuarantMenuMutation,
  useUnFavoriteRestuarantMenuMutation,
} from "../../../redux/restuarant/restaurantApiSlice";

const MenuCard = ({
  position,
  title,
  image,
  cost,
  loading,
  fetching,
  width,
  height,
  id,
  onOpen,
  setMenuCategoryID,
  restuarantID,
  favorite,
  setMessage,
  setAlertStatus,
  setShowAlert,
}) => {
  const { isAuthenticated } = useSession();
  const [favoriteRestuarantMenu, { isLoading }] =
    useFavoriteRestuarantMenuMutation();
  const [unFavoriteRestuarantMenu, { isLoading: unFavLoading }] =
    useUnFavoriteRestuarantMenuMutation();

  // console.log("restuarantID :", restuarantID);
  // console.log("id :", restuarantID);

  const handleFavoriteMenu = async () => {
    try {
      if (isAuthenticated) {
        const responseData = await favoriteRestuarantMenu({
          id: restuarantID,
          menuID: id,
        });
        console.log("favorite response data:", responseData);
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
      if (isAuthenticated) {
        const responseData = await unFavoriteRestuarantMenu({
          id: restuarantID,
          menuID: id,
        });
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
    <Fragment>
      {loading || fetching ? (
        <MenuCardSkeleton position={position} width={width} height={height} />
      ) : (
        <Pressable
          key={id}
          onPress={() => {
            setMenuCategoryID(id);
            onOpen();
          }}
          my={2}
          mr={3}
          w={width ? width : "100"}
        >
          <Image
            h={height ? height : "100"}
            borderRadius="8"
            w={width ? width : "100"}
            source={{ uri: image }}
            resizeMode="cover"
            alt={title}
          />
          {position ? (
            <IconButton
              size={7}
              rounded="full"
              position="absolute"
              bg="grey.500"
              bottom="30%"
              left="10%"
              shadow={2}
              _icon={{
                as: FontAwesome,
                name: "heart",
                size: "4",
                color: "black.500",
              }}
            />
          ) : isLoading || unFavLoading ? (
            <Spinner
              position="absolute"
              color="red.500"
              size="sm"
              top="45%"
              right="5%"
            />
          ) : (
            <IconButton
              onPress={
                favorite === 1 ? handleUnFavoriteMenu : handleFavoriteMenu
              }
              size={7}
              rounded="full"
              position="absolute"
              bg="grey.500"
              top="45%"
              right="5%"
              shadow={2}
              _icon={{
                as: FontAwesome,
                name: "heart",
                size: "4",
                color: favorite === 1 ? "red.500" : "grey.600",
              }}
            />
          )}

          <Heading
            my={1.5}
            isTruncated
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
            mt={-0.5}
            fontSize="12"
            lineHeight="20"
            fontWeight="400"
            color="black.500"
            letterSpacing="-0.165"
            textAlign="left"
          >
            N{cost}
          </Text>
        </Pressable>
      )}
    </Fragment>
  );
};

export default MenuCard;
