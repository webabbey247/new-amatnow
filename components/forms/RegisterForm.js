import { useState, useEffect, Fragment } from "react";
import { Platform } from "react-native";
import {
  Stack,
  VStack,
  Center,
  Button,
  HStack,
  Input,
  FormControl,
  Pressable,
  Icon,
  KeyboardAvoidingView,
  Image,
  Text,
} from "native-base";
import Feather from "@expo/vector-icons/Feather";
import { Formik } from "formik";
import PhoneInput from "react-phone-number-input/react-native-input";
import { registerValidationSchema } from "../../utils/validation";
import { setHeight, setWidth } from "../../utils/helper";
import { useRegisterMutation } from "../../redux/auth/authApiSlice";
import { CountryCodeModal } from "../modals";
import { useGetCountryListQuery } from "../../redux/general/generalApiSlice";
import { useRouter } from "expo-router";
import { ToastAlert, ValidationErrorAlert } from "../alerts";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [areaCode, setAreaCode] = useState([]);
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [errorData, setErrorData] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  const [
    register,
    { data: isRegisterData, isLoading, isSuccess, isError, error },
  ] = useRegisterMutation();
  const {
    data: isCountryData,
    isLoading: isCountryLoading,
    isFetching: isCountryFetching,
  } = useGetCountryListQuery();

  const registerInfo = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    mobileNumber: "",
    password: "",
  };

  useEffect(() => {
    if (isCountryData?.length > 0) {
      let defaultAreaData = isCountryData.filter((a) => a.iso2 === "NG");
      if (defaultAreaData.length > 0) {
        setSelectedAreaCode(defaultAreaData[0]);
      }
    }
  }, []);

  useEffect(() => {
    // if (isCountryData?.length > 0) {
    //   let defaultAreaData = isCountryData.filter((a) => a.iso2 === "NG");
    //   if (defaultAreaData.length > 0) {
    //     setSelectedAreaCode(defaultAreaData[0]);
    //   }
    // }

    if (isError) {
      if (error.data.errors) {
        const errorArray = Object.values(error.data.errors).reduce(
          (acc, msgs) => acc.concat(msgs),
          []
        );
        // console.log('error array', errorArray);
        // console.log('error response', error.data.message);

        setErrorData(errorArray);
        setDisplayErrors(true);
      } else {
        setMessage(error.data.message);
        setShowAlert(true);
        setAlertStatus("error");
      }
      // console.log('error data', error.data);
    }
    if (isSuccess) {
      // console.log('success data', isRegisterData.message);
      setMessage(isRegisterData?.message);
      setShowAlert(true);
      setAlertStatus("success");
      router.push("auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegisterData, isError, isSuccess, error]);
  return (
    <Formik
      validationSchema={registerValidationSchema}
      initialValues={registerInfo}
      onSubmit={async (values, formikActions) => {
        const dataInfo = {
          // first_name: "Fatima",
          // last_name: "Adebogun",
          // email: "fatima.adebogun@gmail.com",
          // phone: ["+234", "8137084255"].join(""),
          // password: "password",
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.emailAddress,
          phone: [selectedAreaCode.phone_code, +values.mobileNumber].join(""),
          password: values.password,
        };

        console.log("form data", dataInfo);

        try {
          const authResponse = await register(dataInfo);
          return authResponse;
        } catch (err) {
          console.log("error response", err.response);
        }
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
            ) : displayErrors ? (
              <ValidationErrorAlert
                setDisplayErrors={setDisplayErrors}
                errorData={errorData}
              />
            ) : null}
            <VStack justifyContent="flex-start" w="100%">
              <HStack
                mt={3}
                justifyContent="space-between"
                alignItems="space-between"
              >
                <FormControl
                  isInvalid={errors.firstName ? true : false}
                  w="48%"
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
                    First name
                  </FormControl.Label>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    my={1}
                    fontSize="14"
                    lineHeight="20"
                    placeholderTextColor="grey.700"
                    bg="grey.500"
                    borderColor="grey.500"
                    borderRadius="8"
                    height={setHeight(7)}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName ? (
                    <FormControl.ErrorMessage color="red.500">
                      {errors.firstName}
                    </FormControl.ErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl isInvalid={errors.lastName ? true : false} w="48%">
                  <FormControl.Label
                    _text={{
                      color: "black.500",
                      fontSize: "14",
                      lineHeight: "20",
                      letterSpacing: "-0.165",
                      fontWeight: "500",
                    }}
                  >
                    Last name
                  </FormControl.Label>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    my={1}
                    fontSize="14"
                    lineHeight="20"
                    placeholderTextColor="grey.700"
                    bg="grey.500"
                    borderColor="grey.500"
                    borderRadius="8"
                    height={setHeight(7)}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName ? (
                    <FormControl.ErrorMessage color="red.500">
                      {errors.lastName}
                    </FormControl.ErrorMessage>
                  ) : null}
                </FormControl>
              </HStack>

              <FormControl
                mt={3}
                isInvalid={errors.emailAddress ? true : false}
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
                  Email address
                </FormControl.Label>
                <Input
                  type="text"
                  placeholder="Enter your email address"
                  my={1}
                  fontSize="14"
                  lineHeight="20"
                  placeholderTextColor="grey.700"
                  bg="grey.500"
                  borderColor="grey.500"
                  borderRadius="8"
                  onChangeText={handleChange("emailAddress")}
                  onBlur={handleBlur("emailAddress")}
                  value={values.emailAddress}
                  keyboardType="email-address"
                  height={setHeight(7)}
                />
                {errors.emailAddress && touched.emailAddress ? (
                  <FormControl.ErrorMessage color="red.500">
                    {errors.emailAddress}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
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
              <FormControl my={2} isInvalid={errors.password ? true : false}>
                <FormControl.Label
                  _text={{
                    color: "black.500",
                    fontSize: "14",
                    lineHeight: "20",
                    letterSpacing: "-0.165",
                    fontWeight: "500",
                  }}
                >
                  Password
                </FormControl.Label>
                <Input
                  placeholder="Enter password"
                  my={1}
                  fontSize="14"
                  lineHeight="20"
                  placeholderTextColor="grey.700"
                  bg="grey.500"
                  borderColor="grey.500"
                  borderRadius="8"
                  height={setHeight(7)}
                  secureTextEntry={showPassword ? false : true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  returnKeyType="done"
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon
                        as={
                          <Feather
                            name={showPassword ? "eye" : "eye-off"}
                            size={5}
                          />
                        }
                        size={5}
                        mr="2"
                        color="grey.700"
                      />
                    </Pressable>
                  }
                />
                {errors.password && touched.password ? (
                  <FormControl.ErrorMessage color="red.500">
                    {errors.password}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
            </VStack>
          </Center>
          <Center flex={1}>
            <VStack justifyContent="flex-start" w="100%" mt="5">
              {isLoading || isCountryLoading || isCountryFetching ? (
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
                  Create My Account
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
                  Create My Account
                </Button>
              )}

              <Button
                width="100%"
                rounded="full"
                bg="red.200"
                mt="3"
                py="4"
                colorScheme="red.500"
                _text={{
                  color: "red.500",
                  fontWeight: "500",
                  textTransform: "none",
                  fontSize: "16",
                  lineHeight: "24",
                  letterSpacing: "0.165",
                }}
                onPress={() => router.push("main/market")}
              >
                Continue as guest
              </Button>
            </VStack>
          </Center>

          {!isCountryLoading || !isCountryFetching ? (
            <CountryCodeModal
              showModal={showModal}
              isCountryData={isCountryData}
              setSelectedAreaCode={setSelectedAreaCode}
              setShowModal={setShowModal}
            />
          ) : null}
        </Fragment>
      )}
    </Formik>
  );
};

export default RegisterForm;
