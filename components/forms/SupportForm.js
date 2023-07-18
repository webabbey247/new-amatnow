import { useState } from "react";
import {
  FormControl,
  Stack,
  VStack,
  Button,
  Image,
  Input,
  TextArea,
  Text,
  Radio,
  HStack,
} from "native-base";
import icons from "../../constants/icons";
import { setHeight, setWidth } from "../../utils/helper";

const SupportForm = () => {
  const [feedbackType, setFeedbackType] = useState("Inquiry");

  return (
    <>
      <VStack w="100%" px={4} justifyContent="flex-start">
        <Stack flexDirection="column">
          <FormControl mt={3} isInvalid>
            <FormControl.Label
              _text={{
                color: "black.500",
                fontSize: "14",
                lineHeight: "20",
                letterSpacing: "-0.165",
                fontWeight: "700",
              }}
            >
              Feedback Type
            </FormControl.Label>
            <Radio.Group
              defaultValue={feedbackType}
              name="feedbackCategory"
              value={feedbackType}
              onChange={(feedback) => {
                setFeedbackType(feedback);
              }}
            >
              <HStack justifyContent="space-between" w="100%" my={2}>
                <Text
                  textAlign="center"
                  fontSize="14"
                  lineHeight="20"
                  fontWeight="400"
                  color="black.500"
                >
                  Suggestion
                </Text>
                <Radio value="Suggestion" colorScheme="red">
                  {""}
                </Radio>
              </HStack>
              <HStack justifyContent="space-between" w="100%" my={2}>
                <Text
                  textAlign="center"
                  fontSize="14"
                  lineHeight="20"
                  fontWeight="400"
                  color="black.500"
                >
                  Inquiry
                </Text>
                <Radio value="Inquiry" colorScheme="red">
                  {""}
                </Radio>
              </HStack>
            </Radio.Group>
          </FormControl>
          <FormControl mt={2} isInvalid>
            <TextArea
              my={3}
              h={setHeight(15)}
              placeholderTextColor="grey.700"
              placeholder="Leave us a message"
              fontSize="14"
              bg="grey.500"
              lineHeight="20"
              fontWeight="400"
              letterSpacing="-0.165"
              color="black.500"
            />
          </FormControl>

          <FormControl mt={2} isInvalid={false}>
            <FormControl.Label
              my={3}
              _text={{
                color: "black.500",
                fontSize: "14",
                lineHeight: "20",
                letterSpacing: "-0.165",
                fontWeight: "700",
              }}
            >
              Add image (optional)
            </FormControl.Label>
            <Input
              height={setHeight(7)}
              InputLeftElement={
                <Image
                  ml={2}
                  source={icons.IMAGEICON}
                  alt="Picture Upload"
                  w={setWidth(8)}
                  h={setHeight(4)}
                />
              }
              bg="grey.500"
              placeholder="Select image"
              borderColor="grey.500"
              borderRadius="8"
              keyboardType="number-pad"
            />
          </FormControl>
        </Stack>
      </VStack>
      <VStack justifyContent="flex-start" w="100%" py={5} px={4} mt={4}>
        <Button
          width="100%"
          rounded="full"
          bg="red.500"
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
          Send Message
        </Button>
      </VStack>
    </>
  );
};

export default SupportForm;
