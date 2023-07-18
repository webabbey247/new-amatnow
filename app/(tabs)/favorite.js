import { useState, useEffect } from "react";
import { Box, useColorMode, Text, VStack } from "native-base";
import { SavedItemList, SavedStoresList } from "../../components/sliders";
import { SavedMenuToggle } from "../../components/toggles";
import { FavoriteHeader } from "../../components/headings";
import { NoInternetCard } from "../../components/general";
import { useSession } from "../../hooks";

const FavoritePage = () => {
  const [stores, setStores] = useState(false);
  const { isAuthenticated } = useSession();
  const { colorMode } = useColorMode();

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const authenticateUser = async () => {
  //   const tokenized = await authToken();
  //   !tokenized || tokenized === null || tokenized === ""
  //     ? setIsAuthenticated(false)
  //     : setIsAuthenticated(true);
  // };
  // useEffect(() => {
  //   authenticateUser();
  // });
  return (
    <Box
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <FavoriteHeader />
      <SavedMenuToggle stores={stores} setStores={setStores} />
      <VStack py={2} mb={6} px={4}>
        {isAuthenticated ? (
          stores ? (
            <SavedStoresList />
          ) : (
            <SavedItemList />
          )
        ) : (
          <NoInternetCard />
        )}
      </VStack>
    </Box>
  );
};

export default FavoritePage;
