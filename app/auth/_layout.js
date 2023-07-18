import { Stack } from "expo-router";
import { HeaderBackNav } from "../../components/navigation";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forget-password"
        options={{
          headerTitle: "Forgot your password?",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" />,
        }}
      />
      <Stack.Screen
        name="reset-password"
        options={{
          headerTitle: "Reset Password",
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" />,
        }}
      />
      <Stack.Screen
        name="verify-otp"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="confirmation"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
