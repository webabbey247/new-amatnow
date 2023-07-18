import { Box, ScrollView, useColorMode, Text } from "native-base";

const OrderSummaryPage = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      px={4}
      flex={1}
      bg={colorMode === "dark" ? "black.500" : "white.500"}
      safeAreaTop
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <Text>Hello Order summary</Text>
      </ScrollView>
    </Box>
  );
};

export default OrderSummaryPage;
