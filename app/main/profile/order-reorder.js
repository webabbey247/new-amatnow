import { useState } from "react";
import { Box, useColorMode, ScrollView } from "native-base";
import { OrderReOrderToggle } from "../../../components/toggles";
import { OrderHistoryCardSkeleton } from "../../../components/skeleton";
import { useGetAllOrdersQuery } from "../../../redux/cart/cartApiSlice";
import { OrderHistoryList } from "../../../components/sliders";
import { NoOrderHistoryCard } from "../../../components/general";

const OrderReOrderPage = () => {
  const { colorMode } = useColorMode();
  const [activeOrder, setActiveOrder] = useState(true);
  const [deliveredOrder, setDeliveredOrder] = useState(false);
  const [cancelledOrder, setCancelledOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Active");
  const [pageNumber, setPageNumber] = useState(1);
  const placeholderData = new Array(6).fill("");

  const {
    data: isAllOrderData,
    isLoading,
    isFetching,
  } = useGetAllOrdersQuery({
    page: pageNumber,
    status: orderStatus,
  });

  return (
    <Box
      h="100%"
      maxHeight="100%"
      flex="1"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <OrderReOrderToggle
        activeOrder={activeOrder}
        setActiveOrder={setActiveOrder}
        deliveredOrder={deliveredOrder}
        setDeliveredOrder={setDeliveredOrder}
        cancelledOrder={cancelledOrder}
        setCancelledOrder={setCancelledOrder}
        setOrderStatus={setOrderStatus}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
        px="4"
      >
        {isLoading || isFetching ? (
          placeholderData.map((index) => {
            return <OrderHistoryCardSkeleton key={index} />;
          })
        ) : !isAllOrderData?.data.length ? (
          <NoOrderHistoryCard />
        ) : (
          <OrderHistoryList
            orderData={isAllOrderData?.data}
            orderStatus={orderStatus}
          />
        )}
      </ScrollView>
    </Box>
  );
};

export default OrderReOrderPage;
