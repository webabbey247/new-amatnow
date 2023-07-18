import { Skeleton, HStack } from "native-base";
import { setHeight } from "../../utils/helper";

const CheckoutSummaryCardSkeleton = () => {
  return (
    <HStack justifyContent="space-between">
      <Skeleton
        h={setHeight(3)}
        w="70%"
        borderRadius="8"
        startColor="grey.500"
        endColor="warmGray.50"
      />
      <Skeleton
        startColor="grey.500"
        endColor="warmGray.50"
        w={8}
        h={8}
        borderRadius={100}
        mb={6}
      />
    </HStack>
  );
};

export default CheckoutSummaryCardSkeleton;
