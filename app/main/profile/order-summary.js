import { Fragment, useState } from "react";
import {
  Box,
  Text,
  useColorMode,
  ScrollView,
  Center,
  Image,
  VStack,
  Badge,
  Divider,
  HStack,
  Heading,
  IconButton,
  View,
  Pressable,
  Icon,
  Button,
  Slider,
} from "native-base";
import { Stack, useSearchParams } from "expo-router";
import icons from "../../../constants/icons";
import { setWidth, setHeight } from "../../../utils/helper";
import { Feather } from "@expo/vector-icons";
import {
  OrderCompleteSummaryList,
  OrderMiniSummaryList,
} from "../../../components/sliders";
import {
  OrderMiniSummaryHeader,
  OrderCompleteSummaryHeader,
} from "../../../components/headings";

const OrderSummaryProfilePage = () => {
  const { colorMode } = useColorMode();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderStatus, setOrderStatus] = useState("CANCELLED");
  const [showDetails, setShowDetails] = useState(false);

  const params = useSearchParams();
  console.log("hello params", params);
  return (
    <Box
      flex={1}
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        flex={1}
        px="4"
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <VStack>
          {showDetails ? (
            <Fragment>
              <OrderCompleteSummaryHeader
                referenceID="1685892795401"
                orderStatus={orderStatus}
              />
              <OrderCompleteSummaryList  setShowDetails={setShowDetails} />
            </Fragment>
          ) : (
            <Fragment>
              <OrderMiniSummaryHeader
                referenceID="1685892795401"
                orderStatus={orderStatus}
              />
              <OrderMiniSummaryList
                orderStatus={orderStatus}
                setShowDetails={setShowDetails}
              />
            </Fragment>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default OrderSummaryProfilePage;
