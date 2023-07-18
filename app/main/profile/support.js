import {
  Text,
  Box,
  Heading,
  Button,
  Icon,
  useColorMode,
  VStack,
  IconButton,
  HStack,
  Stack,
  Center,
  ScrollView,
  Image,
} from "native-base";
import icons from "../../../constants/icons";
import { setWidth, setHeight } from "../../../utils/helper";
import { Feather } from "@expo/vector-icons";
import { SupportForm } from "../../../components/forms";
import { useRouter } from "expo-router";

const SupportPage = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  return (
    <Box
      flex={1}
      bg={colorMode === "dark" ? "black.500" : "red.500"}
      safeAreaTop
    >
      <VStack alignItems="flex-start" justifyContent="flex-start" px={4} py={2}>
        <IconButton
          onPress={() => router.back()}
          p="2"
          bg="white.500"
          rounded="full"
          shadow={4}
          variant="solid"
          _icon={{
            as: Feather,
            name: "arrow-left",
            size: "5",
            color: "black.500",
          }}
        />
      </VStack>

      <ScrollView
        flex={1}
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <VStack
          alignItems="flex-start"
          justifyContent="flex-start"
          py={12}
          mb={10}
          bg="red.500"
          px={4}
        >
          <Heading
            mt={-4}
            fontSize="20"
            lineHeight="28"
            letterSpacing="-0.165"
            textAlign="left"
            fontWeight="700"
            color="white.500"
          >
            Hello there!
          </Heading>
          <Text
            py={1}
            fontSize="12"
            lineHeight="20"
            letterSpacing="-0.165"
            textAlign="left"
            fontWeight="400"
            color="white.500"
          >
            Share your feedback or ask us anything!
          </Text>
        </VStack>
        <Center
          px={4}
          py={4}
          bg="white.500"
          mx={4}
          shadow={4}
          borderRadius={8}
          mt={-16}
        >
          <HStack
            justifyContent="space-between"
            alignItems="space-between"
            w="100%"
          >
            <Stack flexDirection="column" w="70%">
              <Heading
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                fontWeight="700"
                textAlign="left"
              >
                Live chat
              </Heading>
              <Button
                my={4}
                py={3}
                w={setWidth(50)}
                rounded="full"
                bg="red.500"
                leftIcon={
                  <Icon
                    as={Feather}
                    name="send"
                    size="4"
                    color="white.500"
                    mr={2}
                  />
                }
                _text={{
                  color: "white.500",
                  textAlign: "center",
                  fontSize: "14",
                  lineHeight: "22",
                  letterSpacing: "-0.165",
                  fontWeight: "500",
                }}
              >
                Start a conversation
              </Button>
            </Stack>
            <Image
              resizeMode="contain"
              source={icons.SUPPORTICON2}
              alt="Promotions"
              w={setWidth(24)}
              h={setHeight(12)}
            />
          </HStack>
        </Center>
        <SupportForm />
      </ScrollView>
    </Box>
  );
};

export default SupportPage;
