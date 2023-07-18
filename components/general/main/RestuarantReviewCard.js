import { Center, VStack, Heading, HStack, Text, Stack } from "native-base";
import { setHeight, setWidth } from "../../../utils/helper";
import StarRating from "react-native-star-rating-widget";
import { formatDistance, subDays } from "date-fns";

const RestuarantReviewCard = ({ item }) => {
  return (
    <VStack
      key={item.id}
      mr={4}
      borderWidth={1}
      borderColor="grey.300"
      p={4}
      w={setWidth(80)}
      h={setHeight(19)}
      my={2}
    >
      <Heading
        fontSize="16"
        lineHeight="24"
        fontWeight="500"
        color="black.500"
        letterSpacing="-0.165"
        textTransform="capitalize"
      >
        {[item?.user.first_name, item?.user.last_name].join(" ")}
      </Heading>
      <HStack my={2}>
        <Stack flexDirection="row">
          <StarRating
            onChange={(e) => void e}
            enableSwiping={false}
            enableHalfStar={true}
            starSize={22}
            rating={item?.star}
          />
        </Stack>
        <Center mx={2} size={1} rounded={"full"} bg="black.500" mt={3} />
        <Text
          mt={0.5}
          fontSize="14"
          lineHeight="20"
          fontWeight="700"
          color="black.500"
          letterSpacing="-0.165"
        >
        {formatDistance(subDays(new Date(item?.created_at), 3), new Date(), { addSuffix: true })}

          {/* {format(new Date(item?.created_at), "yyyy-mm-dd")} */}
          {/* 3/25/22 */}
        </Text>
      </HStack>

      <Text
        istruncated
        noOfLines={2}
        fontSize="14"
        lineHeight="22"
        fontWeight="400"
        color="black.500"
        letterSpacing="-0.165"
      >
        {item?.comment}
      </Text>
    </VStack>
  );
};

export default RestuarantReviewCard;
