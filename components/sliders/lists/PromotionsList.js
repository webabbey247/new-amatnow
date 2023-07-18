import { Fragment, FlatList } from "react";
import { PromotionsCard, NoPromotionsCard } from "../../general";

const PromotionsList = ({ promotionData }) => {
  return (
    <Fragment>
      {promotionData?.length < 1 ? (
        <NoPromotionsCard />
      ) : (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={promotionData}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <PromotionsCard
              // restuarantName={item?.restaurant.name}
              // totatNairaPrice={item?.total_in_naira}
              // restuarantID={item?.restaurant.id}
              // referenceID={item?.reference}
              // createdDate={item?.created_at}
              id={item?.id}
            />
          )}
        />
      )}
    </Fragment>
  );
};

export default PromotionsList;
