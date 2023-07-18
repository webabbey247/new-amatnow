import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { CustomTheme } from "../constants/theme";
import { store } from "../redux/store";
import { LogBox } from "react-native";
// Ignore all log notifications:
// LogBox.ignoreAllLogs();

const StackLayout = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={CustomTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </NativeBaseProvider>
    </Provider>
  );
};

export default StackLayout;
