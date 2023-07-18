import { useState, useEffect, Fragment } from "react";
import {
  VStack,
  Center,
  Button,
  HStack,
  Input,
  FormControl,
  TextArea,
} from "native-base";
import { Formik } from "formik";
import * as Location from "expo-location";
import { AddressFilterSlider } from "../sliders";
import { setHeight, setWidth, GOOGLE_API_KEY } from "../../utils/helper";
import { useRouter } from "expo-router";
import { useSaveUserAddressMutation } from "../../redux/general/generalApiSlice";
import { ToastAlert, ValidationErrorAlert } from "../alerts";

const SearchMapAddressForm = ({ longitude, latitude, isCountryData }) => {
  const router = useRouter();
  const [instructions, setInstructions] = useState("");
  const [country, setCountry] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [errorData, setErrorData] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  // initialize Google API KEY
  Location.setGoogleApiKey(GOOGLE_API_KEY);

  const [
    saveUserAddress,
    { data: isData, isLoading, isSuccess, isError, error },
  ] = useSaveUserAddressMutation();

  //   console.log("hello longitude data", longitude);
  //   console.log("hello latitude data", latitude);
  //   console.log("hello data", formattedAddress);

  const initialValues = {
    lat: "",
    long: "",
    zip: "",
    country_id: "",
    default: false,
    instructions: "",
    apartment: "",
    street: "",
    city: "",
    landmark: "",
    state: "",
    alias: "",
  };

  const getFullAddress = async () => {
    const coordinate = {
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
    };

    try {
      const getAddress = await Location.reverseGeocodeAsync(coordinate, {
        useGoogleMaps: true,
      });
      if (getAddress) {
        const countryID = isCountryData.filter(
          (item) => item.name === getAddress[0]?.country
        );
        setFormattedAddress(getAddress[0]);
        setCountry(countryID[0]?.id);
      }
    } catch (err) {
      console.log("errr response", err);
    }
  };

  useEffect(() => {
    getFullAddress();
  }, [longitude, latitude]);

  useEffect(() => {
    if (isError) {
      // console.log("error data", error);
      setMessage(error.data.message || error.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      router.push("main/modals/fullscreen-map");
      setMessage("Address added successfully!");
      setShowAlert(true);
      setAlertStatus("success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isData, isError, isSuccess, error]);

  return (
    <Formik
      validationSchema=""
      initialValues={initialValues}
      onSubmit={async (values, formikActions) => {
        const formData = {
          lat: latitude,
          long: longitude,
          zip: formattedAddress.postalCode,
          country_id: country,
          default: false,
          instructions:
            values.deliveryInstructions !== ""
              ? values.deliveryInstructions
              : instructions,
          apartment: "",
          street: formattedAddress.name,
          city: formattedAddress.city,
          landmark: "",
          state: formattedAddress.region,
          alias: values.label,
        };
        console.log("form data", formData);

        try {
          const saveAddress = await saveUserAddress(formData);
          return saveAddress;
        } catch (err) {
          console.log("err response", err);
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
              <FormControl mt={3} isInvalid={errors.label ? true : false}>
                <FormControl.Label
                  _text={{
                    color: "black.500",
                    fontSize: "14",
                    lineHeight: "20",
                    letterSpacing: "-0.165",
                    fontWeight: "500",
                  }}
                >
                  Label
                </FormControl.Label>
                <Input
                  type="text"
                  placeholder="E.g Home, Work"
                  my={1}
                  fontSize="14"
                  lineHeight="20"
                  placeholderTextColor="grey.700"
                  bg="grey.500"
                  borderColor="grey.500"
                  borderRadius="8"
                  height={setHeight(7)}
                  onChangeText={handleChange("label")}
                  onBlur={handleBlur("label")}
                  value={values.label}
                />
                {errors.label && touched.label ? (
                  <FormControl.ErrorMessage color="red.500">
                    {errors.label}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>

              <FormControl mt={3}>
                <FormControl.Label
                  mb={2}
                  _text={{
                    color: "black.500",
                    fontSize: "14",
                    lineHeight: "20",
                    letterSpacing: "-0.165",
                    fontWeight: "500",
                  }}
                >
                  Delivery instructions
                </FormControl.Label>

                <AddressFilterSlider
                  instructions={instructions}
                  setInstructions={setInstructions}
                />
                <TextArea
                  onChangeText={handleChange("deliveryInstructions")}
                  h={setHeight(15)}
                  placeholderTextColor="grey.700"
                  placeholder="Enter additional information"
                  fontSize="14"
                  bg="grey.500"
                  lineHeight="20"
                  fontWeight="400"
                  letterSpacing="-0.165"
                  color="black.500"
                />
              </FormControl>
            </VStack>
          </Center>
          <Center flex={1} py={4}>
            {isLoading ? (
              <Button
                mt={3}
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
              />
            ) : (
              <Button
                mt={3}
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
                Add Address
              </Button>
            )}
          </Center>
        </Fragment>
      )}
    </Formik>
  );
};

export default SearchMapAddressForm;
