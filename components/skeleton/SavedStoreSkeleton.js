import { HStack, Stack, Skeleton } from "native-base";

const SavedStoreSkeleton = () => {
  return (
    <HStack justifyContent="space-between" py={3}>
      <Stack direction="row" justifyContent="flex-start" w="50%">
        <Skeleton
          startColor="grey.500"
          endColor="warmGray.50"
          h="60"
          rounded="full"
          maxW="100%"
          w="60"
        />
        <Skeleton.Text p="2" lines={2} />
      </Stack>
      <Skeleton
        startColor="grey.500"
        endColor="warmGray.50"
        size={5}
        rounded="full"
      />
    </HStack>
  );
};

export default SavedStoreSkeleton;
