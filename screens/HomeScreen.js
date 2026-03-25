import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TextInput,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";

const CATEGORY_ID_MAP = {
  "69b08ea68256760231b6697c": "jackets",
  "69b08bd147e3f7afe5f40953": "shoes",
  "69b0772f82bad9c4b0615bf2": "snowgear",
  "69b08ea68256760231b6697f": "ski",
  "69aec47adc4d63ec15714677": "snowboard",
  fb1826afcfbfdf2e34b93317390aac07: "jackets",
};
const CATEGORY_PREFIX_MAP = {
  "993e": "shoes",
  "2940": "snowgear",
  b22: "ski",
  "6223": "snowboard",
};

const CATEGORY_LABELS = {
  snowboard: "Snowboarding",
  ski: "Ski",
  snowgear: "SnowGear",
  jackets: "Jackets",
  shoes: "Shoes",
};
const BLOG_CATEGORY_PREFIX_MAP = {
  "50c6": "ski",
};

const normalizeCategory = (value) => {
  if (!value) {
    return "";
  }

  const normalizedValue = String(value).trim().toLowerCase();

  if (CATEGORY_ID_MAP[normalizedValue]) {
    return CATEGORY_ID_MAP[normalizedValue];
  }

  const prefixMatch = Object.entries(CATEGORY_PREFIX_MAP).find(([prefix]) =>
    normalizedValue.startsWith(prefix)
  );

  if (prefixMatch) {
    return prefixMatch[1];
  }

  if (normalizedValue === "skii") {
    return "ski";
  }

  if (normalizedValue === "snow gear") {
    return "snowgear";
  }

  return normalizedValue.replace(/\s+/g, "");
};

const getBlogCategory = (fieldData = {}) => {
  const value = fieldData.catogory || fieldData.category || "";
  const normalizedValue = String(value).trim().toLowerCase();

  if (!normalizedValue) {
    return "";
  }

  const prefixMatch = Object.entries(BLOG_CATEGORY_PREFIX_MAP).find(([prefix]) =>
    normalizedValue.startsWith(prefix)
  );

  if (prefixMatch) {
    return prefixMatch[1];
  }

  if (/^[a-f0-9]{12,}$/.test(normalizedValue)) {
    return "snowboard";
  }

  return normalizeCategory(normalizedValue);
};

