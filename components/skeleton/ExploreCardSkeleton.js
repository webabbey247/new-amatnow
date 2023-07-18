import { Skeleton } from "native-base";
import { setWidth, setHeight } from "../../utils/helper";

const ExploreCardSkeleton = () => {
  return (
    <Skeleton
      startColor="grey.500"
      endColor="warmGray.50"
      w={setWidth(44)}
      h={setHeight(20)}
      borderRadius={8}
      mr={4}
      mb={6}
    />
  );
};

export default ExploreCardSkeleton;
