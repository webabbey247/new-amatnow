import { Stack } from "expo-router";
import { HeaderBackNav } from "../../../components/navigation";

const RestuarantLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="restuarant-all"
        options={{
          headerTitle: "Restuarants",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" />,
        }}
      />
    </Stack>
  );
};

export default RestuarantLayout;
