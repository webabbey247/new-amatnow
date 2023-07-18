import { Center, Image, Heading, Text, VStack, Button } from "native-base";
import Netinfo from "@react-native-community/netinfo";
import images from "../../../constants/images";
import { setWidth, setHeight } from "../../../utils/helper";
import { Fragment } from "react";

const NoInternetCard = ({ screenType, title, subtitle }) => {
  const validateConnection = () => {
    Netinfo.fetch().then((status) => {
      console.log("hello status", status);
    });
  };

  return (
    <Fragment>
      <Center mb={3}>
        <Image
          w={setWidth(80)}
          h={setHeight(35)}
          source={images.NOINTERNETIMG}
          alt="No Saved Item"
          resizeMode="contain"
        />
        <Heading
          fontSize="18"
          lienHeight="28"
          color="black.500"
          fontWeight="700"
          textAlign="center"
          mt={4}
          letterSpacing="-0.165"
        >
          {title}
        </Heading>
        <Text
          fontSize="14"
          lienHeight="20"
          color="black.500"
          fontWeight="400"
          textAlign="center"
          px={12}
          letterSpacing="-0.165"
        >
          {subtitle}
        </Text>
      </Center>

      <Center flex={1}>
        <VStack justifyContent="flex-start" w="100%" mt="5">
          {screenType === "network" ? (
            <Button
              onPress={() => validateConnection()}
              width="100%"
              height={setHeight(7)}
              rounded="full"
              bg="red.500"
              py={4}
              _text={{
                color: "white.500",
                fontWeight: "500",
                textTransform: "none",
                fontSize: "16",
                lineHeight: "24",
                letterSpacing: "0.165",
              }}
            >
              Reload
            </Button>
          ) : (
            <Button
              onPress={() =>
                router.push(
                  `/main/restuarant/restuarant-details/${restuarantID}`
                )
              }
              width="100%"
              height={setHeight(7)}
              rounded="full"
              bg="red.500"
              py={4}
              _text={{
                color: "white.500",
                fontWeight: "500",
                textTransform: "none",
                fontSize: "16",
                lineHeight: "24",
                letterSpacing: "0.165",
              }}
            >
              Proceed to login
            </Button>
          )}
        </VStack>
      </Center>
    </Fragment>
  );
};

export default NoInternetCard;
