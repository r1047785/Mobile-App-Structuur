import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const getReadableBody = (body = "") => {
  return body
    .replace(/<p>\s*<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const BlogDetail = ({ route }) => {
  const { blog } = route.params || {};
  const categoryLabel = blog?.category
    ? blog.category.charAt(0).toUpperCase() + blog.category.slice(1)
    : "Blog";
  const bodyParagraphs = getReadableBody(blog?.body)
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="light" />

      <View style={styles.hero}>
        <Text style={styles.tag}>{categoryLabel}</Text>
        <Text style={styles.title}>{blog?.title || "Blog artikel"}</Text>
        <Text style={styles.excerpt}>
          {blog?.excerpt || "Samenvatting niet beschikbaar."}
        </Text>
      </View>

      <Image
        source={blog?.image || require("../assets/icon.png")}
        style={styles.image}
      />

      <View style={styles.article}>
        <Text style={styles.heading}>Blog tekst</Text>
        {bodyParagraphs.length > 0 ? (
          bodyParagraphs.map((paragraph, index) => (
            <Text key={`${blog?.id || "blog"}-${index}`} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))
        ) : (
          <Text style={styles.paragraph}>
            {blog?.excerpt || "Geen extra blogtekst beschikbaar."}
          </Text>
        )}
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
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: "#111111",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#262626",
    marginBottom: 18,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 24,
    marginBottom: 18,
    resizeMode: "cover",
    backgroundColor: "#111111",
  },
  tag: {
    color: "#d6d0c4",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  title: {
    color: "#f7f5f2",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 10,
  },
  excerpt: {
    color: "#c6c1b8",
    fontSize: 15,
    lineHeight: 22,
  },
  article: {
    backgroundColor: "#111111",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#262626",
  },
  heading: {
    color: "#f7f5f2",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  paragraph: {
    color: "#c6c1b8",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
});

export default BlogDetail;
