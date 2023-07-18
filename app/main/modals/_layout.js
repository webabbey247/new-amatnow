import { Stack } from "expo-router";
import { HeaderBackNav } from "../../../components/navigation";

const ModalLayout = () => {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="checkout"
        options={{
          headerTitle: "Checkout",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="" />,
        }}
      />

      <Stack.Screen
        name="order-summary"
        options={{
          headerTitle: "",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="close" />,
        }}
      />
      <Stack.Screen
        name="no-location-permission"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="fullscreen-map"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ModalLayout;
