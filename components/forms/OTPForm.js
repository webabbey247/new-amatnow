import { useState, useRef, useEffect, Fragment } from "react";
import {
  VStack,
  Center,
  Button,
  HStack,
  Input,
  FormControl,
} from "native-base";
import { Formik } from "formik";
import { setHeight, setWidth } from "../../utils/helper";
import {
  useVerifyPhoneMutation,
  useResendOTPMutation,
} from "../../redux/auth/authApiSlice";
import { ToastAlert } from "../alerts";
import { useRouter } from "expo-router";

const OTPForm = ({ mobileNumber, title }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "" });

  const otpArray = [];
  const values = Object.values(otp);
  Array.prototype.push.apply(otpArray, values);

  const [
    verifyPhone,
    { data: verifyCodeData, isLoading, isSuccess, isError, error },
  ] = useVerifyPhoneMutation();

  const [resendOTP] = useResendOTPMutation();

  const verifyInfo = {
    token: "",
    phone: mobileNumber ? mobileNumber : null,
  };

  //handle resend OTP Request
  const handleResendCodeSubmit = async () => {
    setLoading(true);
    const resendInfo = {
      phone: mobileNumber ? mobileNumber : null,
    };
    try {
      const responseData = await resendOTP(resendInfo);
      // console.log('resend OTP response', responseData);
      if (responseData?.data.status === "success") {
        setMessage(responseData?.data.message);
        setShowAlert(true);
        setAlertStatus("success");
      } else {
        setMessage(responseData?.data.message);
        setShowAlert(true);
        setAlertStatus("error");
      }
    } catch (err) {
      console.log("error resend response", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isError) {
      setMessage(error.data.message || error.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      setMessage(verifyCodeData?.message);
      setShowAlert(true);
      setAlertStatus("success");
      if (title === "Forget Password") {
        router.push(`auth/reset-password?phone=${phoneNumber}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyCodeData, isError, isSuccess, error]);

  return (
    <Formik
      validationSchema=""
      initialValues={verifyInfo}
      onSubmit={async () => {
        const otpData = otpArray.join("");

        if (otpData.length < 5) {
          setMessage("Incomplete OTP! Kindly confirm and try again!");
          setShowAlert(true);
          setAlertStatus("error");
        } else {
          const dataInfo = {
            token: otpData,
            phone: mobileNumber.mobileNumber,
          };

          try {
            const authResponse = await verifyPhone(dataInfo);
            return authResponse?.data;
          } catch (err) {
            // console.log('error response', err.response);
          }
        }
      }}
    >
      {({ handleSubmit }) => (
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

            <VStack justifyContent="flex-end" w="100%" mb={5} px={4}>
              <FormControl>
                <HStack justifyContent="space-between">
                  <Input
                    type="text"
                    size="md"
                    borderRadius="50px"
                    bg="grey.500"
                    borderColor="grey.500"
                    w={setWidth(14)}
                    h={setHeight(7)}
                    textAlign="center"
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={firstInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 1: text });
                      text && secondInput.current.focus();
                    }}
                  />
                  <Input
                    type="text"
                    size="md"
                    borderRadius="50px"
                    bg="grey.500"
                    borderColor="grey.500"
                    w={setWidth(14)}
                    h={setHeight(7)}
                    textAlign="center"
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={secondInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 2: text });
                      text
                        ? thirdInput.current.focus()
                        : firstInput.current.focus();
                    }}
                  />
                  <Input
                    type="text"
                    size="md"
                    borderRadius="50px"
                    bg="grey.500"
                    borderColor="grey.500"
                    w={setWidth(14)}
                    h={setHeight(7)}
                    textAlign="center"
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={thirdInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 3: text });
                      text
                        ? fourthInput.current.focus()
                        : secondInput.current.focus();
                    }}
                  />
                  <Input
                    type="text"
                    size="md"
                    w={setWidth(14)}
                    h={setHeight(7)}
                    borderRadius="50px"
                    bg="grey.500"
                    borderColor="grey.500"
                    textAlign="center"
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={fourthInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 4: text });
                      text
                        ? fifthInput.current.focus()
                        : thirdInput.current.focus();
                    }}
                  />
                  <Input
                    type="text"
                    size="md"
                    w={setWidth(14)}
                    h={setHeight(7)}
                    borderRadius="50px"
                    bg="grey.500"
                    borderColor="grey.500"
                    textAlign="center"
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={fifthInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 5: text });
                      !text && fourthInput.current.focus();
                    }}
                  />
                </HStack>
              </FormControl>
            </VStack>
          </Center>
          <Center flex={1}>
            <VStack justifyContent="flex-start" w="100%" py={5}>
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
                    color: "white.500",
                  }}
                  isLoadingText="Please wait"
                >
                  Verify
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
                  Verify
                </Button>
              )}

              {loading ? (
                <Button
                  width="100%"
                  rounded="full"
                  bg="grey.500"
                  py="4"
                  mt="3"
                  isLoading
                  _loading={{
                    bg: "black.500",
                  }}
                  _spinner={{
                    color: "white.500",
                  }}
                  isLoadingText="Please wait"
                >
                  Verify
                </Button>
              ) : (
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
                  onPress={handleResendCodeSubmit}
                >
                  Resend Code
                </Button>
              )}
            </VStack>
          </Center>
        </Fragment>
      )}
    </Formik>
  );
};

export default OTPForm;
