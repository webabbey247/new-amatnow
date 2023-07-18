import { Stack } from "expo-router";
import { HeaderBackNav } from "../navigation";

const DynamicHeader = ({ title, icon }) => {
  return (
    <Stack.Screen
      options={{
        headerTitle: title,
        headerTitleStyle: {
          color: "#1B1B1B",
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: -0.165,
          fontWeight: "500",
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerLeft: () => <HeaderBackNav dimension="30%" iconType={icon} />,
      }}
    />
  );
};

export default DynamicHeader;
