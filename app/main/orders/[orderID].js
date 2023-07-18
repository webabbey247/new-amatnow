import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Text,
  useColorMode,
  ScrollView,
  Center,
  Image,
  VStack,
  Badge,
  Divider,
  HStack,
  Spinner,
} from "native-base";
import { Stack, useSearchParams } from "expo-router";
import {
  useGetSingleOrderQuery,
  useLazyGetSingleOrderQuery,
} from "../../../redux/cart/cartApiSlice";
import icons from "../../../constants/icons";
import { setWidth, setHeight } from "../../../utils/helper";
import {
  OrderCompleteSummaryList,
  OrderMiniSummaryList,
} from "../../../components/sliders";
import {
  OrderMiniSummaryHeader,
  OrderCompleteSummaryHeader,
  CustomHeader,
} from "../../../components/headings";

const OrderSummaryPage = () => {
  const { colorMode } = useColorMode();
  const params = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderStatus, setOrderStatus] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [
    getSingleOrder,
    { data: isSingleOrderData, isLoading, isFetching, isSuccess },
  ] = useLazyGetSingleOrderQuery();

  const fetchOrderData = async () => {
    try {
      console.log("Fetching data...");
      const orderResponse = await getSingleOrder(params.orderID);
      return orderResponse;
    } catch (err) {
      console.log("Error data:", err);
    }
  };

  useEffect(() => {
    fetchOrderData();
    let interval;
    if (isSuccess) {
      console.log("hello isSuccess Order", isSingleOrderData);
      if (
        isSingleOrderData?.status !== "CANCELLED" &&
        isSingleOrderData?.status !== "DELIVERED"
      ) {
        fetchOrderData();
        interval = setInterval(fetchOrderData, 15000);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <Box
      flex={1}
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <CustomHeader />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        flex={1}
        px="4"
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        {/* <VStack>
          {showDetails ? (
            <Fragment>
              <OrderCompleteSummaryHeader
                referenceID={isSingleOrderData?.reference}
                orderStatus={orderStatus}
              />
              <OrderCompleteSummaryList
                paymentMethod={isSingleOrderData?.payment_method}
                totalAmount={isSingleOrderData?.total_in_naira}
                deliveryFee={isSingleOrderData?.delivery_fee}
                riderTips={isSingleOrderData?.rider_tip}
                deliveryNote={isSingleOrderData?.note}
                setShowDetails={setShowDetails}
                rider={isSingleOrderData?.rider}
                menu={isSingleOrderData?.menu}
                restuarant={isSingleOrderData?.restaurant}
              />
            </Fragment>
          ) : (
            <Fragment>
              <OrderMiniSummaryHeader
                referenceID={isSingleOrderData?.reference}
                orderStatus={orderStatus}
              />
              <OrderMiniSummaryList
                restuarant={isSingleOrderData?.restaurant}
                rider={isSingleOrderData?.rider}
                orderStatus={orderStatus}
                setShowDetails={setShowDetails}
              />
            </Fragment>
          )}
        </VStack> */}
        {isLoading || isFetching ? (
          <Center flex="1">
            <Spinner color="red.500" size="sm" />
          </Center>
        ) : (
          <VStack>
            {showDetails ? (
              <Fragment>
                <OrderCompleteSummaryHeader
                  referenceID={isSingleOrderData?.reference}
                  orderStatus={isSingleOrderData?.status}
                />
                <OrderCompleteSummaryList
                  paymentMethod={isSingleOrderData?.payment_method}
                  totalAmount={isSingleOrderData?.total_in_naira}
                  deliveryFee={isSingleOrderData?.delivery_fee}
                  riderTips={isSingleOrderData?.rider_tip}
                  deliveryNote={isSingleOrderData?.note}
                  setShowDetails={setShowDetails}
                  rider={isSingleOrderData?.rider}
                  menu={isSingleOrderData?.menu}
                  restuarant={isSingleOrderData?.restaurant}
                  orderStatus={isSingleOrderData?.status}
                  id={isSingleOrderData?.id}
                />
              </Fragment>
            ) : (
              <Fragment>
                <OrderMiniSummaryHeader
                  referenceID={isSingleOrderData?.reference}
                  orderStatus={isSingleOrderData?.status}
                />
                <OrderMiniSummaryList
                  restuarant={isSingleOrderData?.restaurant}
                  rider={isSingleOrderData?.rider}
                  orderStatus={isSingleOrderData?.status}
                  setShowDetails={setShowDetails}
                />
              </Fragment>
            )}
          </VStack>
        )}
      </ScrollView>
    </Box>
  );
};

export default OrderSummaryPage;
