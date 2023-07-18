import { useState, useEffect, Fragment, useRef } from "react";
import { Center, Button } from "native-base";
import { setWidth } from "../../../utils/helper";

const AddUserAddressPage = () => {
  return (
    <Center flex={1}>
      <Button
        borderRadius="100"
        my={3}
        w={setWidth(50)}
        bg="grey.500"
        py={4}
        _text={{
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: -0.165,
          fontWeight: 400,
          color: "red.500",
        }}
        colorScheme="primary"
        onPress={() => {
          console.log("hello");
        }}
      >
        + Use Current Address
      </Button>
    </Center>
  );
};

export default AddUserAddressPage;
