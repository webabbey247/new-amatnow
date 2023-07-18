import { Fragment, useState } from "react";
import {
  Icon,
  Text,
  HStack,
  Badge,
  FlatList,
  Pressable,
  useDisclose,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { ToastAlert } from "../alerts";
import { CheckoutCartSkeleton } from "../skeleton";
import { setWidth } from "../../utils/helper";
import { CheckoutMenuCard } from "../general";
import { useRouter } from "expo-router";
import { DeleteCartMenuActionSheet } from "../actionsheets";

const CheckoutMenuCartSlider = ({
  cartData,
  isLoading,
  isFetching,
  restuarantID,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [cartID, setCartID] = useState(null);

  return (
    <Fragment>
      {isLoading || isFetching ? (
        <Fragment>
          <CheckoutCartSkeleton />
          <CheckoutCartSkeleton />
          <CheckoutCartSkeleton />
        </Fragment>
      ) : cartData?.data.length >= 1 ? (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={cartData?.data}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <CheckoutMenuCard
              id={item?.id}
              identifier={item?.identifier}
              qty={item?.quantity}
              setCartID={setCartID}
              title={item?.restaurant_menu.name}
              description={item?.restaurant_menu.description}
              image={item?.restaurant_menu.image}
              price={item?.restaurant_menu.price}
              restaurant_menu_id={item?.restaurant_menu.id}
              menu_extras={item?.restaurant_menu.menu_items}
              onOpen={onOpen}
              setAlertStatus={setAlertStatus}
              setShowAlert={setShowAlert}
              setMessage={setMessage}
            />
          )}
        />
      ) : cartData?.data.length < 1 ? (
        <Text
          my={4}
          fontSize="16"
          lineHeight="24"
          fontWeight="500"
          letterSpacing="-0.165"
        >
          No saved item found
        </Text>
      ) : null}

      <Pressable
        onPress={() =>
          router.push(`/main/restuarant/restuarant-details/${restuarantID}`)
        }
      >
        <Badge borderRadius="8" py={2} w={setWidth(40)} bg="grey.500" my={4}>
          <HStack justifyContent="flex-start" alignItems="flex-start">
            <Icon as={Feather} name="plus" mt={1} mr={2} color="black.500" />
            <Text
              fontSize="14"
              lineHeight="20"
              fontWeight="500"
              letterSpacing="-0.165"
            >
              Add more items
            </Text>
          </HStack>
        </Badge>
      </Pressable>

      {showAlert ? (
        <ToastAlert
          message={message}
          status={alertStatus}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      ) : null}

      <DeleteCartMenuActionSheet
        cartID={cartID}
        isOpen={isOpen}
        onClose={onClose}
        setMessage={setMessage}
        setShowAlert={setShowAlert}
        setAlertStatus={setAlertStatus}
      />
    </Fragment>
  );
};

export default CheckoutMenuCartSlider;
