import { Platform } from "react-native";
import {
  Icon,
  HStack,
  Input,
  Center,
  IconButton,
  FormControl,
} from "native-base";
import Feather from "@expo/vector-icons/Feather";
import { setHeight } from "../../utils/helper";
import { useRouter } from "expo-router";

const RestuarantCategoryHeader = ({ title }) => {
  const router = useRouter();
  return (
    <Center bg="white.500" px={4} mt={Platform.OS === "ios" ? -3 : 0}>
      <HStack justifyContent="flex-start" alignItems="flex-start" py={3}>
        <IconButton
          onPress={() => router.back()}
          p="2"
          mt={2}
          mr={2}
          bg="white.500"
          rounded="full"
          shadow={1}
          variant="solid"
          _icon={{
            as: Feather,
            name: "arrow-left",
            size: "5",
            color: "black.500",
          }}
        />
        <FormControl w="90%">
          <Input
            placeholder={`Search ${title}`}
            textAlign="left"
            fontSize="14"
            lineHeight="22"
            placeholderTextColor="grey.700"
            bg="grey.500"
            height={setHeight(6)}
            borderColor="grey.500"
            borderRadius="8px"
            rounded="full"
            InputLeftElement={
              <Icon
                as={<Feather name="search" />}
                size={5}
                ml="2"
                color="grey.700"
              />
            }
          />
        </FormControl>
      </HStack>
    </Center>
  );
};

export default RestuarantCategoryHeader;
