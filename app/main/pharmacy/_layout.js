import { Stack } from "expo-router";
import { HeaderBackNav } from "../../../components/navigation";

const PharmacyLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="pharmacy-all"
        options={{
          headerTitle: "Pharmacy",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" />,
        }}
      />
    </Stack>
  );
};

export default PharmacyLayout;
