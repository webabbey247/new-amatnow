import {
  Center,
  SectionList,
  Text,
  Heading,
  HStack,
  Image,
  VStack,
  Pressable,
} from "native-base";
import { useRouter } from "expo-router";
import icons from "../../../constants/icons";
import { profileNavLink } from "../../../constants/mock";

const ProfileNavigationList = () => {
  const router = useRouter();
  return (
    <SectionList
      pb="3"
      showsVerticalScrollIndicator={false}
      sections={profileNavLink}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`${item.path}`)}>
          <HStack mt="2">
            <Center bg="grey.500" rounded="full" p="2">
              <Image
                size="6"
                source={icons[item.image]}
                alt="Food"
                resizeMode="contain"
              />
            </Center>
            <Text
              ml={4}
              fontSize="14"
              lineHeight="20"
              letterSpacing="0.165"
              textAlign="left"
              fontWeight="500"
              textTransform="capitalize"
              mt="2"
              color="black.500"
            >
              {item.link}
            </Text>
          </HStack>
        </Pressable>
      )}
      renderSectionHeader={({ section }) => (
        <VStack w="100%" py="3">
          <Heading
            fontSize="16"
            lineHeight="24"
            letterSpacing="0.165"
            textAling="center"
            fontWeight="500"
            textTransform="none"
            py="1"
            color="black.500"
          >
            {section.title}
          </Heading>
        </VStack>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ProfileNavigationList;
