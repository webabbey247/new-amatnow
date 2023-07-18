import { Fragment } from "react";
import { Image, VStack, Text, Skeleton } from "native-base";
import images from "../../../constants/images";
import { setHeight, setWidth } from "../../../utils/helper";

const RestuarantCategorCard = ({ title, icon, isLoading }) => {
  return (
    <Fragment>
      {isLoading ? (
        <VStack bg="white.500" py={2} maxW="150" mx="2">
          <Skeleton
            startColor="grey.500"
            endColor="warmGray.50"
            w={setWidth(40)}
            h={setHeight(20)}
            borderRadius="8px"
          />
          <Skeleton.Text p="2" lines={1} />
        </VStack>
      ) : (
        <VStack bg="white.500" py={1} maxW="130" mr={4}>
          <Image
            w={setWidth(40)}
            h={setHeight(20)}
            borderRadius="8"
            source={images[icon]}
            resizeMode="cover"
            alt={title}
          />
          <Text
            position="absolute"
            bottom="15"
            left="15"
            fontSize="16"
            lineHeight="24"
            fontWeight="500"
            color="white.500"
            letterSpacing="0.165"
          >
            {title}
          </Text>
        </VStack>
      )}
    </Fragment>
  );
};

export default RestuarantCategorCard;
