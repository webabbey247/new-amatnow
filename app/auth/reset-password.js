import { Box, ScrollView, useColorMode } from "native-base";
import { useSearchParams } from "expo-router";
import { ResetPasswordForm } from "../../components/forms";

const ResetPasswordPage = () => {
  const params = useSearchParams();
  const phone = params.phone;
  const colorMode = useColorMode();
  return (
    <Box
      flex={1}
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <ScrollView
        px={4}
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <ResetPasswordForm mobileNumber={phone} />
      </ScrollView>
    </Box>
  );
};

export default ResetPasswordPage;
