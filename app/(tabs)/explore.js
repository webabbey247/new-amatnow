import { useEffect, useState } from "react";
import { Box, FlatList, useColorMode, ScrollView } from "native-base";
import { exploreData } from "../../constants/mock";
import { ExploreCard } from "../../components/general";
import { ExploreHeader } from "../../components/headings";

const ExplorePage = () => {
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <Box
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <ExploreHeader />
      <FlatList
        vertical
        px={4}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={exploreData}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <ExploreCard
            title={item?.name}
            image={item?.image}
            loading={isLoading}
          />
        )}
      />
    </Box>
  );
};

export default ExplorePage;
