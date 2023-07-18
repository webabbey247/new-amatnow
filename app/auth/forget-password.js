import { Fragment, useState } from "react";
import {
  Box,
  Center,
  useColorMode,
  ScrollView,
  Image,
  VStack,
  Spinner,
} from "native-base";
import images from "../../constants/images";
import { setHeight, setWidth } from "../../utils/helper";
import { ForgetPasswordForm } from "../../components/forms";
import { useGetCountryListQuery } from "../../redux/general/generalApiSlice";
import { CountryCodeModal } from "../../components/modals";

const ForgetPasswordPage = () => {
  const { colorMode } = useColorMode();
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    data: isCountryData,
    isLoading,
    isFetching,
  } = useGetCountryListQuery();
  return (
    <Box
      h="100%"
      maxHeight="100%"
      maxWidth="960"
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <ScrollView
        px={4}
        showsVerticalScrollIndicator={false}
        bg={colorMode === "dark" ? "black.500" : "white.500"}
      >
        <Center flex={1}>
          <VStack justifyContent="center" w="100%" maxW="300" py="5">
            <Image
              resizeMode="contain"
              source={images.FORGOTPASSWORDIMG}
              alt="Forget Password"
              height={setHeight(40)}
              width={setWidth(80)}
            />
          </VStack>
        </Center>

        {isLoading || isFetching ? (
          <Center flex={1}>
            <Spinner color="red.500" size="sm" />
          </Center>
        ) : (
          <Fragment>
            <ForgetPasswordForm
              setSelectedAreaCode={setSelectedAreaCode}
              selectedAreaCode={selectedAreaCode}
              setShowModal={setShowModal}
              isCountryData={isCountryData}
            />
            <CountryCodeModal
              showModal={showModal}
              isCountryData={isCountryData}
              setSelectedAreaCode={setSelectedAreaCode}
              setShowModal={setShowModal}
            />
          </Fragment>
        )}
      </ScrollView>
    </Box>
  );
};

export default ForgetPasswordPage;
