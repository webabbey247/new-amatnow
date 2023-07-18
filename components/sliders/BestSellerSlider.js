import { Fragment, useEffect, useState } from "react";
import { FlatList, HStack, useDisclose } from "native-base";
import { HomeCardSkeleton } from "../skeleton";
import { SectionTitle } from "../headings";
import { setWidth, setHeight } from "../../utils/helper";
import { useGetAllRestuarantQuery } from "../../redux/restuarant/restaurantApiSlice";
import { HomeRestuarantCard } from "../general";
import { useDispatch, useSelector } from "react-redux";
import { setBestSellerRestuarant } from "../../redux/restuarant/restuarantSlice";

const BestSellerSlider = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { latitude, longitude } = useSelector((state) => state.general);
  const placeholderData = new Array(6).fill("");

  const {
    data: isBestSeller,
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllRestuarantQuery({
    slug: "top_sellers=true",
    page: page,
    long: longitude,
    lat: latitude,
  });
  // console.log("hello bestSeller:", isBestSeller);
  // console.log("hello bestSeller latitude:", latitude);
  // console.log("hello bestSeller longitude:", longitude);

  useEffect(() => {}, [latitude, longitude]);
  return (
    <Fragment>
      <SectionTitle
        title="Best Sellers"
        path="main/restuarant/restuarant-category"
        slug="top_sellers"
      />
      {isLoading || isFetching ? (
        <HStack justifyContent="space-between" bg="white.500" py={2} flex={1}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={placeholderData}
            horizontal
            renderItem={(index) => (
              <HomeCardSkeleton
                id={index}
                width={setWidth(65)}
                height={setHeight(18)}
                typeUrl=""
              />
            )}
          />
        </HStack>
      ) : !isBestSeller?.data.length ? (
        dispatch(setBestSellerRestuarant(false))
      ) : (
        <HStack justifyContent="space-between" bg="white.500" py={2} flex={1}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={isBestSeller?.data || []}
            keyExtractor={(item) => item?.id}
            horizontal
            renderItem={({ item }) => (
              <HomeRestuarantCard
                restuarantID={item?.id}
                width={setWidth(65)}
                height={setHeight(18)}
                title={item?.name}
                favorite={item?.is_favourite}
                coverImage={item?.cover_image}
                reviews={item?.reviews}
                ratings={item?.rating}
                isOpen={item?.is_open}
                prepTime={item?.duration}
                loading={isLoading}
                fetching={isFetching}
                success={isSuccess}
                isError={isError}
                error={error}
                pageType="restuarant"
              />
            )}
          />
        </HStack>
      )}
    </Fragment>
  );
};

export default BestSellerSlider;
