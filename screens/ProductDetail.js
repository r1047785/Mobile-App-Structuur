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
  const categoryLabel = product?.category
    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
    : "Product";
  const formattedPrice =
    typeof product?.price === "number"
      ? `EUR ${product.price.toFixed(2)}`
      : product?.price || "EUR 199";

  const decreaseQuantity = () =>
    setQuantity((current) => Math.max(1, current - 1));
  const increaseQuantity = () => setQuantity((current) => current + 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="light" />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Terug</Text>
      </Pressable>

      <Image
        source={product?.image || require("../assets/icon.png")}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.label}>{categoryLabel}</Text>
        <Text style={styles.title}>{product?.title || "Product"}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>

        <Text style={styles.sectionTitle}>Beschrijving</Text>
        <Text style={styles.description}>
          {product?.description || "Productbeschrijving niet beschikbaar."}
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Productdetails</Text>
          <Text style={styles.infoText}>
            {product?.details || "Extra productinformatie niet beschikbaar."}
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
            <Text style={styles.statLabel}>Categorie</Text>
            <Text style={styles.statValue}>{categoryLabel}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Aantal</Text>
            <Text style={styles.statValue}>{quantity}</Text>
          </View>
        </View>

        <Pressable style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Toevoegen aan winkelwagen</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#141414",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2c2c2c",
  },
  backText: {
    color: "#f7f5f2",
    textAlign: "center",
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 24,
    marginBottom: 18,
    resizeMode: "cover",
    backgroundColor: "#111111",
  },
  card: {
    backgroundColor: "#111111",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#262626",
  },
  label: {
    color: "#d6d0c4",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  title: {
    color: "#f7f5f2",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 8,
  },
  price: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    color: "#f7f5f2",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  description: {
    color: "#c6c1b8",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },
  infoTitle: {
    fontWeight: "800",
    fontSize: 16,
    color: "#f7f5f2",
    marginBottom: 6,
  },
  infoText: {
    color: "#c6c1b8",
    lineHeight: 21,
    fontSize: 14,
  },
  quantityBox: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },
  quantityLabel: {
    color: "#f7f5f2",
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
    backgroundColor: "#1f1f1f",
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2f2f2f",
  },
  quantityButtonText: {
    color: "#f7f5f2",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 26,
  },
  quantityValue: {
    color: "#f7f5f2",
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
    backgroundColor: "#171717",
    borderRadius: 16,
    padding: 15,
  },
  statLabel: {
    color: "#9d988f",
    fontSize: 12,
    marginBottom: 6,
  },
  statValue: {
    color: "#f7f5f2",
    fontSize: 18,
    fontWeight: "800",
  },
  buyButton: {
    backgroundColor: "#f1ece4",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#111111",
    fontWeight: "800",
    fontSize: 15,
  },
});

export default ProductDetail;
