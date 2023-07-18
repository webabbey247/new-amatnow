import { Stack, FlatList, Text, VStack } from "native-base";
import { SectionTitle } from "../headings";
import { RestuarantReviewCard } from "../general";
import { useGetSingleRestuarantReviewsQuery } from "../../redux/restuarant/restaurantApiSlice";
import { Fragment } from "react";
useGetSingleRestuarantReviewsQuery;
import { restuarantCategoryData } from "../../constants/mock";
import { ReviewCardSkeleton } from "../skeleton";

const RestuarantReviewSlider = ({ restuarantID }) => {
  const {
    data: isReviewData,
    isLoading,
    isFetching,
  } = useGetSingleRestuarantReviewsQuery(restuarantID);
  // console.log("hello reviews", isReviewData?.data.data)

  return (
    <Fragment>
      <VStack px={4} mt={-4} py={2}>
        <SectionTitle title="Reviews" path="" />
        {isLoading || isFetching ? (
          <Stack flexDirection="row" justifyContent="flex-start">
            {/* <Text>Hello</Text> */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={restuarantCategoryData}
              keyExtractor={(item) => item?.id}
              vertical
              renderItem={({ item }) => <ReviewCardSkeleton item={item} />}
            />
          </Stack>
        ) : (
          <Stack flexDirection="row" justifyContent="flex-start">
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={isReviewData?.data.data || []}
              keyExtractor={(item) => item?.id}
              vertical
              renderItem={({ item }) => <RestuarantReviewCard item={item} />}
            />
          </Stack>
        )}
      </VStack>
    </Fragment>
  );
};

export default RestuarantReviewSlider;
