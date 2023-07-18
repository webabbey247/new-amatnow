import {
  useColorMode,
  Icon,
  HStack,
  Box,
  Text,
  VStack,
  FormControl,
  Input,
} from "native-base";
import { Formik } from "formik";
import Feather from "@expo/vector-icons/Feather";
import { useSelector } from "react-redux";
import { setHeight } from "../../utils/helper";

const ExploreHeader = () => {
  const { colorMode } = useColorMode();
  const { locationAddress, userAddress, userAddressStatus } = useSelector(
    (state) => state.general
  );
  const searchInfo = {
    title: "",
  };
  return (
    <VStack px={4} py={2}>
      <HStack
        alignItems="space-between"
        justifyContent="space-between"
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <Text
          fontSize="20"
          lineHeight="28"
          letterSpacing="-0.165"
          fontWeight="700"
          textTransform="none"
          color="black.500"
        >
          Explore
        </Text>
        <Box w="50%">
          <Text
            isTruncated
            noOfLines={1}
            py="1"
            fontSize="14"
            lineHeight="20"
            letterSpacing="-0.165"
            fontWeight="500"
            textTransform="none"
            opacity="0.5"
            color="black.500"
          >
            <Icon as={Feather} name="map-pin" color="black.500" mr={2} />{" "}
            {userAddressStatus ? userAddress : locationAddress}
          </Text>
        </Box>
      </HStack>
      <Formik
        validationSchema=""
        initialValues={searchInfo}
        onSubmit={async (values, formikActions) => {
          console.log(values);
          formikActions.resetForm();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <VStack w="100%" py={1}>
            <FormControl isInvalid={errors.title ? true : false}>
              <Input
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                placeholder="Search anything"
                my={1}
                fontSize="14"
                lineHeight="20"
                placeholderTextColor="grey.700"
                bg="grey.500"
                height={setHeight(7)}
                borderColor="grey.500"
                borderRadius="8"
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
          </VStack>
        )}
      </Formik>
    </VStack>
  );
};

export default ExploreHeader;
