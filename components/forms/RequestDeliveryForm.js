import {
    Center,
    VStack,
    FormControl,
    Input,
    HStack,
    TextArea,
    Icon,
    Image,
    Button,
  } from "native-base";
  import { setHeight, setWidth } from "../../utils/helper";
  import { Feather } from "@expo/vector-icons";
  
  const RequestDeliveryForm = () => {
    return (
      <Center flex={1}>
        <VStack justifyContent="flex-start" w="100%">
          <FormControl mt={3}>
            <FormControl.Label
              _text={{
                color: "black.500",
                fontSize: "14",
                lineHeight: "20",
                letterSpacing: "-0.165",
                fontWeight: "500",
              }}
            >
              Item Name
            </FormControl.Label>
            <Input
              type="text"
              placeholder="Enter item name"
              my={1}
              fontSize="14"
              lineHeight="20"
              placeholderTextColor="grey.700"
              bg="grey.500"
              borderColor="grey.500"
              borderRadius="8"
              height={setHeight(7)}
            />
          </FormControl>
  
          <FormControl mt={3}>
            <FormControl.Label
              _text={{
                color: "black.500",
                fontSize: "14",
                lineHeight: "20",
                letterSpacing: "-0.165",
                fontWeight: "500",
              }}
            >
              Description
            </FormControl.Label>
            <Input
              type="text"
              placeholder="Enter description"
              my={1}
              fontSize="14"
              lineHeight="20"
              placeholderTextColor="grey.700"
              bg="grey.500"
              borderColor="grey.500"
              borderRadius="8"
              height={setHeight(7)}
            />
          </FormControl>
  
          <FormControl mt={3}>
            <FormControl.Label
              _text={{
                color: "black.500",
                fontSize: "14",
                lineHeight: "20",
                letterSpacing: "-0.165",
                fontWeight: "500",
              }}
            >
              Upload Image (Maximum of 2)
            </FormControl.Label>
            <Input
              type="text"
              placeholder="Enter desired quantity"
              my={1}
              fontSize="14"
              lineHeight="20"
              placeholderTextColor="grey.700"
              bg="grey.500"
              borderColor="grey.500"
              borderRadius="8"
              height={setHeight(7)}
              InputLeftElement={
                <Icon
                  as={<Feather name="image" />}
                  size={5}
                  mx={2}
                  color="grey.700"
                />
              }
            />
          </FormControl>
  
          <FormControl mt={3}>
            <FormControl.Label
              _text={{
                color: "black.500",
                fontSize: "14",
                lineHeight: "20",
                letterSpacing: "-0.165",
                fontWeight: "500",
              }}
            >
              Quantity
            </FormControl.Label>
            <Input
              type="text"
              placeholder="Enter desired quantity"
              my={1}
              fontSize="14"
              lineHeight="20"
              placeholderTextColor="grey.700"
              bg="grey.500"
              borderColor="grey.500"
              borderRadius="8"
              height={setHeight(7)}
            />
          </FormControl>
  
          <FormControl mt={3}>
            <FormControl.Label
              _text={{
                color: "black.500",
                fontSize: "14",
                lineHeight: "20",
                letterSpacing: "-0.165",
                fontWeight: "500",
              }}
            >
              Unit Price
            </FormControl.Label>
            <Input
              type="text"
              placeholder="Enter unit price"
              my={1}
              fontSize="14"
              lineHeight="20"
              placeholderTextColor="grey.700"
              bg="grey.500"
              borderColor="grey.500"
              borderRadius="8"
              height={setHeight(7)}
            />
          </FormControl>
  
          <FormControl mt={3}>
            <FormControl.Label
              _text={{
                color: "black.500",
                fontSize: "14",
                lineHeight: "20",
                letterSpacing: "-0.165",
                fontWeight: "500",
              }}
            >
              When would you like to recieve this item?
            </FormControl.Label>
            <Input
              type="text"
              placeholder="Enter preferred date"
              my={1}
              fontSize="14"
              lineHeight="20"
              placeholderTextColor="grey.700"
              bg="grey.500"
              borderColor="grey.500"
              borderRadius="8"
              height={setHeight(7)}
              InputLeftElement={
                <Icon
                  as={<Feather name="calendar" />}
                  size={5}
                  mx={2}
                  color="grey.700"
                />
              }
            />
          </FormControl>
        </VStack>
  
        <VStack w="100%" my="4">
          <Button
            width="100%"
            rounded="full"
            bg="red.500"
            mt="3"
            py="4"
            _text={{
              color: "white.500",
              fontWeight: "500",
              textTransform: "none",
              fontSize: "16",
              lineHeight: "24",
              letterSpacing: "0.165",
            }}
          >
            Submit Request
          </Button>
        </VStack>
      </Center>
    );
  };
  
  export default RequestDeliveryForm;
  