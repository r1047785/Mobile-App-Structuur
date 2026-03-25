import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({
  title,
  description,
  price,
  image,
  details,
  onPress,
  category,
}) {
  const navigation = useNavigation();
  const formattedPrice =
    typeof price === "number" ? `EUR ${price.toFixed(2)}` : price;
  const categoryLabel = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Product";

  return (
    <View style={styles.card}>
      <View style={styles.visualWrap}>
        <Text style={styles.visualTag}>{categoryLabel}</Text>
        <Image
          source={image || require("../assets/icon.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.overline}>Snowboard Shop</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>

        <Pressable
          style={styles.button}
          onPress={
            onPress ||
            (() =>
              navigation.navigate("Details", {
                product: {
                  title,
                  description,
                  price: formattedPrice,
                  image,
                  details,
                  category,
                },
              }))
          }
        >
          <Text style={styles.buttonText}>Bekijk product</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111111",
    borderRadius: 24,
    width: "48%",
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#262626",
  },
  visualWrap: {
    backgroundColor: "#0b0b0b",
    padding: 10,
  },
  visualTag: {
    color: "#d6d0c4",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 18,
    backgroundColor: "#1a1a1a",
  },
  content: {
    padding: 14,
  },
  overline: {
    color: "#9d988f",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontWeight: "800",
    fontSize: 17,
    color: "#f7f5f2",
    marginBottom: 6,
  },
  description: {
    color: "#c6c1b8",
    fontSize: 13,
    lineHeight: 18,
    minHeight: 54,
    marginBottom: 10,
  },
  price: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#f1ece4",
    paddingVertical: 11,
    borderRadius: 14,
  },
  buttonText: {
    color: "#111111",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 13,
  },
});
