import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TextInput,
} from "react-native";
import ProductCard from "../components/ProductCard";

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [products, setProducts] = useState([]);
  const toggleSwitch = () => setIsEnabled(!isEnabled);

  useEffect(() => {
    fetch("https://api.webflow.com/v2/sites/:site_id/products", {
      headers: {
        Authorization:
          "Bearer 15f5cc4a3d900c636f9056e192ae2d4d1faac7747ed954c777cd936c08fa9060",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setProducts(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            subtitle: item.product.fieldData.description,
            price: (item.skus[0]?.fieldData?.price?.value || 0) / 100,
            image: {
              uri: item.skus[0]?.fieldData?.["main-image"]?.url,
            },
          })),
        ),
      )
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our offer</Text>
      <TextInput placeholder="Search a product..." style={styles.input} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 12,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#fff", marginLeft: 8 }}>
          Only show promotions
        </Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#81b0ff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.list}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.subtitle}
            price={product.price}
            image={product.image}
            onPress={() => navigation.navigate("Details", product)}
          />
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 64,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  switch: {
    marginVertical: 12,
  },
  input: {
    marginVertical: 12,
    backgroundColor: "#fff",
    borderColor: "#555",
    borderWidth: 1,
    color: "#737373",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
