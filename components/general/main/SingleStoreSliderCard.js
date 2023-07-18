import { View, Text, VStack, FlatList } from "native-base";
import { StoreMenuSlider } from "../../sliders";
const SingleStoreSliderCard = ({ responseData, restuarantID }) => {
  return (
    <VStack justifyContent="space-between" bg="white.500" py={2}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={responseData || []}
        keyExtractor={(item) => item?.id}
        vertical
        renderItem={({ item }) => (
          <StoreMenuSlider
            menuID={item?.id}
            menuCategoryName={item?.name}
            restuarantID={restuarantID}
            //   width={setWidth(45)}
            //   height={setHeight(15)}
            //   setMenuCategoryID={setMenuCategoryID}
            //   restuarantID={restuarantID}
            //   id={item?.id}
            //   title={item?.name}
            //   cost={item?.price}
            //   image={item?.image}
            //   favorite={item?.is_favourite}
            //   loading={isLoading}
            //   fetching={isFetching}
            //   onOpen={onOpen}
            //   setMessage={setMessage}
            //   setShowAlert={setShowAlert}
            //   setAlertStatus={setAlertStatus}
            //   position=""
          />
        )}
      />
    </VStack>
  );
};

export default SingleStoreSliderCard;
