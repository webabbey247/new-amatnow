import { Fragment } from "react";
import {
  IconButton,
  HStack,
  Box,
  Text,
  Actionsheet,
  Image,
  Center,
  VStack,
  Skeleton,
} from "native-base";
import { setHeight } from "../../utils/helper";
const MenuDetailsASSkeleton = () => {
  return (
    <Fragment>
      <VStack w="100%" flex={1}>
        <Skeleton
          startColor="grey.500"
          endColor="warmGray.50"
          w="100%"
          h={setHeight(20)}
          borderRadius="8"
          maxW="100%"
        />
        <Skeleton
          rounded="full"
          position="absolute"
          startColor="grey.500"
          endColor="warmGray.50"
          top="30"
          left="5"
          w="10"
          h="10"
        />
        <Skeleton.Text
          p={2}
          startColor="grey.500"
          endColor="warmGray.50"
          mt={3}
        />
      </VStack>
      <VStack px={4} w="100%" flex={0.3}>
        <Center mt={4}>
          <Skeleton
            startColor="grey.500"
            endColor="warmGray.50"
            w="100%"
            mt="3"
            h={setHeight(7)}
            rounded="full"
            maxW="100%"
          />
        </Center>
      </VStack>
    </Fragment>
  );
};

export default MenuDetailsASSkeleton;
