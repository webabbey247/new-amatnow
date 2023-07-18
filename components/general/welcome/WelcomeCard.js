import { Image, Text, Stack, Heading } from "native-base";
import images from "../../../constants/images";
import { setWidth, setHeight } from "../../../utils/helper";

const WelcomeCard = ({ title, content, image }) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItem="center"
      w="300"
    >
      <Image
        height={setHeight(40)}
        width={setWidth(80)}
        source={images[image]}
        alt={title}
        resizeMode="contain"
      />
      <Heading
        fontSize="18"
        lineHeight="24"
        fontWeight="800"
        letterSpacing="-0.165"
        textAlign="center"
      >
        {title}
      </Heading>
      <Text
        py="2"
        fontSize="14"
        lineHeight="20"
        letterSpacing="-0.165"
        color="grey.600"
        fontWeight="400"
        textAlign="center"
      >
        {content}
      </Text>
    </Stack>
  );
};

export default WelcomeCard;
