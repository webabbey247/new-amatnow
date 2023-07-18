import { Fragment, useState } from "react";
import { FlatList, HStack, Text } from "native-base";
import { setWidth, setHeight } from "../../utils/helper";
import { useGetAllRestuarantQuery } from "../../redux/restuarant/restaurantApiSlice";
import { HomeRestuarantCard } from "../general";
import { SectionTitle } from "../headings";
import { useSelector, useDispatch } from "react-redux";

const PopularProductSlider = () => {
  const [page, setPage] = useState(1);
  const { latitude, longitude } = useSelector((state) => state.general);
  const placeholderData = new Array(6).fill("");

  const {
    data: isPopularData,
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllRestuarantQuery({
    slug: "popular=true",
    page: page,
    long: longitude,
    lat: latitude,
  });
  return (
    <Fragment>
      <SectionTitle title="Most Ordered Products" path="" />
      <Text>No entry found</Text>
      {/* <HStack justifyContent="space-between" bg="white.500" py={2}> */}
      {/* <FlatList
          showsHorizontalScrollIndicator={false}
          data={isPopularData?.data || []}
          keyExtractor={(item) => item?.id}
          horizontal
          renderItem={({ item }) => (
            <RestuarantHomeCard
              restuarantID={item?.id}
              width={setWidth(65)}
              height={setHeight(18)}
              title={item?.name}
              coverImage={item?.cover_image}
              reviews={item?.reviews}
              ratings={item?.rating}
              isOpen={item?.is_open}
              prepTime={item?.duration}
              loading={isLoading || !bestSellerData}
              success={isSuccess}
              isError={isError}
              error={error}
            />
          )}
        /> */}
      {/* </HStack> */}
    </Fragment>
  );
};

export default PopularProductSlider;
