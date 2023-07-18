import { Stack } from "expo-router";
import { HeaderBackNav } from "../../../components/navigation";

const GroceriesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="groceries-all"
        options={{
          headerTitle: "Groceries",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" />,
        }}
      />
    </Stack>
  );
};

export default GroceriesLayout;
