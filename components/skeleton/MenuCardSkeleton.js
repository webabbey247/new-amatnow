import { VStack, Skeleton } from "native-base";

const MenuCardSkeleton = ({ position, width, height }) => {
  return (
    <VStack my={2} pr={3}>
      <Skeleton
        startColor="grey.500"
        endColor="warmGray.50"
        h={height ? height : "100"}
        borderRadius="8"
        w={width ? width : "100"}
      />

      {position ? (
        <Skeleton
          position="absolute"
          bottom="10%"
          left="5"
          startColor="warmGray.200"
          endColor="warmGray.50"
          size={8}
          rounded="full"
        />
      ) : (
        <Skeleton
          position="absolute"
          bottom="10%"
          right="20%"
          startColor="warmGray.200"
          endColor="warmGray.50"
          size={5}
          rounded="full"
        />
      )}
    </VStack>
  );
};

export default MenuCardSkeleton;
