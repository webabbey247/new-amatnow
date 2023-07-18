import { Box, useColorMode, ScrollView, VStack, FlatList } from "native-base";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { HomeRestuarantCard } from "../../../../components/general";
import { setHeight } from "../../../../utils/helper";
import { useGetAllRestuarantQuery } from "../../../../redux/restuarant/restaurantApiSlice";
import { RestuarantCategoryHeader } from "../../../../components/headings";
import { servicesData } from "../../../../constants/mock";
import { HomeCardSkeleton } from "../../../../components/skeleton";

const RestuarantCategoryPage = () => {
  const params = useSearchParams();
  const { colorMode } = useColorMode();
  const {
    data: restuarantData,
    isLoading,
    isFetching,
    error,
  } = useGetAllRestuarantQuery(params?.restuarantcategory);
  console.log("hello data", params)
  return (
    <Box
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <RestuarantCategoryHeader title={params?.title} />
      <ScrollView
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
                  id={item?.id}
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
                />
              )}
            />
          </VStack>
        )}
      </ScrollView>
    </Box>
  );
};

export default RestuarantCategoryPage;
