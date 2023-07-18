import { Fragment, useEffect, useState } from "react";
import { FlatList, HStack, Text } from "native-base";
import { useGetAllRestuarantQuery } from "../../redux/restuarant/restaurantApiSlice";
import { HomeRestuarantCard } from "../general";
import { HomeCardSkeleton } from "../skeleton";
import { SectionTitle } from "../headings";
import { setWidth, setHeight } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setNearbyRestuarant } from "../../redux/restuarant/restuarantSlice";

const NearbyStoreSlider = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { latitude, longitude } = useSelector((state) => state.general);
  const placeholderData = new Array(6).fill("");

  const {
    data: isNearbyData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetAllRestuarantQuery({
    slug: "near_you=true",
    page: page,
    long: longitude,
    lat: latitude,
  });

  // console.log("hello nearby:", isNearbyData?.data.length < 1);

  useEffect(() => {
    if (!isLoading || !isFetching) {
      isNearbyData?.data.length < 1
        ? dispatch(setNearbyRestuarant(false))
        : null;
    }
  }, [isNearbyData]);

  return (
    <Fragment>
      <SectionTitle title="Near you" path="" slug="" />
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
      ) : isNearbyData?.data.length < 1 ? (
        <Text>No entry found</Text>
      ) : (
        <HStack justifyContent="space-between" bg="white.500" py={2}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={isNearbyData?.data || []}
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
              />
            )}
          />
        </HStack>
      )}
    </Fragment>
  );
};

export default NearbyStoreSlider;
