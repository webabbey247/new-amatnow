import { Stack } from "expo-router";
import { HeaderBackNav } from "../../../components/navigation";

const EssentialsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="essentials-all"
        options={{
          headerTitle: "Essentials",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" />,
        }}
      />
    </Stack>
  );
};

export default EssentialsLayout;
