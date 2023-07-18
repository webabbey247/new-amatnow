import { Image, Center } from "native-base";
import images from "../../../constants/images";
import { setHeight, setWidth } from "../../../utils/helper";

const RestuarantAdsCard = ({ id, image }) => {
  return (
    <Center justifyContent="center" alignItems="center" mr={2} key={id}>
      <Image
        maxW="100%"
        w={setWidth(92)}
        h={setHeight(15)}
        source={images[image]}
        alt="ads"
        resizeMode="contain"
      />
    </Center>
  );
};

export default RestuarantAdsCard;
