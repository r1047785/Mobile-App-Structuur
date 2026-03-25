import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ProductCard from "../components/ProductCard";

const CATEGORY_ID_MAP = {
  "69b08ea68256760231b6697c": "jackets",
  "69b08bd147e3f7afe5f40953": "shoes",
  "69b0772f82bad9c4b0615bf2": "snowgear",
  "69b08ea68256760231b6697f": "ski",
  "69aec47adc4d63ec15714677": "snowboard",
};

const CATEGORY_LABELS = {
  snowboard: "Snowboard",
  ski: "Ski",
  snowgear: "SnowGear",
  jackets: "Jackets",
  shoes: "Shoes",
};

const normalizeCategory = (value) => {
  if (!value) {
    return "";
  }

  const normalizedValue = String(value).trim().toLowerCase();

  if (CATEGORY_ID_MAP[normalizedValue]) {
    return CATEGORY_ID_MAP[normalizedValue];
  }

  if (normalizedValue === "skii") {
    return "ski";
  }

  if (normalizedValue === "snow gear") {
    return "snowgear";
  }

  return normalizedValue.replace(/\s+/g, "");
};

const getCategoryFromFieldData = (fieldData = {}) => {
  const possibleFields = [
    fieldData["catogory-filter-system"],
    fieldData["category-filter-system"],
    fieldData.category,
    fieldData.categories,
  ];

  for (const field of possibleFields) {
    if (Array.isArray(field) && field.length > 0) {
      const category = normalizeCategory(field[0]);
      if (category) {
        return category;
      }
    }

    if (typeof field === "string" && field.trim()) {
      const category = normalizeCategory(field);
      if (category) {
        return category;
      }
    }
  }

  return "";
};

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleSwitch = () => setIsEnabled((current) => !current);

  useEffect(() => {
    fetch("https://api.webflow.com/v2/sites/:site_id/products", {
      headers: {
        Authorization:
          "Bearer 15f5cc4a3d900c636f9056e192ae2d4d1faac7747ed954c777cd936c08fa9060",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const mappedProducts = (data.items || []).map((item) => {
          const fieldData = item.product?.fieldData || {};
          const skuFieldData = item.skus?.[0]?.fieldData || {};

          return {
            id: item.product?.id,
            title: fieldData.name || "Unnamed product",
            subtitle: fieldData.description || "",
            price: (skuFieldData.price?.value || 0) / 100,
            image: skuFieldData["main-image"]?.url
              ? { uri: skuFieldData["main-image"].url }
              : undefined,
            category: getCategoryFromFieldData(fieldData),
            onSale: Boolean(
              fieldData.sale ||
                fieldData.promotion ||
                fieldData.promoted ||
                skuFieldData.sale
            ),
          };
        });

        setProducts(mappedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const availableCategories = useMemo(() => {
    return [...new Set(products.map((product) => product.category).filter(Boolean))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPromotion = !isEnabled || product.onSale;

      return matchesCategory && matchesSearch && matchesPromotion;
    });
  }, [isEnabled, products, searchQuery, selectedCategory]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our offer</Text>

      <TextInput
        placeholder="Search a product..."
        placeholderTextColor="#737373"
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Only show promotions</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#81b0ff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
          dropdownIconColor="#fff"
          style={styles.picker}
        >
          <Picker.Item label="All Categories" value="" />
          {availableCategories.map((category) => (
            <Picker.Item
              key={category}
              label={CATEGORY_LABELS[category] || category}
              value={category}
            />
          ))}
        </Picker>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.list}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.subtitle}
            price={product.price}
            image={product.image}
            onPress={() => navigation.navigate("Details", product)}
          />
        ))}

        {filteredProducts.length === 0 ? (
          <Text style={styles.emptyState}>
            No products found for this category.
          </Text>
        ) : null}
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
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    justifyContent: "space-between",
  },
  filterLabel: {
    color: "#fff",
    marginLeft: 8,
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
    color: "#111",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#111",
    marginBottom: 12,
  },
  picker: {
    color: "#fff",
  },
  emptyState: {
    color: "#fff",
    textAlign: "center",
    width: "100%",
    marginTop: 24,
  },
});

export default HomeScreen;
