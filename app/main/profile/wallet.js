import {
  Box,
  useColorMode,
  ScrollView,
  Text,
  Button,
  Image,
  Stack,
  HStack,
  Center,
  IconButton,
  VStack,
} from "native-base";
import { setWidth, setHeight } from "../../../utils/helper";
import images from "../../../constants/images";

const wallet = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      px="4"
      h="100%"
      maxHeight="100%"
      flex="1"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <Box
          borderColor="grey.400"
          borderWidth="1"
          borderRadius="8"
          p="4"
          mt="6"
          space="4"
        >
          <HStack justifyContent="space-between" alignItems="center" py="2">
            <Stack
              direction="column"
              space="2"
              justifyContent="flex-start"
              alignItens="flex-start"
            >
              <Text
                textAlign="left"
                fontSize="16"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="500"
                color="grey.700"
                textTransform="capitalize"
              >
                Your Balance
              </Text>
              <Text
                fontSize="30"
                lineHeight="38"
                letterSpacing="-0.165"
                textAlign="left"
                fontWeight="500"
                color="black.500"
              >
                $1400.00
              </Text>
            </Stack>
            <Image
              h={setHeight(5)}
              w={setWidth(10)}
              source={images.WALLETIMG}
              alt="Image title"
              resizeMode="contain"
            />
          </HStack>

          <Button
            my="4"
            w={setWidth(50)}
            bg="red.500"
            rounded="full"
            px="4"
            colorScheme="red.500"
            onPress={() => {
              console.log("ReOrder");
            }}
            py="3"
            _text={{
              color: "white.500",
              fontWeight: "500",
              textTransform: "none",
              fontSize: "16",
              lineHeight: "24",
              letterSpacing: "0.165",
            }}
          >
            + Add Funds
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default wallet;
