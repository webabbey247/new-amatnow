import { useState } from "react";
import {
  FormControl,
  Stack,
  Heading,
  VStack,
  Button,
  Image,
  Input,
} from "native-base";
import { Formik } from "formik";
import { setHeight, setWidth } from "../../utils/helper";
import { useDispatch } from "react-redux";
// import images from '../../constants/images';
import { addRiderTips } from "../../redux/cart/cartSlice";
import { riderTipValidationSchema } from "../../utils/validation";
import icons from "../../constants/icons";

const CheckoutRiderTipsForm = ({
  onClose,
  setMessage,
  setShowAlert,
  setAlertStatus,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formData = {
    amount: "",
  };
  return (
    <Formik
      validationSchema={riderTipValidationSchema}
      initialValues={formData}
      onSubmit={(values, formikActions) => {
        setLoading(true);
        dispatch(addRiderTips(values.amount));
        setTimeout(() => {
            onClose(true);
          setMessage(`${values.amount} naira will be given to the rider`);
          setShowAlert(true);
          setAlertStatus("success");
          setLoading(false);
        }, 2000);
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
        <>
          <VStack my={2} w="100%" px={4} justifyContent="flex-start">
            <Heading
              fontSize="18"
              lineHeight="26"
              fontWeight="700"
              letterSpacing="-0.165"
              color="black.500"
              textAlign="center"
            >
              Rider Tips
            </Heading>
            <Stack flexDirection="column" my={8}>
              <FormControl mt={3} isInvalid={errors.amount ? true : false}>
                <FormControl.Label
                  my={3}
                  _text={{
                    color: "black.500",
                    fontSize: "16",
                    lineHeight: "24",
                    letterSpacing: "-0.165",
                    fontWeight: "500",
                  }}
                >
                  Amount
                </FormControl.Label>
                <Input
                  height={setHeight(7)}
                  InputLeftElement={
                    <Image
                      ml={2}
                      source={icons.BECOMERIDER}
                      alt="Promotions"
                      w={setWidth(8)}
                      h={setHeight(4)}
                    />
                  }
                  bg="grey.500"
                  placeholder="amount"
                  borderColor="grey.500"
                  borderRadius="8"
                  onChangeText={handleChange("amount")}
                  onBlur={handleBlur("amount")}
                  value={values.amount}
                  keyboardType="number-pad"
                />
                {errors.amount && touched.amount ? (
                  <FormControl.ErrorMessage color="red.500">
                    {errors.amount}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
            </Stack>
          </VStack>
          <VStack flex={0.2} justifyContent="flex-start" w="100%" py={5}>
            {loading ? (
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
                Confirm Gift Token
              </Button>
            )}
          </VStack>
        </>
      )}
    </Formik>
  );
};

export default CheckoutRiderTipsForm;
