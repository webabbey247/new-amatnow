import { Tabs } from "expo-router";
import { Text, Image } from "native-base";
import Feather from "@expo/vector-icons/Feather";
import icons from "../../constants/icons";

export default function TabsLayout() {
  const activeColor = "#D93622";
  const inActiveColor = "#858585";
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingVertical: 8,
          // paddingBottom: 5,
          borderTopWidth: 0,
          backgroundColor: "white",
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inActiveColor,
      }}
    >
      <Tabs.Screen
        name="market"
        options={{
          // tabBarLabel: "Home",
          headerTitle: "",
          tabBarLabel: ({ focused, color }) => (
            <Text
              py={0.5}
              fontSize="12"
              lineHeight="16"
              letterSpacing="-0.165"
              fontWeight="400"
              opacity={focused ? 1 : 0.5}
              color={color}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ size, color }) => (
            <Image
              source={icons.HOMEICON}
              resizeMode="contain"
              size={5}
              alt="Market"
              tintColor={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          // tabBarLabel: "Explore",
          headerTitle: "",
          tabBarLabel: ({ focused, color }) => (
            <Text
              py={0.5}
              fontSize="12"
              lineHeight="16"
              letterSpacing="-0.165"
              fontWeight="400"
              opacity={focused ? 1 : 0.5}
              color={color}
            >
              Explore
            </Text>
          ),
          tabBarIcon: ({ size, color }) => (
            <Image
              source={icons.EXPLOREICON}
              resizeMode="contain"
              size={5}
              alt="Explore"
              tintColor={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorite"
        options={{
          // tabBarLabel: "Saved",
          headerTitle: "",
          tabBarLabel: ({ focused, color }) => (
            <Text
              py={0.5}
              fontSize="12"
              lineHeight="16"
              letterSpacing="-0.165"
              fontWeight="400"
              opacity={focused ? 1 : 0.5}
              color={color}
            >
              Saved
            </Text>
          ),
          tabBarIcon: ({ size, color }) => (
            <Image
              source={icons.SAVEDICON}
              resizeMode="contain"
              size={5}
              alt="Saved"
              tintColor={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          // tabBarLabel: "Cart",
          headerTitle: "",
          tabBarLabel: ({ focused, color }) => (
            <Text
              py={0.5}
              fontSize="12"
              lineHeight="16"
              letterSpacing="-0.165"
              fontWeight="400"
              opacity={focused ? 1 : 0.5}
              color={color}
            >
              Cart
            </Text>
          ),
          tabBarIcon: ({ size, color }) => (
            <Image
              source={icons.CARTICON}
              resizeMode="contain"
              size={5}
              alt="Cart"
              tintColor={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          // tabBarLabel: "Profile",
          headerTitle: "",
          tabBarLabel: ({ focused, color }) => (
            <Text
              py={0.5}
              fontSize="12"
              lineHeight="16"
              letterSpacing="-0.165"
              fontWeight="400"
              opacity={focused ? 1 : 0.5}
              color={color}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ size, color }) => (
            <Image
              source={icons.USERICON}
              resizeMode="contain"
              size={5}
              alt="Cart"
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
