import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import BlogDetail from "./screens/BlogDetails";
import ProductDetail from "./screens/ProductDetail";

const Stack = createNativeStackNavigator();
const fallbackProducts = [
  {
    id: "fallback-snowboard",
    title: "Atlas Snowboard Pro",
    subtitle: "All-mountain snowboard voor snelheid en controle.",
    price: 499,
    category: "snowboard",
    image: require("./assets/Section2.jpg"),
    onSale: true,
  },
  {
    id: "fallback-ski",
    title: "Vortex Ski Carbon",
    subtitle: "Lichte ski's met sterke grip op harde sneeuw.",
    price: 649,
    category: "ski",
    image: require("./assets/skii.jpg"),
    onSale: false,
  },
  {
    id: "fallback-snowgear",
    title: "Peak SnowGear Set",
    subtitle: "Essentiele uitrusting voor een complete snow trip.",
    price: 159,
    category: "snowgear",
    image: require("./assets/Homescreen.jpg"),
    onSale: true,
  },
  {
    id: "fallback-jacket",
    title: "North Shield Jacket",
    subtitle: "Waterdichte jas voor koude en natte dagen.",
    price: 219,
    category: "jackets",
    image: require("./assets/084a63f1e6a3344c8ea7c9b50b2cf4bd.jpg"),
    onSale: true,
  },
  {
    id: "fallback-shoes",
    title: "Ridge Snow Shoes",
    subtitle: "Stevige winterschoenen met extra grip en comfort.",
    price: 189,
    category: "shoes",
    image: require("./assets/542f2d7428764e348e8c68968814f9dc.jpg"),
    onSale: false,
  },
];

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
          initialParams={{ fallbackProducts }}
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
