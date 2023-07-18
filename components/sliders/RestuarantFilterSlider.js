import { Fragment, useState } from "react";
import { Platform } from "react-native";
import { HStack, FlatList, Text, useDisclose } from "native-base";
import { FilterCards } from "../general";
import { restuarantCategoryData, exploreData } from "../../constants/mock";
import { FilterCardSkeleton } from "../skeleton";
import { RatingsActionSheets } from "../actionsheets";
const RestuarantFilterSlider = ({
  selectedCategory,
  setSelectedCategory,
  setSlug,
  isLoading,
  isFetching,
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Fragment>
      <HStack
        w="100%"
        justifyContent="space-between"
        alignItems="space-between"
        py={Platform.OS === "ios" ? 4 : 4}
        px="4"
      >
        <FlatList
          data={restuarantCategoryData}
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

        {/* {isLoading || isFetching ? (
          <FlatList
            data={exploreData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => <FilterCardSkeleton id={item?.id} />}
          />
        ) : (
          <FlatList
            data={restuarantCategoryData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FilterCards
                item={item}
                category={selectedCategory}
                setInFocus={setSelectedCategory}
                setSlug={setSlug}
              />
            )}
          />
        )} */}
      </HStack>
      <RatingsActionSheets
        isOpen={isOpen}
        onClose={onClose}
        setSlug={setSlug}
      />
    </Fragment>
  );
};

export default RestuarantFilterSlider;
