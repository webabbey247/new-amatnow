import { Center, HStack, Stack, Skeleton } from "native-base";
import { setWidth, setHeight } from "../../utils/helper";

const UserProfileCardSkeleton = () => {
  return (
    <Center justifyContent="flex-start" alignItems="flex-start">
      <HStack py={4}>
        <Skeleton
          startColor="grey.500"
          endColor="warmGray.50"
          w={setWidth(20)}
          h={setHeight(10)}
          borderRadius="8"
          maxW="100%"
        />
        <Stack flexDirection="column" ml={4}>
          <Skeleton.Text p="2" lines={1} w={setWidth(50)} />
          <Skeleton.Text p="2" lines={1} w={setWidth(30)} />
        </Stack>
      </HStack>
    </Center>
  );
};

export default UserProfileCardSkeleton;
