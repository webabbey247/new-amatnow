import { ScrollView, VStack, Box, useColorMode } from "native-base";
import { ProfileAdsCard, UserProfileCard } from "../../components/general";
import { ProfileNavigationList } from "../../components/sliders";
import { UserProfileCardSkeleton } from "../../components/skeleton";
import { useSession } from "../../hooks";
import { useGetAuthenticatedUserQuery } from "../../redux/auth/authApiSlice";

const ProfilePage = () => {
  const { colorMode } = useColorMode();
  const { isToken } = useSession();
  const {
    data: isUserData,
    isLoading,
    isFetching,
  } = useGetAuthenticatedUserQuery();
  return (
    <Box
      h="100%"
      maxHeight="100%"
      px={4}
      flex={1}
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      {isToken || isToken !== "" || isToken !== null ? (
        isLoading || isFetching ? (
          <UserProfileCardSkeleton />
        ) : (
          <UserProfileCard isUserData={isUserData} />
        )
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <ProfileAdsCard />
        <VStack bg={colorMode === "dark" ? "black.500" : "white.500"}>
          <ProfileNavigationList />
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default ProfilePage;
