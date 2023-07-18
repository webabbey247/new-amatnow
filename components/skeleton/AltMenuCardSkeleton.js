import { Skeleton, HStack, Box, Stack, Center } from "native-base";
import { setHeight, setWidth } from "../../utils/helper";

const AltMenuCardSkeleton = () => {
  return (
    <HStack justifyContent="space-between" alignItems="space-between" mb={3}>
      <Center
        bg="white.500"
        justifyContent="flex-start"
        alignItems="flex-start"
        w={setWidth(50)}
        h={setHeight(15)}
      >
        <Skeleton.Text p="2" lines={1} w={setWidth(50)} />
        <Skeleton.Text p="2" lines={1} w={setWidth(30)} />
        <Skeleton.Text p="2" lines={1} w={setWidth(20)} />
      </Center>

      <Box>
        <Skeleton
          startColor="grey.500"
          endColor="warmGray.50"
          w={setWidth(30)}
          h={setHeight(15)}
          borderRadius="8"
        />
        <Skeleton
          position="absolute"
          bottom="10%"
          right="5%"
          startColor="warmGray.200"
          endColor="warmGray.50"
          size={8}
          rounded="full"
        />
      </Box>
    </HStack>
  );
};

export default AltMenuCardSkeleton;
