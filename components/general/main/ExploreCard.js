import { VStack, Center, Text, Image, Pressable } from "native-base";
import { setHeight, setWidth } from "../../../utils/helper";
import images from "../../../constants/images";
import { ExploreCardSkeleton } from "../../skeleton";

const ExploreCard = ({ title, image, loading }) => {
  return (
    <>
      {loading ? (
        <ExploreCardSkeleton />
      ) : (
        <Pressable
          onPress={() => console.log("Explroe info data not available")}
        >
          <VStack
            bg="white.500"
            maxW="100%"
            shadow={3}
            w={setWidth(44)}
            h={setHeight(20)}
            borderRadius={8}
            mr={4}
            mb={6}
          >
            <Image
              w={setWidth(44)}
              source={images[image]}
              h={setHeight(20)}
              alt={title}
              resizeMode="cover"
              borderRadius={8}
            />
            <Center
              position="absolute"
              bg="white.500"
              w="100%"
              py={2}
              mb={-1}
              bottom={0}
              borderBottomRadius={8}
            >
              <Text
                fontSize="14"
                lienHeight="20"
                color="black.500"
                fontWeight="500"
                letterSpacing="-0.165"
              >
                {title}
              </Text>
            </Center>
          </VStack>
        </Pressable>
      )}
    </>
  );
};

export default ExploreCard;
