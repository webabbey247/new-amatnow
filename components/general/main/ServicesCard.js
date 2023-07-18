import { Fragment } from "react";
import {
  VStack,
  Text,
  Image,
  Skeleton,
  Pressable,
  Center,
  HStack,
} from "native-base";
import icons from "../../../constants/icons";
import { useRouter } from "expo-router";
import { setWidth, setHeight } from "../../../utils/helper";
const ServicesCard = ({ title, icon, id, loading, path }) => {
  const router = useRouter();
  return (
    <Fragment>
      {loading ? (
        <VStack
          space="1"
          key={id}
          id={id}
          mr={2}
          justifyContent="center"
          alignItems="center"
        >
          <Skeleton
            startColor="grey.500"
            endColor="warmGray.50"
            w={setWidth(20)}
            h={setHeight(10)}
            rounded={"full"}
          />
          <Skeleton.Text p="2" lines={1} />
        </VStack>
      ) : (
        <HStack space={2} key={id} id={id} mr={5}>
          <Pressable onPress={() => router.push(`${path}`)}>
            <Center
              justifyContent="center"
              alignItems="center"
              bg="grey.500"
              w={setWidth(16)}
              h={setHeight(8)}
              rounded={"full"}
            >
              <Image
                resizeMode="contain"
                source={icons[icon]}
                alt={title}
                w={setWidth(13)}
                h={setHeight(13)}
              />
            </Center>
            <Text
              my={2}
              textAlign="center"
              fontSize="14"
              lineHeight="20"
              letterSpacing="-0.165"
              fontWeight="700"
              textTransform="none"
              color="black.500"
            >
              {title}
            </Text>
          </Pressable>
        </HStack>
      )}
    </Fragment>
  );
};

export default ServicesCard;
