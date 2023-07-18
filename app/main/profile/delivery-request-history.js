import { useState } from "react";
import { Box, useColorMode, ScrollView } from "native-base";
import { HistoryToggle } from "../../../components/toggles";
import {
  RequestHistoryList,
  DeliveriesHistoryList,
} from "../../../components/sliders";

const DeliveryRequestHistoryPage = () => {
  const { colorMode } = useColorMode();
  const [delivery, setDelivery] = useState(true);

  return (
    <Box
      h="100%"
      maxHeight="100%"
      flex="1"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <HistoryToggle delivery={delivery} setDelivery={setDelivery} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
        px="4"
      >
        {delivery ? <DeliveriesHistoryList /> : <RequestHistoryList />}
      </ScrollView>
    </Box>
  );
};

export default DeliveryRequestHistoryPage;
