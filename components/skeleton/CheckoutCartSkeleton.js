import { Center, Skeleton, HStack, Stack } from "native-base";
import { setHeight, setWidth } from "../../utils/helper";
const CheckoutCartSkeleton = () => {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="space-between"
      my={2}
      w="100%"
    >
      <Stack flexDirection="row">
        <Skeleton borderRadius="8" w={setWidth(23)} h={setHeight(11.5)} />
        <HStack
          bg="white.200"
          w={setWidth(20)}
          h={setHeight(4)}
          rounded="full"
          position="absolute"
          bottom="10%"
          left="2%"
          justifyContent="space-between"
          py={0.5}
        />
        <Center justifyContent="center" alignItems="flex-start" ml={4} w="60%">
          <Skeleton.Text p="2" lines={2} />
          <Skeleton.Text p="2" lines={1} w="30%" />
        </Center>
      </Stack>

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

export default CheckoutCartSkeleton;
