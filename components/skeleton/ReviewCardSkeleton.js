import { Skeleton, HStack, VStack } from "native-base";
import { setWidth, setHeight } from "../../utils/helper";

const ReviewCardSkeleton = ({ item }) => {
  return (
    <VStack
      key={item.id}
      mr={4}
      bg="warmGray.50"
      p={4}
      w={setWidth(80)}
      h={setHeight(19)}
      my={2}
    >
      <Skeleton.Text p="2" lines={1} w={setWidth(50)} />
      <HStack my={2} justifyContent="space-between" alignItems="space-between">
        <Skeleton
          startColor="grey.500"
          endColor="warmGray.50"
          w={6}
          h={6}
          borderRadius={100}
        />
        <Skeleton.Text p="2" lines={1} w={setWidth(30)} />
      </HStack>

      <Skeleton
        startColor="grey.500"
        endColor="warmGray.50"
        h={setHeight(19)}
        borderRadius="8"
        maxW="100%"
      />
    </VStack>
  );
};

export default ReviewCardSkeleton;
