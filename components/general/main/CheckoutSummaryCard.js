import { Fragment } from "react";
import { Text, VStack, HStack, Stack, Heading } from "native-base";
import { useSelector } from "react-redux";
import { useGetCartQuery } from "../../../redux/cart/cartApiSlice";
import { CheckoutSummaryCardSkeleton } from "../../skeleton";

const CheckoutSummaryCard = ({ delivery, isLoading, isFetching, cartData }) => {
  const { riderTips } = useSelector((state) => state.cart);
  // const {
  //   data: cartData,
  //   isLoading,
  //   isFetching,
  // } = useGetCartQuery({
  //   restuarantID: restuarantID,
  //   identifierID: "",
  // });
  // eslint-disable-next-line radix
  const deliveryCost = delivery ? parseInt(cartData?.deliveryCost) : 0;
  // eslint-disable-next-line radix
  const riderTipAmount = delivery ? parseInt(riderTips) : 0;
  const totalCartValue = cartData?.cartTotal + deliveryCost + riderTipAmount;

  return (
    <Stack flexDirection="column" my={4}>
      {isLoading || isFetching ? (
        <Fragment>
          <CheckoutSummaryCardSkeleton />
          <CheckoutSummaryCardSkeleton />
          <CheckoutSummaryCardSkeleton />
          <CheckoutSummaryCardSkeleton />
          <CheckoutSummaryCardSkeleton />
        </Fragment>
      ) : (
        <VStack>
          <Heading
            py={2}
            fontSize="18"
            lineHeight="24"
            letterSpacing="-0.165"
            fontWeight="800"
            textAlign="left"
            textTransform="capitalize"
          >
            Summary
          </Heading>
          <HStack my={2.5} justifyContent="space-between">
            <Text
              fontSize="14"
              lineHeight="20"
              fontWeight="400"
              letterSpacing="-0.165"
              color="black.500"
            >
              Subtotal
            </Text>
            <Text
              fontSize="14"
              lineHeight="20"
              fontWeight="400"
              letterSpacing="-0.165"
              color="black.500"
            >
              {!cartData ? "N0.00" : `N${cartData?.cartTotal}`}
            </Text>
          </HStack>
          {delivery ? (
            <Fragment>
              <HStack my={2.5} justifyContent="space-between">
                <Text
                  fontSize="14"
                  lineHeight="20"
                  fontWeight="400"
                  letterSpacing="-0.165"
                  color="black.500"
                >
                  Delivery Fee
                </Text>
                <Text
                  fontSize="14"
                  lineHeight="20"
                  fontWeight="400"
                  letterSpacing="-0.165"
                  color="black.500"
                >
                  {!cartData ? "N0.00" : `N${cartData?.deliveryCost}`}
                </Text>
              </HStack>
              <HStack my={2.5} justifyContent="space-between">
                <Text
                  fontSize="14"
                  lineHeight="20"
                  fontWeight="400"
                  letterSpacing="-0.165"
                  color="black.500"
                >
                  Rider Tips
                </Text>
                <Text
                  fontSize="14"
                  lineHeight="20"
                  fontWeight="400"
                  letterSpacing="-0.165"
                  color="black.500"
                >
                  {`N${riderTips}`}
                </Text>
              </HStack>
            </Fragment>
          ) : null}

          <HStack my={2.5} justifyContent="space-between">
            <Text
              fontSize="14"
              lineHeight="20"
              fontWeight="400"
              letterSpacing="-0.165"
              color="black.500"
            >
              Fees & Taxes
            </Text>
            <Text
              fontSize="14"
              lineHeight="20"
              fontWeight="400"
              letterSpacing="-0.165"
              color="black.500"
            >
              {!cartData ? "N0.00" : "N0.00"}
            </Text>
          </HStack>
          <HStack my={2.5} justifyContent="space-between">
            <Text
              fontSize="14"
              lineHeight="20"
              fontWeight="500"
              letterSpacing="-0.165"
              color="black.500"
            >
              Total
            </Text>
            <Text
              fontSize="14"
              lineHeight="20"
              fontWeight="500"
              letterSpacing="-0.165"
              color="black.500"
            >
              {!cartData ? "N0.00" : `N${totalCartValue}`}
            </Text>
          </HStack>
        </VStack>
      )}
    </Stack>
  );
};
export default CheckoutSummaryCard;
