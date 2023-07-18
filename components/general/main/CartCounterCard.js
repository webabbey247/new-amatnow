import { Fab, Icon, Spinner, Image } from "native-base";
import { setWidth, setHeight } from "../../../utils/helper";
import { useRouter } from "expo-router";
import icons from "../../../constants/icons";
import { useGetCartQuery } from "../../../redux/cart/cartApiSlice";

const CartCounterCard = ({restuarantID}) => {
  const router = useRouter();
  const {
    data: cartData,
    isLoading,
    isFetching,
  } = useGetCartQuery({
    restuarantID: restuarantID,
    identifierID: "",
  });
  const totalQty = cartData?.data.reduce((acc, curr) => acc + curr.quantity, 0);
  console.log("hello cart data", cartData);

  return (
    <Fab
      onPress={() => router.replace("/(tabs)/cart")}
      justifyContent="center"
      alignItems="center"
      renderInPortal={true}
      bg={isLoading || isFetching ? "grey.500" : "red.500"}
      w={setWidth(22)}
      h={setHeight(6.5)}
      bottom="5%"
      right="40%"
      placement="bottom-right"
      icon={
        isLoading || isFetching ? (
          <Spinner color="red.500" size="sm" />
        ) : (
          <Image
            tintColor="white.500"
            size="6"
            source={icons.CARTICON}
            alt="Cart Icon"
          />
        )
      }
      label={!totalQty ? "0" : totalQty}
      _text={{
        textAlign: "center",
        fontSize: "16",
        lineHeight: "24",
        letterSpacing: "-0.165",
        fontWeight: "700",
        bg: "white.500",
        color: "red.500",
        h: "7",
        w: "7",
        rounded: "full",
      }}
    />
  );
};

export default CartCounterCard;
