import { Fragment } from "react";
import { FlatList } from "native-base";
import { OrderHistoryCard } from "../../general";

const OrderHistoryList = ({ orderData, orderStatus }) => {
  const filteredData = orderData.filter((item) => item.status === orderStatus);
  //   console.log("hello filtered Data", filteredData);
  return (
    <Fragment>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={orderData}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <OrderHistoryCard
            menu={item?.menu}
            restuarantName={item?.restaurant.name}
            totatNairaPrice={item?.total_in_naira}
            restuarantID={item?.restaurant.id}
            referenceID={item?.reference}
            createdDate={item?.created_at}
            coverImage={item?.restaurant.image}
            id={item?.id}
          />
        )}
      />
    </Fragment>
  );
};

export default OrderHistoryList;
