import { useState, useEffect, Fragment } from "react";
import { Platform } from "react-native";
import {
  VStack,
  Center,
  Button,
  Stack,
  Input,
  FormControl,
  Pressable,
  Icon,
  Text,
  KeyboardAvoidingView,
} from "native-base";
import Feather from "@expo/vector-icons/Feather";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { forgetPassValidationSchema } from "../../utils/validation";
import { setHeight } from "../../utils/helper";
import { CountryCodeModal } from "../modals";
import { ToastAlert } from "../alerts";
import { useForgetPassMutation } from "../../redux/auth/authApiSlice";
// import { useGetCountryListQuery } from "../../redux/general/generalApiSlice";

const ForgetPasswordForm = ({
  selectedAreaCode,
  setSelectedAreaCode,
  setShowModal,
  isCountryData,
}) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [
    forgetPass,
    { data: responseData, isLoading, isSuccess, isError, error },
  ] = useForgetPassMutation();
  // const {
  //   data: isCountryData,
  //   isLoading: isCountryLoading,
  //   isFetching: isCountryFetching,
  // } = useGetCountryListQuery();

  const forgetPassInfo = {
    mobileNumber: "",
  };

  useEffect(() => {
    if (isCountryData?.length > 0) {
      let defaultAreaData = isCountryData.filter((a) => a.iso2 === "NG");
      if (defaultAreaData.length > 0) {
        setSelectedAreaCode(defaultAreaData[0]);
      }
    }

    if (isError) {
      // console.log('error response', error.data.message || error.message);
      setMessage(error.data.message || error.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      // console.log('success data', responseData.message);
      setMessage(responseData?.message);
      setShowAlert(true);
      setAlertStatus("success");
      router.push(
        `auth/verify-otp?phone=${phoneNumber}&title="Forget Password"`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, isError, isSuccess, error]);
  return (
    <Formik
      validationSchema={forgetPassValidationSchema}
      initialValues={forgetPassInfo}
      onSubmit={async (values, formikActions) => {
        const defaultCountryCode = selectedAreaCode.phone_code
          ? selectedAreaCode.phone_code
          : "+234";
        const dataInfo = {
          phone: [defaultCountryCode, +values.mobileNumber].join(""),
        };
        setPhoneNumber([defaultCountryCode, +values.mobileNumber].join(""));

        try {
          const forgetPassQuery = await forgetPass(dataInfo);
          // console.log('forget password response', forgetPassQuery);
          return forgetPassQuery;
        } catch (err) {
          console.log("error response", err.response);
        }
        // console.log('Forget Dump', dataInfo);
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
        <Fragment>
          <Center flex={1}>
            {showAlert ? (
              <ToastAlert
                message={message}
                status={alertStatus}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
              />
            ) : null}
            <VStack justifyContent="flex-start" w="100%" mt="5">
              <FormControl
                mt={3}
                isInvalid={errors.mobileNumber ? true : false}
              >
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
                  placeholder="Enter your phone number"
                  my={1}
                  fontSize="14"
                  lineHeight="20"
                  placeholderTextColor="grey.700"
                  bg="grey.500"
                  height={setHeight(7)}
                  borderColor="grey.500"
                  borderRadius="8"
                  onChangeText={handleChange("mobileNumber")}
                  onBlur={handleBlur("mobileNumber")}
                  value={values.mobileNumber}
                  keyboardType="number-pad"
                  InputLeftElement={
                    <Pressable onPress={() => setShowModal(true)}>
                      <Stack
                        px={3}
                        bg="red.500"
                        height={setHeight(7)}
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text
                          fontSize="14"
                          lineHeight="24"
                          letterSpacing="-0.165"
                          fontWeight="400"
                          color="grey.500"
                          mr={2}
                        >
                          {selectedAreaCode.phone_code
                            ? selectedAreaCode.phone_code
                            : "+234"}
                        </Text>
                        <Icon
                          as={<Feather name="chevron-down" size={6} />}
                          color="white.500"
                        />
                      </Stack>
                    </Pressable>
                  }
                />
                {errors.mobileNumber && touched.mobileNumber ? (
                  <FormControl.ErrorMessage color="red.500">
                    {errors.mobileNumber}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
            </VStack>
          </Center>
          <Center flex={1}>
            <VStack justifyContent="flex-start" w="100%" mt="5">
              {isLoading ? (
                <Button
                  width="100%"
                  rounded="full"
                  bg="red.500"
                  py="4"
                  isLoading
                  _loading={{
                    bg: "red.500",
                  }}
                  _spinner={{
                    color: "white",
                  }}
                  isLoadingText="Please wait"
                >
                  Send OTP
                </Button>
              ) : (
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
                  onPress={handleSubmit}
                >
                  Send OTP
                </Button>
              )}

              <Button
                width="100%"
                rounded="full"
                bg="grey.500"
                mt="3"
                py="4"
                _text={{
                  color: "red.500",
                  fontWeight: "500",
                  textTransform: "none",
                  fontSize: "16",
                  lineHeight: "24",
                  letterSpacing: "0.165",
                }}
                onPress={() => router.push("auth/login")}
              >
                Log In
              </Button>
            </VStack>
          </Center>
        </Fragment>
      )}
    </Formik>
  );
};

export default ForgetPasswordForm;
