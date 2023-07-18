import { Fragment } from "react";
import {
  VStack,
  HStack,
  Stack,
  Image,
  Text,
  Heading,
  Icon,
  Pressable,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { setWidth, setHeight } from "../../../utils/helper";
import { useRouter } from "expo-router";
import { SavedStoreSkeleton } from "../../skeleton";

const CircularCard = ({
  restuarantID,
  title,
  coverImage,
  prepTime,
  reviews,
  favorite,
  isLoading,
  isFetching,
  pageType,
}) => {
  const router = useRouter();
  return (
    <Fragment>
      {isLoading || isFetching ? (
        <SavedStoreSkeleton />
      ) : (
        <Pressable
          onPress={() =>
            // router.push(`/main/restuarant/restuarant-details/${restuarantID}/?title=${pageType}`)
            router.push(`/main/restuarant/restuarant-details/${restuarantID}/?title=${pageType}`)
            
          }
        >
          <HStack justifyContent="space-between" py={3}>
            <Stack direction="row" justifyContent="flex-start" w="70%">
              <Image
                h={setHeight(7)}
                w={setWidth(14)}
                rounded="full"
                maxW={setWidth(14)}
                source={{
                  uri: coverImage,
                }}
                resizeMode="cover"
                alt={title}
              />
              <VStack ml={3}>
                <Heading
                  isTruncated
                  fontSize="16"
                  lineHeight="24"
                  fontWeight="700"
                  color="black.500"
                  letterSpacing="-0.165"
                >
                  {title}
                </Heading>
                <Text
                  fontSize="14"
                  lineHeight="22"
                  fontWeight="400"
                  color="black.500"
                  letterSpacing="-0.165"
                >
                  {prepTime ? prepTime : 0} mins<Text>. {reviews} Reviews</Text>
                </Text>
              </VStack>
            </Stack>
            <Icon
              as={FontAwesome}
              name="heart"
              size={5}
              color={favorite ? "red.500" : "grey.700"}
            />
          </HStack>
        </Pressable>
      )}
    </Fragment>
  );
};

export default CircularCard;
