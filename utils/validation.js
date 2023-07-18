import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Kindly provide your registered email address or mobile number!"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be atleast ${min} characters`)
    .required("kindly provide your password"),
});

export const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required("Kindly provide your first name!"),
  lastName: yup.string().required("Kindly provide your last name!"),
  emailAddress: yup
    .string()
    .email("Kindly provide a valid email address")
    .required("Kindly provide your valid email address"),
  mobileNumber: yup
    .string()
    .required("Kindly provide your valid mobile number"),
  password: yup.string().required("kindly provide your password"),
});

export const forgetPassValidationSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .required("Kindly provide your registered mobile number!"),
});

export const resetPassValidationSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .required("Kindly provide your registered mobile number!"),
  token: yup.string().required("Kindly provide a valid token!"),
  password: yup.string().required("Kindly provide your preferred password"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match!")
    .required("Kindly confirm your preferred password"),
});

export const riderTipValidationSchema = yup.object().shape({
  amount: yup.string().required("Kindly provide an amount!"),
});

export const newAddressValidationSchema = yup.object().shape({
  deliveryState: yup.string().required("Kindly provide your preferred state!"),
  label: yup.string().required("Kindly provide your preferred address alias!"),
});

export const addressValidationSchema = yup.object().shape({
  country: yup.string().required("Kindly select your preferred country!"),
});
