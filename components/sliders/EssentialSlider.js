import { Fragment, useState } from "react";
import { FlatList, HStack } from "native-base";
import { useGetAllRestuarantQuery } from "../../redux/restuarant/restaurantApiSlice";
import { HomeRestuarantCard } from "../general";
import { HomeCardSkeleton } from "../skeleton";
import { SectionTitle } from "../headings";
import { setWidth, setHeight } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setEssentialsRestuarant } from "../../redux/restuarant/restuarantSlice";

const EssentialSlider = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { latitude, longitude } = useSelector((state) => state.general);
  const placeholderData = new Array(6).fill("");

  const {
    data: isEssentialsData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetAllRestuarantQuery({
    slug: "speciality=essentials",
    page: page,
    long: longitude,
    lat: latitude,
  });

  // console.log("hello essentials:", isEssentialsData);
  // console.log("hello essentials latitude:", latitude);
  // console.log("hello essentials longitude:", longitude);

  return (
    <Fragment>
      <SectionTitle title="Get Essentials and More" path="" slug="essentials" />
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
      ) : !isEssentialsData?.data.length ? (
        dispatch(setEssentialsRestuarant(false))
      ) : (
        <HStack justifyContent="space-between" bg="white.500" py={2}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={isEssentialsData?.data || []}
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
                pageType="store"
              />
            )}
          />
        </HStack>
      )}
    </Fragment>
  );
};

export default EssentialSlider;
