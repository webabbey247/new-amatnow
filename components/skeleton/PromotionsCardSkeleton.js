import { Skeleton, HStack, Box } from "native-base";
import { setWidth, setHeight } from "../../utils/helper";

const PromotionsCardSkeleton = () => {
  return (
    <Box my="6" space="4">
      <Skeleton
        startColor="grey.500"
        endColor="warmGray.50"
        h={setHeight(20)}
        borderRadius="8"
        w="100%"
        maxW="100%"
      />
      <Skeleton.Text p="2" lines={1} w={setWidth(30)} />
      <Skeleton.Text p="2" lines={1} w={setWidth(60)} />
    </Box>
  );
};

export default PromotionsCardSkeleton;
