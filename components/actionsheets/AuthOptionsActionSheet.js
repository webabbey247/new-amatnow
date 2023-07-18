import { Text, Actionsheet, Center, Button, VStack } from "native-base";
import { setHeight } from "../../utils/helper";
import { useRouter } from "expo-router";

const AuthOptionsActionSheet = ({ isOpen, onClose }) => {
  const router = useRouter();
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content h={setHeight(25)}>
        <Center flex={1} w="100%" bg="white.500" px={4}>
          <VStack justifyContent="center" alignItems="center" w="100%">
            <Text>You are not logged in? Proceed with the options below</Text>
            <Button
              onPress={() => router.push("auth/login")}
              w="100%"
              rounded="full"
              bg="red.500"
              mt="3"
              py="4"
              _text={{
                color: "white.500",
                fontWeight: "700",
                textTransform: "none",
                fontSize: "14",
                lineHeight: "20",
                letterSpacing: "0.165",
                textAlign: "center",
              }}
            >
              Login
            </Button>
          </VStack>
        </Center>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default AuthOptionsActionSheet;