const getCategoryFromFieldData = (fieldData = {}) => {
  const possibleFields = [
    fieldData["catogory-filter-system-2"],
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
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("");
  const [loadError, setLoadError] = useState("");
  const [blogLoadError, setBlogLoadError] = useState("");

  const toggleSwitch = () => setIsEnabled((current) => !current);

  useEffect(() => {
    fetch("https://api.webflow.com/v2/sites/698c7fb74e0026bc0710b917/products", {
      headers: {
        Authorization:
          "Bearer 15f5cc4a3d900c636f9056e192ae2d4d1faac7747ed954c777cd936c08fa9060",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Webflow request failed: ${response.status}`);
        }

        return response.json();
      })
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

        if (mappedProducts.length > 0) {
          setProducts(mappedProducts);
          setLoadError("");
        } else {
          setLoadError("Webflow returned no products.");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoadError(
          "Webflow products could not be loaded. Check your site ID and API token."
        );
      });
  }, []);

  useEffect(() => {
    fetch("https://api.webflow.com/v2/collections/699ef9252337becba2eef158/items/live", {
      headers: {
        Authorization:
          "Bearer 15f5cc4a3d900c636f9056e192ae2d4d1faac7747ed954c777cd936c08fa9060",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Webflow blog request failed: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        const mappedBlogs = (data.items || []).map((item) => {
          const fieldData = item.fieldData || {};

          return {
            id: item.id,
            title: fieldData.name || "Untitled blog",
            excerpt: fieldData["post-summary"] || "",
            image: fieldData["thumbnail-image"]?.url
              ? { uri: fieldData["thumbnail-image"].url }
              : fieldData["main-image"]?.url
                ? { uri: fieldData["main-image"].url }
                : undefined,
            category: getBlogCategory(fieldData),
            body: fieldData["post-body"] || "",
          };
        });

        setBlogs(mappedBlogs);
        setBlogLoadError("");
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setBlogLoadError("Webflow blogs could not be loaded.");
      });
  }, []);

  const availableCategories = useMemo(() => {
    return [...new Set(products.map((product) => product.category).filter(Boolean))];
  }, [products]);

  const availableBlogCategories = useMemo(() => {
    return [...new Set(blogs.map((blog) => blog.category).filter(Boolean))];
  }, [blogs]);

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

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        !selectedBlogCategory || blog.category === selectedBlogCategory;
      const matchesSearch =
        !searchQuery || blog.title.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [blogs, searchQuery, selectedBlogCategory]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Homescreen.jpg")}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.kicker}>Snowboardshop Yente</Text>
          <Text style={styles.heading}>Ride the season</Text>
          <Text style={styles.heroText}>
            Products and blogs in one clean winter storefront.
          </Text>
        </View>
      </ImageBackground>

      <TextInput
        placeholder="Search a product..."
        placeholderTextColor="#8b8b8b"
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Only show promotions</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#4b4b4b", true: "#d6d0c4" }}
          thumbColor={isEnabled ? "#ffffff" : "#d9d9d9"}
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

      {loadError ? <Text style={styles.notice}>{loadError}</Text> : null}

      <ScrollView style={styles.container} contentContainerStyle={styles.list}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.subtitle}
            price={product.price}
            image={product.image}
            category={product.category}
            onPress={() => navigation.navigate("Details", product)}
          />
        ))}

        {filteredProducts.length === 0 ? (
          <Text style={styles.emptyState}>
            No products found for this category.
          </Text>
        ) : null}

        <Text style={styles.sectionHeading}>Latest blogs</Text>

        <View style={styles.pickerWrapWide}>
          <Picker
            selectedValue={selectedBlogCategory}
            onValueChange={setSelectedBlogCategory}
            dropdownIconColor="#fff"
            style={styles.picker}
          >
            <Picker.Item label="All Blog Categories" value="" />
            {availableBlogCategories.map((category) => (
              <Picker.Item
                key={category}
                label={CATEGORY_LABELS[category] || category}
                value={category}
              />
            ))}
          </Picker>
        </View>

        {blogLoadError ? <Text style={styles.notice}>{blogLoadError}</Text> : null}

        <View style={styles.blogList}>
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              image={blog.image}
              category={CATEGORY_LABELS[blog.category] || blog.category}
              onPress={() => navigation.navigate("BlogDetail", { blog })}
            />
          ))}
        </View>

        {filteredBlogs.length === 0 ? (
          <Text style={styles.emptyState}>
            No blogs found for this category.
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
    backgroundColor: "#050505",
  },
  hero: {
    height: 240,
    marginBottom: 18,
    justifyContent: "flex-end",
  },
  heroImage: {
    borderRadius: 0,
  },
  heroOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.42)",
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  kicker: {
    color: "#d6d0c4",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  heading: {
    color: "#f7f5f2",
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 8,
  },
  heroText: {
    color: "#d9d4cb",
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 260,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    justifyContent: "space-between",
  },
  filterLabel: {
    color: "#f2f0eb",
    marginLeft: 8,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 28,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  switch: {
    marginVertical: 12,
  },
  input: {
    marginVertical: 12,
    backgroundColor: "#f1ece4",
    borderColor: "#2c2c2c",
    borderWidth: 1,
    borderRadius: 14,
    color: "#111",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#2c2c2c",
    borderRadius: 14,
    backgroundColor: "#121212",
    marginBottom: 12,
    overflow: "hidden",
  },
  pickerWrapWide: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2c2c2c",
    borderRadius: 14,
    backgroundColor: "#121212",
    marginBottom: 12,
    marginTop: 8,
    overflow: "hidden",
  },
  picker: {
    color: "#f7f5f2",
  },
  sectionHeading: {
    color: "#f7f5f2",
    fontSize: 26,
    fontWeight: "700",
    width: "100%",
    marginTop: 26,
    marginBottom: 12,
  },
  blogList: {
    width: "100%",
  },
  emptyState: {
    color: "#d3cec4",
    textAlign: "center",
    width: "100%",
    marginTop: 24,
  },
  notice: {
    color: "#d6d0c4",
    marginBottom: 12,
    paddingHorizontal: 8,
    textAlign: "center",
  },
});

export default HomeScreen;
