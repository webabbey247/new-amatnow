import { useState } from "react";
import { Box, useColorMode, ScrollView } from "native-base";
import { PromotionsList } from "../../../components/sliders";
import { PromotionsCardSkeleton } from "../../../components/skeleton";
import { useGetAllPromotionsQuery } from "../../../redux/general/generalApiSlice";

const promotions = () => {
  const { colorMode } = useColorMode();
  const [pageNumber, setPageNumber] = useState(1);
  const placeholderData = new Array(6).fill("");

  const {
    data: isPromotionData,
    isLoading,
    isFetching,
  } = useGetAllPromotionsQuery({
    page: pageNumber,
  });
  return (
    <Box
      px="4"
      h="100%"
      maxHeight="100%"
      flex="1"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        {isLoading || isFetching ? (
          placeholderData.map((index) => {
            return <PromotionsCardSkeleton key={index} />;
          })
        ) : (
          <PromotionsList promotionData={isPromotionData?.data} />
        )}
        {/* <PromotionsCardSkeleton />
        <PromotionsList /> */}
      </ScrollView>
    </Box>
  );
};

export default promotions;
