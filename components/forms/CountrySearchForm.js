import {
  KeyboardAvoidingView,
  HStack,
  IconButton,
  FormControl,
  Input,
  Icon,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { setHeight } from "../../utils/helper";

const CountrySearchForm = ({ searchQuery, searchFilterFunction }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <HStack
        justifyContent="flex-start"
        alignItems="flex-start"
        py={3}
        px={2}
        bg="red.500"
      >
        <IconButton
          onPress={() => router.back()}
          p="2.5"
          // mt={1}
          mr={1}
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
            placeholder=""
            textAlign="left"
            fontSize="14"
            lineHeight="22"
            placeholderTextColor="grey.700"
            bg="grey.500"
            height={setHeight(5)}
            borderColor="grey.500"
            borderRadius="4"
            rounded="full"
            clearButtonMode='always'
            value={searchQuery}
            onChangeText={(query) => searchFilterFunction(query)}
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
    </KeyboardAvoidingView>
  );
};

export default CountrySearchForm;
