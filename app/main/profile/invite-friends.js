import {
  StatusBar,
  Text,
  Box,
  Heading,
  Center,
  Image,
  useColorMode,
  VStack,
  IconButton,
  HStack,
} from "native-base";
import images from "../../../constants/images";
import { setHeight, setWidth } from "../../../utils/helper";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import {ProfileHeader} from '../../components/CustomHeader';

const InviteFriendsPage = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  return (
    <Box px={4} flex={1} bg={colorMode === "dark" ? "black.500" : "white.500"}>
      <Center w="100%">
        <Image
          resizeMode="contain"
          source={images.INVITEFRIENDS}
          alt="OTP"
          height={setHeight(40)}
          width={setWidth(100)}
        />
        <VStack justifyContent="center" alignItems="center" w="100%">
          <Heading
            fontSize="20"
            lineHeight="28"
            letterSpacing="0.165"
            fontWeight="700"
            textAlign="center"
          >
            Enjoying our app?
          </Heading>
          <Text
            px={12}
            py={2}
            fontSize="14"
            lineHeight="20"
            letterSpacing="-0.165"
            color="black.500"
            fontWeight="400"
            textAlign="center"
          >
            Invite your friends to join in the fun and get rewarded.
          </Text>

          <HStack
            p={2}
            mt={5}
            justifyContent="space-between"
            alignItems="space-between"
            bg="grey.500"
            w="100%"
            borderRadius={30}
          >
            <Text
              mb={2}
              ml={3}
              fontSize="16"
              lineHeight="20"
              letterSpacing="-0.165"
              color="grey.250"
              fontWeight="400"
            >
              Amat/john1234
            </Text>
            <IconButton
              onPress={() => router.back()}
              p="2"
              bg="white.500"
              rounded="full"
              shadow={4}
              variant="solid"
              _icon={{
                as: Feather,
                name: "send",
                size: "5",
                color: "red.500",
              }}
            />
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default InviteFriendsPage;
