import { Center, Image, Heading, Text, VStack, Button } from "native-base";
import { setWidth, setHeight } from "../../../utils/helper";
import { Fragment } from "react";
import icons from "../../../constants/icons";

const NoRestuarantCard = () => {
  return (
    <Fragment>
      <Center flex={1} mb={3}>
        <Image
          w={setWidth(80)}
          h={setHeight(30)}
          source={icons.ONLINESTORE}
          alt="No Saved Item"
          resizeMode="contain"
        />
        <Heading
          fontSize="18"
          lienHeight="28"
          color="black.500"
          fontWeight="700"
          textAlign="center"
          mt={4}
          letterSpacing="-0.165"
        >
          We're coming soon
        </Heading>
        <Text
          fontSize="14"
          lienHeight="20"
          color="black.500"
          fontWeight="400"
          textAlign="center"
          px={12}
          letterSpacing="-0.165"
        >
          We are always expanding our coverage area. Please check back in the
          future.
        </Text>
      </Center>
    </Fragment>
  );
};

export default NoRestuarantCard;
