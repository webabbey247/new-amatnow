import { Fragment, useState } from "react";
import { useRouter } from "expo-router";
import { FlatList, VStack, Button, useDisclose, Text } from "native-base";
import { CartCardSkeleton } from "../../skeleton";
import { NoCartCard, MenuCartCard } from "../../general";
import { useGetCartQuery } from "../../../redux/cart/cartApiSlice";
import { useSession } from "../../../hooks";
import { ToastAlert } from "../../alerts";
import { AuthOptionsActionSheet } from "../../actionsheets";

const MenuCartList = ({ restuarantID, loading, fetching }) => {
  const router = useRouter();
  const { isToken } = useSession();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const placeholderData = new Array(5).fill("");

  const {
    data: cartData,
    isLoading,
    isFetching,
  } = useGetCartQuery({
    restuarantID: restuarantID,
    identifierID: "",
  });

  const handleCheckout = () => {
    isToken || isToken !== "" || isToken !== null
      ? router.push(`/main/modals/checkout/?title=${restuarantID}`)
      : onOpen(true);
  };

  return (
    <VStack flex={1} py={3} mb={5}>
      {showAlert ? (
        <ToastAlert
          message={message}
          status={alertStatus}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      ) : null}

      {isLoading || isFetching || loading || fetching ? (
        <Fragment>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={placeholderData}
            keyExtractor={(item) => item?.id}
            renderItem={({ item, index }) => <CartCardSkeleton key={index} />}
          />
        </Fragment>
      ) : (
        <Fragment>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={cartData?.data}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <MenuCartCard
                id={item?.id}
                identifier={item?.identifier}
                qty={item?.quantity}
                title={item?.restaurant_menu.name}
                description={item?.restaurant_menu.description}
                image={item?.restaurant_menu.image}
                price={item?.restaurant_menu.price}
                restaurant_menu_id={item?.restaurant_menu.id}
                menu_extras={item?.restaurant_menu.menu_items}
                setMessage={setMessage}
                setShowAlert={setShowAlert}
                setAlertStatus={setAlertStatus}
              />
            )}
          />
          <Button
            onPress={handleCheckout}
            width="100%"
            rounded="full"
            bg="red.500"
            mt={5}
            py="4"
            _text={{
              color: "white.500",
              fontWeight: "500",
              textTransform: "none",
              fontSize: "16",
              lineHeight: "24",
              letterSpacing: "0.165",
            }}
          >
            Checkout
          </Button>
        </Fragment>
      )}

      <AuthOptionsActionSheet isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default MenuCartList;
