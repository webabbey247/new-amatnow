import { useState } from "react";
import { Text, Actionsheet, Heading, Box, VStack } from "native-base";
import { setHeight } from "../../utils/helper";
import StarRating from "react-native-star-rating-widget";

const RatingsActionSheets = ({ isOpen, onClose, setSlug }) => {
  const [rating, setRating] = useState(0);

  const handleRestuarantRating = (number) => {
    console.log("hello Rating:", number);
    setRating(number);
    setSlug(`rating=${number}`);
    onClose();
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content h={setHeight(20)} bg="white.500">
        <Box
          py="2"
          px="4"
          flex={1}
          bg="white.500"
          justifyContent="flex-start"
          alignItems="flex-start"
          w="100%"
        >
          <Heading
            fontSize="16"
            lineHeight="24"
            letterSpacing="-0.165"
            color="black.500"
            fontWeight="700"
            mb="3"
            textTransform="capitalize"
          >
            Filter by ratings
          </Heading>
          <StarRating
          enableHalfStar={false}
            enableSwiping={true}
            rating={rating}
            starSize="40"
            color="#D93622"
            emptyColor="#A7AAA9"
            onChange={(number) => handleRestuarantRating(number)}
          />
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default RatingsActionSheets;
