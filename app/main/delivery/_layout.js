import { Stack } from "expo-router";
import { HeaderBackNav } from "../../../components/navigation";

const DeliveryLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="deliver-package"
        options={{
          headerTitle: "",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" />,
        }}
      />

      <Stack.Screen
        name="delivery-confirmation"
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" />,
        }}
      />
    </Stack>
  );
};

export default DeliveryLayout;
