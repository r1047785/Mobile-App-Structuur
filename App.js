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
          headerStyle: { backgroundColor: "#050505" },
          headerTintColor: "#f7f5f2",
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: "#050505" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Snow Society" }}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetail}
          options={{ title: "Product Details" }}
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
