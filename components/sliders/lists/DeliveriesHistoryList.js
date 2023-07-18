import { Fragment, useState } from "react";
import { FlatList } from "native-base";
import { OrderHistoryCardSkeleton } from "../../skeleton";
import { DeliveriesHistoryCard, NoOrderHistoryCard } from "../../general";
import { useGetDeliveriesHistoryQuery } from "../../../redux/cart/cartApiSlice";

const DeliveriesHistoryList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const placeholderData = new Array(6).fill("");

  const {
    data: isDeliveryData,
    isLoading,
    isFetching,
  } = useGetDeliveriesHistoryQuery({
    page: pageNumber,
  });
  return (
    <Fragment>
      {isLoading || isFetching ? (
        placeholderData.map((index) => {
          return <OrderHistoryCardSkeleton key={index} />;
        })
      ) : isDeliveryData?.data.length < 1 ? (
        <NoOrderHistoryCard />
      ) : (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={isDeliveryData?.data}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <DeliveriesHistoryCard
            receiverFullName={item?.receiver_full_name}
            paymentMethod={item?.payment_method}
              totatNairaPrice={item?.total_in_naira}
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

export default DeliveriesHistoryList;
