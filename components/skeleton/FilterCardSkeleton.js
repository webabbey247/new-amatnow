import { Skeleton } from "native-base";
import { setWidth, setHeight } from "../../utils/helper";

const FilterCardSkeleton = () => {
  return (
    <Skeleton
      mr={3}
      endColor="warmGray.50"
      startColor="grey.500"
      py={2}
      px={6}
      rounded="full"
      borderRadius={8}
      w={setWidth(25)}
      h={setHeight(4)}
      my={3}
    />
  );
};

export default FilterCardSkeleton;
