import { useState } from "react";
import {
  Box,
  useColorMode,
  ScrollView,
  VStack,
  FlatList,
  Text,
} from "native-base";
import { useGetAllRestuarantQuery } from "../../../redux/restuarant/restaurantApiSlice";
import { SavedStoreSkeleton } from "../../../components/skeleton";
import { setHeight } from "../../../utils/helper";
import { CircularCard } from "../../../components/general";
import { EssentialsFilterSlider } from "../../../components/sliders";
import { essentialsCategoryData } from "../../../constants/mock";

const EssentialsPage = () => {
  const { colorMode } = useColorMode();
  const [page, setPage] = useState(1);
  const placeholderData = new Array(5).fill("");
  const [selectedCategory, setSelectedCategory] = useState(
    essentialsCategoryData[0].name
  );
  const [slug, setSlug] = useState(essentialsCategoryData[0].slug);

  const {
    data: restuarantData,
    isLoading,
    isFetching,
  } = useGetAllRestuarantQuery({
    slug: slug,
    page: page,
  });

  return (
    <Box
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <EssentialsFilterSlider
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
              data={placeholderData}
              keyExtractor={(item) => item?.id}
              renderItem={(index) => <SavedStoreSkeleton key={index} />}
            />
          </VStack>
        ) : !restuarantData?.data.length ? (
          <VStack bg="white.500" py={2}>
            <Text
              textAlign="center"
              flex="1"
              fontSize="16"
              lineHeight="24"
              color="black.500"
            >
              No entry found
            </Text>
          </VStack>
        ) : (
          <VStack bg="white.500" py={2}>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={restuarantData?.data || []}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <CircularCard
                  restuarantID={item?.id}
                  favorite={item?.is_favourite}
                  title={item?.name}
                  coverImage={item?.cover_image}
                  reviews={item?.reviews}
                  ratings={item?.rating}
                  prepTime={item?.duration}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  pageType="store"
                />
              )}
            />
          </VStack>
        )}
      </ScrollView>
    </Box>
  );
};

export default EssentialsPage;
