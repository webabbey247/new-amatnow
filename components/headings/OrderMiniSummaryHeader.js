import { Fragment, useState } from "react";
import { Center, Image, Badge } from "native-base";
import icons from "../../constants/icons";
import { setWidth, setHeight } from "../../utils/helper";

const OrderMiniSummaryHeader = ({ referenceID, orderStatus }) => {
  console.log("hello order Status com", orderStatus);

  return (
    <Center mb="3" flex="1" W="100%" mt="4">
      {orderStatus === "PENDING" || orderStatus === "ACTIVE" ? (
        <Image
          resizeMode="contain"
          source={icons.ORDERRECEIVEDICON}
          alt="Success Icon"
          w={setWidth(30)}
          h={setHeight(15)}
        />
      ) : orderStatus === "ACCEPTED" ? (
        <Image
          resizeMode="contain"
          source={icons.ORDERPREPAREDICON}
          alt="Success Icon"
          w={setWidth(50)}
          h={setHeight(25)}
        />
      ) : orderStatus === "RIDER_ENROUTE" ? (
        <Image
          resizeMode="contain"
          source={icons.ORDERWITHRIDERICON}
          alt="Success Icon"
          w={setWidth(50)}
          h={setHeight(25)}
        />
      ) : orderStatus === "DELIVERED" ? (
        <Image
          resizeMode="contain"
          source={icons.ORDERDELIVEREDICON}
          alt="Success Icon"
          w={setWidth(50)}
          h={setHeight(25)}
        />
      ) : orderStatus === "CANCELLED" ? (
        <Image
          resizeMode="contain"
          source={icons.ORDERCANCELLEDICON}
          alt="Success Icon"
          w={setWidth(50)}
          h={setHeight(15)}
        />
      ) : null}

      <Badge
        my="4"
        py="2"
        px="4"
        bg="green.100"
        borderRadius="8"
        rounded="full"
        _text={{
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "400",
          letterSpacing: -0.165,
          color: "green.700",
          textTransform: "capitalize",
        }}
      >
        {`Order number ${referenceID}`}
      </Badge>
    </Center>
  );
};

export default OrderMiniSummaryHeader;
