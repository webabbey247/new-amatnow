import { useState } from "react";
import { Box, useColorMode, ScrollView, VStack, FlatList } from "native-base";
import { useGetAllRestuarantQuery } from "../../../redux/restuarant/restaurantApiSlice";
import { HomeCardSkeleton } from "../../../components/skeleton";
import { setHeight } from "../../../utils/helper";
import { HomeRestuarantCard } from "../../../components/general";
import { RestuarantFilterSlider } from "../../../components/sliders";
import { servicesData, restuarantCategoryData } from "../../../constants/mock";

const RestuarantPage = () => {
  const { colorMode } = useColorMode();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(
    restuarantCategoryData[0].name
  );
  const [slug, setSlug] = useState(restuarantCategoryData[0].slug);

  const {
    data: restuarantData,
    isLoading,
    isFetching,
  } = useGetAllRestuarantQuery({
    slug: slug,
    page: page,
  });

  // console.log("helo slug", slug);
  // console.log("helo data", restuarantData);
  return (
    <Box
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <RestuarantFilterSlider
        isLoading={isLoading}
        isFetching={isFetching}
        setSlug={setSlug}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        px={4}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        {isLoading || isFetching ? (
          <VStack bg="white.500" py={2}>
            <FlatList
              showsVerticalScrollIndicator={false}
              vertical
              data={servicesData}
              keyExtractor={(item) => item?.id}
              renderItem={(item) => (
                <HomeCardSkeleton
                  width="100%"
                  height={setHeight(20)}
                  typeUrl="restuarant"
                />
              )}
            />
          </VStack>
        ) : (
          <VStack bg="white.500" py={2}>
            <FlatList
              showsVerticalScrollIndicator={false}
              vertical
              data={restuarantData?.data || []}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <HomeRestuarantCard
                  width="100%"
                  typeUrl="restuarant"
                  favorite={item?.is_favourite}
                  restuarantID={item?.id}
                  height={setHeight(20)}
                  title={item?.name}
                  coverImage={item?.cover_image}
                  reviews={item?.reviews}
                  ratings={item?.rating}
                  isOpen={item?.is_open}
                  prepTime={item?.duration}
                  loading={isLoading}
                  fetching={isFetching}
                  pageTitle="restuarant"
                />
              )}
            />
          </VStack>
        )}
      </ScrollView>
    </Box>
  );
};

export default RestuarantPage;
