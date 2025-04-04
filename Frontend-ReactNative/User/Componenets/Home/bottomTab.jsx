import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons"; // Import Icons
import ProfileScreen from "../Profile/UserProfile";
import SubscriptionScreen from "../SubScription/Subscription";
import HomeScreen1 from "./Home";
import OrdersScreen from "../Orders/order";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const route = useRoute();
  const { token } = route.params || {}; // Get token from navigation params

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home"; // Home Icon
          } else if (route.name === "orders") {
            iconName = "cart-outline"; // Orders Icon
          } else if (route.name === "subscription") {
            iconName = "card-outline"; // Subscription Icon
          } else if (route.name === "profile") {
            iconName = "person-circle-outline"; // Profile Icon
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50", // Fresh Green (Active)
        tabBarInactiveTintColor: "#666", // Gray (Inactive)
        tabBarStyle: { backgroundColor: "#FFFFFF", paddingBottom: 15 }, // White Background
      })}
    >
      <Tab.Screen name="home" component={HomeScreen1} initialParams={{ token }} />
      <Tab.Screen name="orders" component={OrdersScreen} initialParams={{ token }} />
      <Tab.Screen name="subscription" component={SubscriptionScreen} initialParams={{ token }} />
      <Tab.Screen name="profile" component={ProfileScreen} initialParams={{ token }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;