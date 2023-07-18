import { Fragment } from "react";
import { FlatList, HStack, Text } from "native-base";
// import { useGetAllRestuarantQuery } from "../../redux/restuarant/restaurantApiSlice";
// import HomeRestuarantCard from "../general";
import { SectionTitle } from "../headings";
// import { setWidth, setHeight } from "../../utils/helper";

const BudgetFriendlySlider = () => {
  return (
    <Fragment>
      <SectionTitle title="Budget Friendly" path="" />
      <Text>No entry found</Text>
      {/* <HStack justifyContent="space-between" bg="white.500" py={2}> */}
      
        {/* <FlatList
          showsHorizontalScrollIndicator={false}
          data={bestSellerData?.data || []}
          keyExtractor={item => item?.id}
          horizontal
          renderItem={({item}) => (
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

export default BudgetFriendlySlider;
