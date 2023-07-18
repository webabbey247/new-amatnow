import { Fragment, useState } from "react";
import { FlatList } from "native-base";
import { NoOrderHistoryCard, RequestHistoryCard } from "../../general";
import { OrderHistoryCardSkeleton } from "../../skeleton";
import { useGetRequestHistoryQuery } from "../../../redux/cart/cartApiSlice";

const RequestHistoryList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const placeholderData = new Array(6).fill("");

  const {
    data: isRequestData,
    isLoading,
    isFetching,
  } = useGetRequestHistoryQuery({
    page: pageNumber,
  });

  return (
    <Fragment>
      {isLoading || isFetching ? (
        placeholderData.map((index) => {
          return <OrderHistoryCardSkeleton key={index} />;
        })
      ) : isRequestData?.data.length < 1 ? (
        <NoOrderHistoryCard />
      ) : (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={isRequestData?.data}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <RequestHistoryCard
            // restuarantName={item?.restaurant.name}
            // totatNairaPrice={item?.total_in_naira}
            // restuarantID={item?.restaurant.id}
            // referenceID={item?.reference}
            // createdDate={item?.created_at}
            //   id={item?.id}
            />
          )}
        />
      )}
      {/*
      <RequestHistoryCard /> */}
    </Fragment>
  );
};

export default RequestHistoryList;
