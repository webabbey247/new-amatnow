import { HStack, Button } from "native-base";
import { welcomeData } from "../../../constants/mock";
const WelcomePagination = ({ index }) => {
  return (
    <HStack justifyContent="center" alignItems="center" my={4}>
      {[...Array(welcomeData.length).keys()].map((_, i) =>
        i === index ? (
          <Button bg="red.500" py="1" px="5" mx="1" key={i} />
        ) : (
          <Button bg="grey.500" py="1" px="5" mx="1" key={i} />
        )
      )}
    </HStack>
  );
};

export default WelcomePagination;
