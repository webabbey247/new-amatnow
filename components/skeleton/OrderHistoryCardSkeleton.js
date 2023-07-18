import { Stack, HStack, Center, VStack, Skeleton } from "native-base";
import { setHeight, setWidth } from "../../utils/helper";

const OrderHistoryCardSkeleton = () => {
  return (
    <VStack
      bg="grey.500"
      py="4"
      px="4"
      my="2"
      borderRadius="8"
      borderColor="grey.500"
      borderWidth="1"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Stack direction="row" space="3">
          <Skeleton rounded="full" h={setHeight(5)} w={setWidth(12)} />
          <Center>
            <Skeleton.Text p="2" lines={1} w={setWidth(50)} />
          </Center>
        </Stack>
        <Skeleton.Text p="2" lines={1} w={setWidth(10)} />
      </HStack>
      <VStack my="2" space="4">
        <Skeleton.Text p="2" lines={1} w={setWidth(80)} />
        <Skeleton.Text p="2" lines={1} w={setWidth(50)} />
        <Skeleton rounded="full" h={setHeight(4.5)} w={setWidth(20)} />
      </VStack>
    </VStack>
  );
};

export default OrderHistoryCardSkeleton;
