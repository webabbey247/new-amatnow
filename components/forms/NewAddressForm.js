import { useState, useEffect, Fragment, useRef } from "react";
import { Platform } from "react-native";
import {
  Stack,
  VStack,
  Center,
  Button,
  HStack,
  Input,
  FormControl,
  TextArea,
  Icon,
  KeyboardAvoidingView,
  Image,
  Text,
  Select,
  Switch,
} from "native-base";
import { Formik } from "formik";
import { newAddressValidationSchema } from "../../utils/validation";
import { useSaveUserAddressMutation } from "../../redux/general/generalApiSlice";
import { AddressFilterSlider } from "../sliders";
import { setHeight, setWidth } from "../../utils/helper";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ToastAlert, ValidationErrorAlert } from "../alerts";
import * as Location from "expo-location";
import { GOOGLE_API_KEY } from "../../utils/helper";

const NewAddressForm = ({ isCountryData }) => {
  const router = useRouter();
  const ref = useRef(null);
  const [country, setCountry] = useState("");
  const [coordinate, setCoordinate] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isDefault, setIsDefault] = useState(false);
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



  const initialFormValues = {
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

  const handleCountrySelect = async (countryID) => {
    const selectedCountry = isCountryData.filter(
      (item) => item.id === countryID
    );
    console.log("selected country", selectedCountry);
    // Get Long and Lat
    // sample response [{"accuracy": 100, "altitude": 0, "latitude": 54.2605819, "longitude": -1.9790574}]
    try {
      const getLongLat = await Location.geocodeAsync(selectedCountry[0]?.name, {
        useGoogleMaps: true,
      });
      console.log("get long n lat", getLongLat);
      if (getLongLat) {
        setCoordinate(getLongLat);
        setCountry(selectedCountry[0]?.id);
      }
    } catch (err) {
      console.log("err response", getLongLat);
    }
  };

  useEffect(() => {
    if (isError) {
      // console.log("error data", error);
      setMessage(error.data.message || error.message);
      setShowAlert(true);
      setAlertStatus("error");
    }
    if (isSuccess) {
      // console.log("success data", isData);
      router.push("main/profile/user-address-list");
      setMessage("Address added successfully!");
      setShowAlert(true);
      setAlertStatus("success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isData, isError, isSuccess, error]);

  return (
    <Formik
      validationSchema={newAddressValidationSchema}
      enableReintialize={true}
      initialValues={initialFormValues}
      onSubmit={async (values, formikActions) => {
        const formData = {
          lat: coordinate[0]?.latitude,
          long: coordinate[0]?.longitude,
          zip: values.zipCode,
          country_id: country,
          default: isDefault,
          instructions:
            values.deliveryInstructions !== ""
              ? values.deliveryInstructions
              : instructions,
          apartment: "",
          street: values.streetName,
          city: values.city,
          landmark: values.landmark,
          state: values.deliveryState,
          alias: values.label,
        };
        console.log("form data", formData);

        try {
          const saveAddress = await saveUserAddress(formData);
          return saveAddress;
        } catch (err) {
          console.log("err response", err);
        }

        // formikActions.resetForm();
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
                  _text={{
                    color: "black.500",
                    fontSize: "14",
                    lineHeight: "20",
                    letterSpacing: "-0.165",
                    fontWeight: "500",
                  }}
                >
                  Street
                </FormControl.Label>
                <Input
                  type="text"
                  placeholder="Enter your street name"
                  my={1}
                  fontSize="14"
                  lineHeight="20"
                  placeholderTextColor="grey.700"
                  bg="grey.500"
                  borderColor="grey.500"
                  borderRadius="8"
                  onChangeText={handleChange("streetName")}
                  onBlur={handleBlur("streetName")}
                  value={values.streetName}
                  height={setHeight(7)}
                />
              </FormControl>

              <FormControl mt={3}>
                <FormControl.Label
                  _text={{
                    color: "black.500",
                    fontSize: "14",
                    lineHeight: "20",
                    letterSpacing: "-0.165",
                    fontWeight: "500",
                  }}
                >
                  Town / City
                </FormControl.Label>
                <Input
                  type="text"
                  placeholder="Enter your town or city"
                  my={1}
                  fontSize="14"
                  lineHeight="20"
                  placeholderTextColor="grey.700"
                  bg="grey.500"
                  borderColor="grey.500"
                  borderRadius="8"
                  height={setHeight(7)}
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  value={values.city}
                />
              </FormControl>

              <FormControl mt={3}>
                <FormControl.Label
                  _text={{
                    color: "black.500",
                    fontSize: "14",
                    lineHeight: "20",
                    letterSpacing: "-0.165",
                    fontWeight: "500",
                  }}
                >
                  Landmark
                </FormControl.Label>
                <Input
                  type="text"
                  placeholder="Enter landmark"
                  my={1}
                  fontSize="14"
                  lineHeight="20"
                  placeholderTextColor="grey.700"
                  bg="grey.500"
                  borderColor="grey.500"
                  borderRadius="8"
                  onChangeText={handleChange("landmark")}
                  onBlur={handleBlur("landmark")}
                  value={values.landmark}
                  height={setHeight(7)}
                />
              </FormControl>

              {/* <FormControl mt={3} isInvalid={errors.state ? true : false}>
                <FormControl.Label
                  _text={{
                    color: "black.500",
                    fontSize: "14",
                    lineHeight: "20",
                    letterSpacing: "-0.165",
                    fontWeight: "500",
                  }}
                >
                  State
                </FormControl.Label>
                <Input
                  type="text"
                  placeholder="Enter state"
                  my={1}
                  fontSize="14"
                  lineHeight="20"
                  placeholderTextColor="grey.700"
                  bg="grey.500"
                  borderColor="grey.500"
                  borderRadius="8"
                  onChangeText={handleChange("state")}
                  onBlur={handleBlur("state")}
                  value={values.state}
                  height={setHeight(7)}
                />
                {errors.state && touched.state ? (
                  <FormControl.ErrorMessage color="red.500">
                    {errors.state}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl> */}

              <HStack
                mt={3}
                justifyContent="space-between"
                alignItems="space-between"
              >
                <FormControl
                  isInvalid={errors.deliveryState ? true : false}
                  w="60%"
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
                    State
                  </FormControl.Label>
                  <Input
                    type="text"
                    placeholder="Enter state"
                    my={1}
                    fontSize="14"
                    lineHeight="20"
                    placeholderTextColor="grey.700"
                    bg="grey.500"
                    borderColor="grey.500"
                    borderRadius="8"
                    height={setHeight(7)}
                    onChangeText={handleChange("deliveryState")}
                    onBlur={handleBlur("deliveryState")}
                    value={values.deliveryState}
                  />
                  {errors.state && touched.state ? (
                    <FormControl.ErrorMessage color="red.500">
                      {errors.state}
                    </FormControl.ErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl w="35%">
                  <FormControl.Label
                    _text={{
                      color: "black.500",
                      fontSize: "14",
                      lineHeight: "20",
                      letterSpacing: "-0.165",
                      fontWeight: "500",
                    }}
                  >
                    Zip Code
                  </FormControl.Label>
                  <Input
                    type="text"
                    placeholder="Enter zip code"
                    my={1}
                    fontSize="14"
                    lineHeight="20"
                    placeholderTextColor="grey.700"
                    bg="grey.500"
                    borderColor="grey.500"
                    borderRadius="8"
                    height={setHeight(7)}
                    onChangeText={handleChange("zipCode")}
                    onBlur={handleBlur("zipCode")}
                    value={values.zipCode}
                    keyboardType="number-pad"
                  />
                </FormControl>
              </HStack>

              <FormControl mt={3}>
                <FormControl.Label
                  isRequired
                  isInvalid
                  _text={{
                    color: "black.500",
                    fontSize: "14",
                    lineHeight: "20",
                    letterSpacing: "-0.165",
                    fontWeight: "500",
                  }}
                >
                  Country
                </FormControl.Label>
                <Select
                  variant="filled"
                  borderRadius="8"
                  bg="grey.500"
                  // selectedValue={country}
                  onValueChange={(countryID) => handleCountrySelect(countryID)}
                  borderColor="grey.500"
                  borderWidth="0.5"
                  w="100%"
                  maxW="100%"
                  h={setHeight(7)}
                  accessibilityLabel="Choose Country"
                  placeholder="Choose Service"
                  _selectedItem={{
                    bg: "red.500",
                    color: "white.500",
                    endIcon: <Feather name="check" color="red.500" size="2" />,
                  }}
                  mt="1"
                >
                  {isCountryData.map((item, index) => {
                    return (
                      <Select.Item
                        key={index}
                        label={item.name}
                        value={item.id}
                      />
                    );
                  })}
                </Select>
                <FormControl.ErrorMessage color="red.500">
                  Kindly select preferred country
                </FormControl.ErrorMessage>
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

              <FormControl mt={3} mb={2}>
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  space={4}
                >
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
                    Set as Default
                  </FormControl.Label>
                  <Switch
                    onToggle={(toggle) => setIsDefault(toggle)}
                    size="md"
                    isChecked={isDefault}
                    defaultIsChecked={isDefault ? true : false}
                    offTrackColor="grey.700"
                    onTrackColor="red.500"
                  />
                </HStack>
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

export default NewAddressForm;
