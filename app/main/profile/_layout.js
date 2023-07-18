import { Stack } from "expo-router";
import { Platform } from "react-native";
import { HeaderBackNav } from "../../../components/navigation";

const ProfileLayout = () => {
  return (
    <Stack
    // screenOptions={{
    //   presentation: "modal",
    // }}
    >
            <Stack.Screen
        name="order-summary"
        options={{
          headerTitle: "",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#1B1B1B",
            fontSize: Platform.OS == "ios" ? 20 : 16,
            lineHeight: Platform.OS == "ios" ? 28 : 24,
            letterSpacing: -0.165,
            fontWeight: "500",
          },
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="" />,
        }}
      />

      <Stack.Screen
        name="invite-friends"
        options={{
          headerTitle: "Invite Friends",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#1B1B1B",
            fontSize: Platform.OS == "ios" ? 20 : 16,
            lineHeight: Platform.OS == "ios" ? 28 : 24,
            letterSpacing: -0.165,
            fontWeight: "500",
          },
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="close" />,
        }}
      />
      <Stack.Screen
        name="become-a-rider"
        options={{
          headerTitle: "Become A Rider",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#1B1B1B",
            fontSize: Platform.OS == "ios" ? 20 : 16,
            lineHeight: Platform.OS == "ios" ? 28 : 24,
            letterSpacing: -0.165,
            fontWeight: "500",
          },
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="close" />,
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="user-address-list"
        options={{
          headerTitle: "Address",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#1B1B1B",
            fontSize: Platform.OS == "ios" ? 20 : 16,
            lineHeight: Platform.OS == "ios" ? 28 : 24,
            letterSpacing: -0.165,
            fontWeight: "500",
          },
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="" />,
        }}
      />

      <Stack.Screen
        name="add-user-address"
        options={{
          headerTitle: "Add New Address",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "#1B1B1B",
            fontSize: Platform.OS == "ios" ? 20 : 16,
            lineHeight: Platform.OS == "ios" ? 28 : 24,
            letterSpacing: -0.165,
            fontWeight: "500",
          },
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="" />,
        }}
      />

      <Stack.Screen
        name="update-user-address"
        options={{
          headerTitle: "Update Address",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "#1B1B1B",
            fontSize: Platform.OS == "ios" ? 20 : 16,
            lineHeight: Platform.OS == "ios" ? 28 : 24,
            letterSpacing: -0.165,
            fontWeight: "700",
          },
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="" />,
        }}
      />

      <Stack.Screen
        name="order-reorder"
        options={{
          headerTitle: "Orders and Reorder",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "#1B1B1B",
            fontSize: Platform.OS == "ios" ? 20 : 16,
            lineHeight: Platform.OS == "ios" ? 28 : 24,
            letterSpacing: -0.165,
            fontWeight: "700",
          },
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="" />,
        }}
      />

      <Stack.Screen
        name="delivery-request-history"
        options={{
          headerTitle: "History",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "#1B1B1B",
            fontSize: Platform.OS == "ios" ? 20 : 16,
            lineHeight: Platform.OS == "ios" ? 28 : 24,
            letterSpacing: -0.165,
            fontWeight: "700",
          },
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="" />,
        }}
      />

      <Stack.Screen
        name="wallet"
        options={{
          headerTitle: "Wallet",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "#1B1B1B",
            fontSize: Platform.OS == "ios" ? 20 : 16,
            lineHeight: Platform.OS == "ios" ? 28 : 24,
            letterSpacing: -0.165,
            fontWeight: "700",
          },
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="" />,
        }}
      />

      <Stack.Screen
        name="promotions"
        options={{
          headerTitle: "Promotions",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "#1B1B1B",
            fontSize: Platform.OS == "ios" ? 20 : 16,
            lineHeight: Platform.OS == "ios" ? 28 : 24,
            letterSpacing: -0.165,
            fontWeight: "700",
          },
          headerLeft: () => <HeaderBackNav dimension="30%" iconType="" />,
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
