import {
  Center,
  Avatar,
  Heading,
  HStack,
  Stack,
  Button,
  Image,
} from "native-base";
import { setHeight, setWidth } from "../../../utils/helper";
import icons from "../../../constants/icons";

const UserProfileCard = ({ isUserData }) => {
  return (
    // <Center >
      <HStack py={4} justifyContent="flex-start" alignItems="flex-start">
        <Image
          w={setWidth(16)}
          h={setHeight(8)}
          source={icons.PROFILEICON}
          alt="profile"
          resizeMode="contain"
        />
        <Stack flexDirection="column" ml={4}>
          <Heading
            fontSize="16"
            lineHeight="24"
            letterSpacing="-0.165"
            fontWeight="700"
            color="black.500"
            mb="0.5"
          >
            {[isUserData.first_name, isUserData.last_name].join(" ")}
          </Heading>
          <Button
            py="1"
            px="3"
            rounded="full"
            bg="grey.500"
            _text={{
              color: "red.500",
              textAlign: "center",
              fontSize: "14",
              lineHeight: "22",
              letterSpacing: "-0.165",
              fontWeight: "500",
            }}
          >
            Edit
          </Button>
        </Stack>
      </HStack>
    // </Center>
  );
};

export default UserProfileCard;
