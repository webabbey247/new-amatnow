import { useState, useEffect, Fragment } from "react";
import {
  Text,
  VStack,
  Center,
  Button,
  Input,
  FormControl,
  Pressable,
  Icon,
} from "native-base";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { loginValidationSchema } from "../../utils/validation";
import { useLoginMutation } from "../../redux/auth/authApiSlice";
import { setHeight } from "../../utils/helper";
import { setAuthToken } from "../../utils/storage";
import { setUserDetails } from "../../redux/auth/authSlice";
import { ToastAlert } from "../alerts";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");

  const [login, { data: isLoginData, isLoading, isError, error, isSuccess }] =
    useLoginMutation();

  const loginInfo = {
    username: "",
    password: "",
  };

  useEffect(() => {
    if (isError) {
      console.log("error data", error);
      // SnackbarAlert.error(error.data.message || error.message);
      setMessage(error.data.message || error.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      setMessage(isLoginData?.message);
      setShowAlert(true);
      setAlertStatus("success");
      setAuthToken(isLoginData?.access_token);
      dispatch(setUserDetails(isLoginData?.access_token));
      // console.log("success data", isLoginData?.access_token);
      router.push("(tabs)/market");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginData, isError, isSuccess, error]);

  return (
    <Formik
      // validationSchema={loginValidationSchema}
      validationSchema=""
      initialValues={loginInfo}
      onSubmit={async (values, formikActions) => {
        const dataInfo = {
          email: "johndoe@gmail.com",
          password: "password",
          // email: values.username,
          // password: values.password,
        };

        try {
          const authResponse = await login(dataInfo);
          return authResponse?.data;
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
            ) : null}

            <VStack justifyContent="flex-start" w="100%" mt="3">
              <FormControl mt={3} isInvalid={errors.password ? true : false}>
                <FormControl.Label
                  _text={{
                    color: "black.500",
                    fontSize: "14",
                    lineHeight: "20",
                    letterSpacing: "-0.165",
                    fontWeight: "500",
                  }}
                >
                  Email address or phone number
                </FormControl.Label>
                <Input
                  type="text"
                  placeholder="Enter email or phone"
                  my={1}
                  fontSize="14"
                  lineHeight="20"
                  placeholderTextColor="grey.700"
                  bg="grey.500"
                  height={setHeight(7)}
                  borderColor="grey.500"
                  borderRadius="8px"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {errors.username && touched.username ? (
                  <FormControl.ErrorMessage color="red.500">
                    {errors.username}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
              <FormControl my={3} isInvalid={errors.username ? true : false}>
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
                  // maxLength={8}
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
              <Pressable
                mb={4}
                alignItems="flex-end"
                justifyContent="flex-end"
                onPress={() => router.replace("auth/forget-password")}
              >
                <Text
                  color="red.500"
                  fontSize="14"
                  lineHeight="20"
                  letterSpacing="-0.17"
                  fontWeight="500"
                >
                  Forgot your password?
                </Text>
              </Pressable>
            </VStack>
          </Center>
          <Center flex={1}>
            <VStack justifyContent="flex-start" w="100%" mt="4">
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
                  Log In
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
                  Log In
                </Button>
              )}

              <Button
                width="100%"
                rounded="full"
                bg="red.200"
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
                onPress={() => router.push("(tabs)/market")}
              >
                Continue as guest
              </Button>
            </VStack>
          </Center>
        </Fragment>
      )}
    </Formik>
  );
};

export default LoginForm;
