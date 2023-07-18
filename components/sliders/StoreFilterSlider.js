import { Platform } from "react-native";
import { HStack, FlatList, Text, useDisclose } from "native-base";
import { FilterCards } from "../general";
import { storeCategoryData } from "../../constants/mock";

const StoreFilterSlider = ({
  selectedCategory,
  setSelectedCategory,
  setSlug,
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      alignItems="space-between"
      py={Platform.OS === "ios" ? 4 : 4}
      px="4"
    >
      <FlatList
        data={storeCategoryData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FilterCards
            item={item}
            category={selectedCategory}
            setInFocus={setSelectedCategory}
            setSlug={setSlug}
            onOpen={onOpen}
          />
        )}
      />
    </HStack>
  );
};

export default StoreFilterSlider;
