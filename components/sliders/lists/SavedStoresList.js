import { Fragment } from "react";
import { FlatList, Text } from "native-base";
import { CircularCard } from "../../general";
import { useGetAllRestuarantQuery } from "../../../redux/restuarant/restaurantApiSlice";

const SavedStoresList = () => {
  const {
    data: isFavoriteData,
    isLoading,
    isFetching,
  } = useGetAllRestuarantQuery("favorite");
  return (
    <Fragment>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={isFavoriteData?.data || []}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <CircularCard
            restuarantID={item?.id}
            favorite={item?.is_favourite}
            title={item?.name}
            coverImage={item?.cover_image}
            reviews={item?.reviews}
            ratings={item?.rating}
            prepTime={item?.duration}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        )}
      />
    </Fragment>
  );
};

export default SavedStoresList;
