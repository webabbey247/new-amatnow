import { Fragment, useState } from "react";
import { Platform } from "react-native";
import { HStack, FlatList, Text } from "native-base";
import { AddressFilterCard } from "../general";
import { deliveryInstructionTags } from "../../constants/mock";

const AddressFilterSlider = ({ instructions, setInstructions }) => {
  return (
    <Fragment>
      <HStack
        w="100%"
        justifyContent="space-between"
        alignItems="space-between"
        py={Platform.OS === "ios" ? 4 : 4}
      >
        <FlatList
          data={deliveryInstructionTags}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AddressFilterCard
              item={item}
              instructions={instructions}
              setInFocus={setInstructions}
            />
          )}
        />
      </HStack>
    </Fragment>
  );
};

export default AddressFilterSlider;
