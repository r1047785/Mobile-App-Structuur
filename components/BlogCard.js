import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function BlogCard({
  title,
  excerpt,
  image,
  category,
  onPress,
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={image || require("../assets/icon.png")}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.tag}>{category || "Blog"}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.excerpt} numberOfLines={3}>
          {excerpt}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111111",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#262626",
    marginBottom: 18,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    backgroundColor: "#1a1a1a",
  },
  content: {
    padding: 14,
  },
  tag: {
    color: "#d6d0c4",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    color: "#f7f5f2",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  excerpt: {
    color: "#c6c1b8",
    fontSize: 14,
    lineHeight: 20,
  },
});
