import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import BlogDetail from "./screens/BlogDetails";
import ProductDetail from "./screens/ProductDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#07111f" },
          headerTintColor: "#f5fbff",
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#07111f" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Volt Market" }}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetail}
          options={{ title: "Device Details" }}
        />
        <Stack.Screen
          name="BlogDetail"
          component={BlogDetail}
          options={{ title: "Blog" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
