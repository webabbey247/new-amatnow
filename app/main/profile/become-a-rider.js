import {
  Text,
  Box,
  Heading,
  Center,
  Image,
  ScrollView,
  useColorMode,
  VStack,
  HStack,
  Stack,
  Pressable,
} from "native-base";
import images from "../../../constants/images";
import icons from "../../../constants/icons";
import { setHeight, setWidth } from "../../../utils/helper";
import { useRouter } from "expo-router";

const BecomeRiderPage = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const data = [
    {
      id: 1,
      title: "Earn passively",
      image: "EARNICON",
      content: " We help your earn those extra bucks.",
    },
    {
      id: 2,
      title: "Your time is yours",
      image: "GOLDCLOCK",
      content: " Go “active” whenever, you’re the boss!",
    },
    {
      id: 3,
      title: "Get rewarded",
      image: "REWARDICON",
      content: "Exceed targets and get rewards from us.",
    },
  ];
  return (
    <Box px={4} flex={1} bg={colorMode === "dark" ? "black.500" : "white.500"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <Center w="100%">
          <Image
            resizeMode="contain"
            source={images.BECOMERIDERIMG}
            alt="OTP"
            height={setHeight(30)}
            width={setWidth(80)}
          />
          <VStack justifyContent="center" alignItems="center" w="100%" mt={4}>
            <Heading
              fontSize="20"
              lineHeight="28"
              letterSpacing="0.165"
              fontWeight="700"
              textAlign="center"
            >
              Deliver packages and earn.
            </Heading>

            {data.map((item, index) => {
              return (
                <HStack
                  key={index}
                  px={3}
                  py={5}
                  mt={5}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  bg="grey.500"
                  w="100%"
                  borderRadius={8}
                >
                  <Center bg="white.500" shadow={0.5} p={2} rounded={"full"}>
                    <Image
                      size="5"
                      source={icons[item.image]}
                      alt="Food"
                      resizeMode="contain"
                    />
                  </Center>
                  <Stack flexDirection="column" px={3}>
                    <Heading
                      mb={1}
                      fontSize="14"
                      lineHeight="20"
                      letterSpacing="-0.165"
                      color="black.500"
                      fontWeight="700"
                    >
                      {item.title}
                    </Heading>
                    <Text
                      fontSize="14"
                      lineHeight="20"
                      letterSpacing="-0.165"
                      color="black.500"
                      fontWeight="400"
                    >
                      {item.content}
                    </Text>
                  </Stack>
                </HStack>
              );
            })}
          </VStack>
        </Center>
        <VStack
          justifyContent="center"
          alignItems="center"
          w="100%"
          mt={10}
          pb={10}
        >
          <Pressable
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            w="100%"
            rounded="full"
            bg="grey.500"
            p="4"
          >
            <Image
              mr={10}
              h="8"
              w="8"
              source={icons.REDGOOGLEPLAY}
              alt="Continue With Google"
            />
            <Text
              mt={0.5}
              fontWeight="500"
              color="red.500"
              fontSize="14"
              lineHeight="22"
              letterSpacing="-0.165"
              textTransform="capitalize"
            >
              Download on google play
            </Text>
          </Pressable>

          <Pressable
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            w="100%"
            rounded="full"
            bg="grey.500"
            mt="3"
            p="4"
          >
            <Image
              mr={10}
              h="8"
              w="8"
              source={icons.REDAPPLCESTORE}
              alt="Continue With Apple"
            />
            <Text
              mt={0.5}
              fontWeight="500"
              color="red.500"
              fontSize="14"
              lineHeight="22"
              letterSpacing="-0.165"
              textTransform="capitalize"
            >
              Download on app store
            </Text>
          </Pressable>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default BecomeRiderPage;
