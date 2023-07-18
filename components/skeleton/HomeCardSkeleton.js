import { Skeleton, HStack, VStack, Stack } from "native-base";
import { setWidth } from "../../utils/helper";

const HomeCardSkeleton = ({ height, width, id, typeUrl }) => {
  return (
    <VStack
      bg="white.500"
      py={2}
      mx={typeUrl === "restuarant" ? null : 2}
      key={id}
    >
      <Skeleton
        startColor="grey.500"
        endColor="warmGray.50"
        h={height}
        borderRadius="8"
        w={width}
        maxW="100%"
      />
      <HStack justifyContent="space-between" my={2}>
        <Skeleton.Text p="1.5" lines={2} w={setWidth(50)} />
       <Stack flexDirection="column" space="1.5">
       <Skeleton
          startColor="grey.500"
          endColor="warmGray.50"
          w={5}
          h={5}
          borderRadius={100}
        />
         <Skeleton
          startColor="grey.500"
          endColor="warmGray.50"
          w={5}
          h={5}
          borderRadius={100}
        />
       </Stack>
      </HStack>
    </VStack>
  );
};

export default HomeCardSkeleton;
