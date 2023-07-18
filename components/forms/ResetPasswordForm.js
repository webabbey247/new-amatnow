import { useState, useEffect } from "react";
import {
  VStack,
  Center,
  Button,
  Heading,
  Input,
  FormControl,
  Pressable,
  Icon,
} from "native-base";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useResetPasswordMutation } from "../../redux/auth/authApiSlice";
import { resetPassValidationSchema } from "../../utils/validation";
import { setHeight } from "../../utils/helper";
import { ToastAlert } from "../alerts";

const ResetPasswordForm = ({ mobileNumber }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [
    resetPassword,
    { data: isResetPasswordData, isLoading, isSuccess, isError, error },
  ] = useResetPasswordMutation();

  const resetFormData = {
    mobileNumber: mobileNumber,
    token: "",
    password: "",
    passwordConfirmation: "",
  };

  useEffect(() => {
    if (isError) {
      setMessage(error.data.message || error.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      setMessage(
        isResetPasswordData?.message ? isResetPasswordData?.message : null
      );
      setShowAlert(true);
      setAlertStatus("success");
      router.push("auth/confirmation");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetPasswordData, isError, isSuccess, error]);

  return (
    <Formik
      validationSchema={resetPassValidationSchema}
      initialValues={resetFormData}
      onSubmit={async (values, formikActions) => {
        const dataInfo = {
          phone: mobileNumber,
          token: values.token,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
        };
        try {
          const resetPasswordQuery = await resetPassword(dataInfo);
          // console.log('forget password response', forgetPassQuery);
          return resetPasswordQuery;
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
            <VStack justifyContent="flex-start" w="100%" maxW="300" mt="5">
              <Heading
                color="grey.700"
                fontSize="14px"
                lineHeight="20px"
                letterSpacing="0.165"
                fontWeight="500"
              >
                Enter the OTP sent to {mobileNumber ? mobileNumber : null}{" "}
                below.
              </Heading>
              <FormControl mt={5} isInvalid={errors.token ? true : false}>
                <FormControl.Label
                  _text={{
                    color: "black.500",
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0.165",
                    fontWeight: "500",
                  }}
                >
                  OTP
                </FormControl.Label>
                <Input
                  type="text"
                  placeholder="Enter pin"
                  my={1}
                  fontSize="14"
                  lineHeight="20"
                  placeholderTextColor="grey.700"
                  bg="grey.500"
                  height={setHeight(7)}
                  borderColor="grey.500"
                  borderRadius="8px"
                  onChangeText={handleChange("token")}
                  onBlur={handleBlur("token")}
                  value={values.token}
                />
                {errors.token && touched.token ? (
                  <FormControl.ErrorMessage color="red.500">
                    {errors.token}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
              <FormControl mt={3} isInvalid={errors.password ? true : false}>
                <FormControl.Label
                  _text={{
                    color: "black.500",
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0.165",
                    fontWeight: "500",
                  }}
                >
                  New password
                </FormControl.Label>
                <Input
                  placeholder="New password"
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
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon
                        as={<Feather name={showPassword ? "eye" : "eye-off"} />}
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
              <FormControl
                my={3}
                isInvalid={errors.passwordConfirmation ? true : false}
              >
                <FormControl.Label
                  _text={{
                    color: "black.500",
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0.165",
                    fontWeight: "500",
                  }}
                >
                  Re-enter new password
                </FormControl.Label>
                <Input
                  placeholder="Re-enter new password"
                  my={1}
                  fontSize="14"
                  lineHeight="20"
                  placeholderTextColor="grey.700"
                  bg="grey.500"
                  borderColor="grey.500"
                  borderRadius="8"
                  height={setHeight(7)}
                  secureTextEntry={showPassword ? false : true}
                  onChangeText={handleChange("passwordConfirmation")}
                  onBlur={handleBlur("passwordConfirmation")}
                  value={values.passwordConfirmation}
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon
                        as={<Feather name={showPassword ? "eye" : "eye-off"} />}
                        size={5}
                        mr="2"
                        color="grey.700"
                      />
                    </Pressable>
                  }
                />
                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                  <FormControl.ErrorMessage color="red.500">
                    {errors.passwordConfirmation}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
            </VStack>
          </Center>
          <Center flex={1}>
            <VStack justifyContent="center" w="300" maxW="100%" mt={5}>
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
                  Reset password
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
                  Reset password
                </Button>
              )}

              <Button
                width="100%"
                rounded="full"
                bg="grey.500"
                alignSelf="flex-start"
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

export default ResetPasswordForm;
