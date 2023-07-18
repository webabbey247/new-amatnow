import { Skeleton, HStack, Stack, Center } from "native-base";
import { setWidth, setHeight } from "../../utils/helper";

const CartCardSkeleton = () => {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="space-between"
      w="100%"
      mb="3"
    >
      <Stack flexDirection="row">
        <Skeleton borderRadius="8" w={setWidth(34)} h={setHeight(17)} />
        <Center justifyContent="center" alignItems="flex-start" ml={4} w="60%">
          <Skeleton.Text p="2" lines={2} />
          <Skeleton.Text p="2" lines={1} w="30%" />
          <Stack flexDirection="row" justifyContent="flex-start" py={2}>
            <Skeleton
              startColor="grey.500"
              endColor="warmGray.50"
              w={8}
              h={8}
              borderRadius={100}
            />
            <Skeleton.Text p="2" lines={1} w="20%" />
            <Skeleton
              startColor="grey.500"
              endColor="warmGray.50"
              w={8}
              h={8}
              borderRadius={100}
            />
          </Stack>
        </Center>
      </Stack>
    </HStack>
  );
};

export default CartCardSkeleton;
