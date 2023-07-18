// import { useEffect } from "react";
import { Alert, VStack, HStack, Heading, IconButton, Text } from "native-base";
import { Feather } from "@expo/vector-icons";

const ValidationErrorAlert = ({ errorData, setDisplayErrors }) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     setDisplayErrors(false);
  //   }, 2000);
  // });
  return (
    <Alert w="100%" maxW="100%" status="error" bg="red.200" borderRadius={8}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between"
          w="100%"
        >
          <Heading
            fontSize="16"
            lineHeight="24"
            letterSpacing="-0.165"
            fontWeight="500"
            color="black.500"
            textTransform="capitalize"
          >
            Validation errors!
          </Heading>
          <IconButton
            onPress={() => setDisplayErrors(false)}
            p="2"
            bg="white.500"
            rounded="full"
            variant="solid"
            _icon={{
              as: Feather,
              name: "x",
              size: "4",
              color: "black.500",
            }}
          />
        </HStack>

        {errorData.map((err) => {
          return (
            <Text
              textAlign="left"
              fontSize="14"
              lineHeight="22"
              mb={0.5}
              fontWeight="400"
              color="black.500"
              letterSpacing="-0.165"
            >
              {err}
            </Text>
          );
        })}
      </VStack>
    </Alert>
  );
};

export default ValidationErrorAlert;
