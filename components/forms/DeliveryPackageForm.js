import { Fragment, useState } from "react";
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
  Stack,
  Text,
  Pressable,
  Radio,
} from "native-base";
import { setHeight, setWidth } from "../../utils/helper";
import icons from "../../constants/icons";
import { useRouter } from "expo-router";

const DeliveryPackageForm = () => {
  const router = useRouter();
  const [isSmallSize, setIsSmallSize] = useState(true);

  const handleInputFocus = () => {
    console.log("hello pickup is pressed");
  };
  return (
    <Fragment>
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
            Pickup location
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
            onFocus={() =>handleInputFocus()}
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
            Enter destination
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
            Package Size
          </FormControl.Label>

          <HStack justifyContent="flex-start" alignItems="flex-start" my={1}>
            <Stack direction="row" space="3">
              <Pressable
                onPress={() => setIsSmallSize(true)}
                justifyContent="center"
                alignItems="center"
                bg={isSmallSize ? "red.500" : "grey.500"}
                w={setWidth(34)}
                h={setHeight(20)}
                borderRadius="8"
                py={2}
              >
                <Text
                  fontSize="14"
                  lineHeight="20"
                  letterSpacing="-0.165"
                  color={isSmallSize ? "white.500" : "black.500"}
                  fontWeight="400"
                >
                  Small
                </Text>
                <Center bg="white.500" rounded="full" size="16" my="2">
                  <Image
                    source={icons.PACKAGEBOXICON}
                    w={setWidth(10)}
                    alt="package size"
                    resizeMode="contain"
                  />
                </Center>
                <Text
                  fontSize="12"
                  lineHeight="20"
                  letterSpacing="-0.165"
                  color={isSmallSize ? "white.500" : "black.500"}
                  fontWeight="400"
                >
                  Less than 2 KG
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setIsSmallSize(false)}
                justifyContent="center"
                alignItems="center"
                bg={!isSmallSize ? "red.500" : "grey.500"}
                w={setWidth(34)}
                h={setHeight(20)}
                borderRadius="8"
                py={2}
              >
                <Text
                  fontSize="14"
                  lineHeight="20"
                  letterSpacing="-0.165"
                  color={!isSmallSize ? "white.500" : "black.500"}
                  fontWeight="400"
                >
                  Medium
                </Text>
                <Center bg="white.500" rounded="full" size="16" my="2">
                  <Image
                    source={icons.PACKAGEBOXICON}
                    w={setWidth(10)}
                    alt="package size"
                    resizeMode="contain"
                  />
                </Center>
                <Text
                  fontSize="12"
                  lineHeight="20"
                  letterSpacing="-0.165"
                  color={!isSmallSize ? "white.500" : "black.500"}
                  fontWeight="400"
                >
                  3 - 5 KG
                </Text>
              </Pressable>
            </Stack>
          </HStack>
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
            Is this package fragile?
          </FormControl.Label>
          <Radio.Group name="isFragile" colorScheme="red" w="100%">
            <HStack
              justifyContent="space-between"
              alignItems="space-between"
              w="100%"
            >
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                color="black.500"
                fontWeight="400"
              >
                Yes
              </Text>
              <Radio value="Yes" my={1}>
                {" "}
              </Radio>
            </HStack>

            <HStack
              my="2"
              justifyContent="space-between"
              alignItems="space-between"
              w="100%"
            >
              <Text
                fontSize="14"
                lineHeight="20"
                letterSpacing="-0.165"
                color="black.500"
                fontWeight="400"
              >
                No
              </Text>
              <Radio value="No" my={1}>
                {" "}
              </Radio>
            </HStack>
          </Radio.Group>
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
            Reciever’s full name
          </FormControl.Label>
          <Input
            type="text"
            placeholder="Enter full Name"
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
            Phone number
          </FormControl.Label>
          <Input
            type="text"
            placeholder="Enter reciever’s phone number"
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
            Alternative phone number
          </FormControl.Label>
          <Input
            type="text"
            placeholder="Enter alternative phone number"
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
            Email address
          </FormControl.Label>
          <Input
            type="text"
            placeholder="Enter email address"
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
      </VStack>

      <VStack w="100%" my="4">
        <Button
          onPress={() => router.push("main/delivery/delivery-confirmation")}
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
          Continue
        </Button>
      </VStack>
    </Fragment>
  );
};

export default DeliveryPackageForm;
