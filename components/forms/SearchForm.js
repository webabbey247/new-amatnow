import { VStack, FormControl, Input, Icon } from "native-base";
import Feather from "@expo/vector-icons/Feather";
import { setHeight } from "../../utils/helper";

const SearchForm = ({ searchValue, setSearchValue }) => {
  return (
    <VStack w="100%" py={2}>
      <FormControl>
        <Input
          placeholder="Search"
          my={1}
          fontSize="14"
          lineHeight="20"
          placeholderTextColor="grey.700"
          bg="grey.500"
          height={setHeight(7)}
          borderColor="grey.500"
          borderRadius="8"
          rounded="full"
          value={searchValue}
          onChangeText={(e) => setSearchValue(e.target.value)}
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
    </VStack>
  );
};

export default SearchForm;
