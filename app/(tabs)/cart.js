import { useState, useEffect, Fragment } from "react";
import {
  Box,
  ScrollView,
  useColorMode,
  useDisclose,
  FlatList,
} from "native-base";
import { CartHeader } from "../../components/headings";
import { MenuCartList } from "../../components/sliders";
import { useGetRestuarantCartQuery } from "../../redux/cart/cartApiSlice";
import { RestuarantCartActionSheet } from "../../components/actionsheets";
import { CartCardSkeleton } from "../../components/skeleton";
import { NoCartCard } from "../../components/general";

const Cart = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [restuarantName, setRestuarantName] = useState(null);
  const [restuarantID, setRestuarantID] = useState(null);
  const placeholderData = new Array(5).fill("");

  const {
    data: isRestuarantCart,
    isLoading,
    isFetching,
  } = useGetRestuarantCartQuery();

  useEffect(() => {
    if (!isLoading || !isFetching) {
      setRestuarantName(isRestuarantCart?.data[0]?.name);
      setRestuarantID(isRestuarantCart?.data[0]?.id);
    }
  }, [isLoading, isFetching, isRestuarantCart]);
  return (
    <Box
      h="100%"
      px={4}
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <CartHeader onOpen={onOpen} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        {isLoading || isFetching ? (
          <Fragment>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={placeholderData}
              keyExtractor={(item) => item?.id}
              renderItem={({ item, index }) => <CartCardSkeleton key={index} />}
            />
          </Fragment>
        ) : isRestuarantCart?.data.length  < 1 ? (
          <NoCartCard />
        ) : (
          <Fragment>
            <MenuCartList
              restuarantID={restuarantID}
              restuarantName={restuarantName}
              loading={isLoading}
              fetching={isFetching}
            />
            <RestuarantCartActionSheet
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
              restuarantCart={isRestuarantCart?.data}
              setRestuarantID={setRestuarantID}
              restuarantID={restuarantID}
              restuarantName={restuarantName}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          </Fragment>
        )}
      </ScrollView>
    </Box>
  );
};

export default Cart;
