StinkieWinki
stinkiewinki
Online

StinkieWinki — 3/10/2026 11:58 PM
https://www.youtube.com/watch?v=vUyKKQ_Gx4o&list=RDvUyKKQ_Gx4o&start_radio=1
YouTube
Lady Venus
"We Are Charlie Kirk" Opera Cover. (No AI, 1 take, cold + 3:00 A.M....
Image
StinkieWinki — 3/16/2026 1:57 PM
@jw
is jef dom of doet jef dom?
jw — 3/16/2026 1:58 PM
hhhhhhh
StinkieWinki — 3/16/2026 9:14 PM
Image
@jw
jw — 3/16/2026 9:14 PM

Say Wallahi bro
Say wallahi
Put that on Allah
StinkieWinki — 3/16/2026 9:16 PM
ja
StinkieWinki — 3/17/2026 10:52 AM
Wij maken een eenvoudige first-person “repair station” game waarin de speler rondloopt in een kleine ruimte en kapotte machines moet herstellen. Door objecten op te pakken en op de juiste plek te gebruiken (het centrale mechanisme), verdient de speler punten en probeert hij de timer niet te laten aflopen. Machines geven visuele en audio feedback wanneer ze stuk gaan of gerepareerd worden. Als extra mechanisme voegen we een systeem toe waarbij storingen willekeurig ontstaan en sneller optreden naarmate het spel vordert. De UI toont de timer, score en machinestatus en bevat een start- en game-over scherm met scène-overgangen.
jw — 3/17/2026 9:17 PM
hey

send booty pic
jw — 3/17/2026 9:24 PM
Image
jw — 3/17/2026 9:36 PM
Attachment file type: unknown
Wang_Junhao_3Ddesign02_XD2_A5.blend
965.93 KB
jw — Yesterday at 4:32 PM
Test
Image
StinkieWinki — Yesterday at 5:36 PM
moet ik iets testen?
jw — Yesterday at 5:50 PM
Nee nee da was voor mij
StinkieWinki — Yesterday at 5:50 PM
alr
jw — Yesterday at 5:51 PM
We moeten wel ‘s avonds bellen voor die pitchen en die logo te fixen
StinkieWinki — Yesterday at 5:51 PM
i goe
is goed
jw — Yesterday at 5:51 PM
Gij komt toch morgen wel hè
StinkieWinki — Yesterday at 5:52 PM
ja normaal wel
jw — Yesterday at 5:52 PM
Ait
StinkieWinki — Yesterday at 7:12 PM
hoelaat bellen we
jw — Yesterday at 7:51 PM
idk nu
jw — 3:10 PM
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({ title, description, price, image, details }) {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.visualWrap}>
        <Text style={styles.visualTag}>GADGET</Text>
        <Image
          source={image || require("../assets/ring.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.overline}>Featured tech</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>

        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("Details", {
              product: { title, description, price, image, details },
            })
          }
        >
          <Text style={styles.buttonText}>Open details</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0c1b30",
    borderRadius: 22,
    width: "48%",
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#173250",
  },
  visualWrap: {
    backgroundColor: "#081423",
    padding: 12,
  },
  visualTag: {
    color: "#57d1ff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
    borderRadius: 16,
    backgroundColor: "#102139",
  },
  content: {
    padding: 14,
  },
  overline: {
    color: "#7b94b5",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontWeight: "800",
    fontSize: 17,
    color: "#f5fbff",
    marginBottom: 6,
  },
  description: {
    color: "#90a4bf",
    fontSize: 13,
    lineHeight: 18,
    minHeight: 54,
    marginBottom: 10,
  },
  price: {
    color: "#57d1ff",
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#57d1ff",
    paddingVertical: 11,
    borderRadius: 12,
  },
... (7 lines left)

message.txt
3 KB
import React from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const BlogDetail = ({ route }) => {
  const { blog } = route.params || {};

message.txt
3 KB
import React, { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,

message.txt
9 KB
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,

message.txt
6 KB
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import BlogDetail from "./screens/BlogDetail";
import ProductDetail from "./screens/ProductDetail";

const Stack = createNativeStackNavigator();

const products = [
  {
    id: 1,
    title: "Nova X1 Earbuds",
    description: "Noise-cancelling earbuds met spatial audio en ultra-low latency.",
    price: "EUR 179",
    details:
      "De Nova X1 combineert adaptive noise cancelling, transparantiemodus en een batterijduur tot 32 uur met case. Ideaal voor onderweg, calls en mobiel gamen.",
    image: require("./assets/ring.png"),
  },
  {
    id: 2,
    title: "Pulse Watch GT",
    description: "Slimme smartwatch met AMOLED-display, GPS en health tracking.",
    price: "EUR 249",
    details:
      "De Pulse Watch GT geeft meldingen, hartslag, slaapinzichten en workout-modes in een strak horloge dat vlot synchroniseert met je smartphone.",
    image: require("./assets/ring.png"),
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
          initialParams={{ products }}
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
﻿
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => setQuantity((current) => Math.max(1, current - 1));
  const increaseQuantity = () => setQuantity((current) => current + 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="light" />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Terug</Text>
      </Pressable>

      <Image
        source={product?.image || require("../assets/ring.png")}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.label}>Device overview</Text>
        <Text style={styles.title}>{product?.title || "Tech gadget"}</Text>
        <Text style={styles.price}>{product?.price || "EUR 199"}</Text>

        <Text style={styles.sectionTitle}>Beschrijving</Text>
        <Text style={styles.description}>
          {product?.description || "Compacte gadget met slimme features."}
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Specs & highlights</Text>
          <Text style={styles.infoText}>
            {product?.details ||
              "Ontworpen voor dagelijkse tech-liefhebbers die stijl en prestaties willen combineren."}
          </Text>
        </View>

        <View style={styles.quantityBox}>
          <Text style={styles.quantityLabel}>Aantal</Text>

          <View style={styles.quantityControls}>
            <Pressable style={styles.quantityButton} onPress={decreaseQuantity}>
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>

            <Text style={styles.quantityValue}>{quantity}</Text>

            <Pressable style={styles.quantityButton} onPress={increaseQuantity}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Battery</Text>
            <Text style={styles.statValue}>All day</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Sync</Text>
            <Text style={styles.statValue}>Instant</Text>
          </View>
        </View>

        <Pressable style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Add to cart</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07111f",
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#102139",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1a3658",
  },
  backText: {
    color: "#d9ecff",
    textAlign: "center",
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 24,
    marginBottom: 18,
    resizeMode: "contain",
    backgroundColor: "#0c1b30",
  },
  card: {
    backgroundColor: "#0c1b30",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#173250",
  },
  label: {
    color: "#57d1ff",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  title: {
    color: "#f5fbff",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 8,
  },
  price: {
    color: "#57d1ff",
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    color: "#f5fbff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  description: {
    color: "#90a4bf",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: "#081423",
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },
  infoTitle: {
    fontWeight: "800",
    fontSize: 16,
    color: "#f5fbff",
    marginBottom: 6,
  },
  infoText: {
    color: "#90a4bf",
    lineHeight: 21,
    fontSize: 14,
  },
  quantityBox: {
    backgroundColor: "#081423",
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },
  quantityLabel: {
    color: "#f5fbff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityButton: {
    backgroundColor: "#102139",
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1a3658",
  },
  quantityButtonText: {
    color: "#f5fbff",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 26,
  },
  quantityValue: {
    color: "#f5fbff",
    fontSize: 22,
    fontWeight: "900",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#081423",
    borderRadius: 16,
    padding: 15,
  },
  statLabel: {
    color: "#6f88aa",
    fontSize: 12,
    marginBottom: 6,
  },
  statValue: {
    color: "#f5fbff",
    fontSize: 18,
    fontWeight: "800",
  },
  buyButton: {
    backgroundColor: "#57d1ff",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#07111f",
    fontWeight: "800",
    fontSize: 15,
  },
});

export default ProductDetail;