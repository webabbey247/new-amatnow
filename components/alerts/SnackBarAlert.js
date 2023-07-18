import Snackbar from "react-native-snackbar";
export const SnackbarAlert = {
  error: (data) => {
    return Snackbar.show({
      text: data,
      duration: 2000,
      backgroundColor: "#D93622",
      textColor: "#ffffff",
      action: {
        text: "Hide",
        textColor: "#ffffff",
        onPress: () => {
          Snackbar.dismiss();
        },
      },
    });
  },
  success: (data) => {
    return Snackbar.show({
      text: data,
      duration: 2000,
      backgroundColor: "#68AC21",
      textColor: "#ffffff",
      action: {
        text: "Hide",
        textColor: "#ffffff",
        onPress: () => {
          Snackbar.dismiss();
        },
      },
    });
  },
};
