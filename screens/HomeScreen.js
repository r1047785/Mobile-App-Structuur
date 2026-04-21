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
  Pressable,
} from "react-native";
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
const BLOG_SORT_OPTIONS = [
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
  { key: "az", label: "A-Z" },
];
const PRODUCT_SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "price-low", label: "Price Low" },
  { key: "price-high", label: "Price High" },
  { key: "az", label: "A-Z" },
];

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
  const [selectedProductSort, setSelectedProductSort] = useState("featured");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("");
  const [selectedBlogSort, setSelectedBlogSort] = useState("newest");
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
            subtitle:
              fieldData.description ||
              fieldData["discription-for-item"] ||
              "",
            price: (skuFieldData.price?.value || 0) / 100,
            image: skuFieldData["main-image"]?.url
              ? { uri: skuFieldData["main-image"].url }
              : undefined,
            details:
              fieldData["discription-for-item"] ||
              fieldData.description ||
              "",
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
            featured: Boolean(fieldData.featured),
            lastPublished: item.lastPublished || item.lastUpdated || item.createdOn,
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
    const filtered = products.filter((product) => {
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPromotion = !isEnabled || product.onSale;

      return matchesCategory && matchesSearch && matchesPromotion;
    });

    return [...filtered].sort((firstProduct, secondProduct) => {
      if (selectedProductSort === "price-low") {
        return firstProduct.price - secondProduct.price;
      }

      if (selectedProductSort === "price-high") {
        return secondProduct.price - firstProduct.price;
      }

      if (selectedProductSort === "az") {
        return firstProduct.title.localeCompare(secondProduct.title);
      }

      return Number(secondProduct.onSale) - Number(firstProduct.onSale);
    });
  }, [isEnabled, products, searchQuery, selectedCategory, selectedProductSort]);

  const filteredBlogs = useMemo(() => {
    const filtered = blogs.filter((blog) => {
      const matchesCategory =
        !selectedBlogCategory || blog.category === selectedBlogCategory;
      const matchesSearch =
        !searchQuery || blog.title.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((firstBlog, secondBlog) => {
      if (selectedBlogSort === "oldest") {
        return (
          new Date(firstBlog.lastPublished).getTime() -
          new Date(secondBlog.lastPublished).getTime()
        );
      }

      if (selectedBlogSort === "az") {
        return firstBlog.title.localeCompare(secondBlog.title);
      }

      return (
        new Date(secondBlog.lastPublished).getTime() -
        new Date(firstBlog.lastPublished).getTime()
      );
    });
  }, [blogs, searchQuery, selectedBlogCategory, selectedBlogSort]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.screenContent}
      showsVerticalScrollIndicator={false}
    >
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

      <View style={styles.pagePadding}>
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
          style={styles.categoryScroll}
        >
          <Pressable
            style={[
              styles.categoryChip,
              selectedCategory === "" && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory("")}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === "" && styles.categoryChipTextActive,
              ]}
            >
              All Categories
            </Text>
          </Pressable>
          {availableCategories.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive,
                ]}
              >
                {CATEGORY_LABELS[category] || category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortRow}
          style={styles.categoryScroll}
        >
          {PRODUCT_SORT_OPTIONS.map((option) => (
            <Pressable
              key={option.key}
              style={[
                styles.sortChip,
                selectedProductSort === option.key && styles.sortChipActive,
              ]}
              onPress={() => setSelectedProductSort(option.key)}
            >
              <Text
                style={[
                  styles.sortChipText,
                  selectedProductSort === option.key &&
                    styles.sortChipTextActive,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {loadError ? <Text style={styles.notice}>{loadError}</Text> : null}

        <View style={styles.list}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.subtitle}
              price={product.price}
              image={product.image}
              details={product.details}
              category={product.category}
              onPress={() => navigation.navigate("Details", { product })}
            />
          ))}

          {filteredProducts.length === 0 ? (
            <Text style={styles.emptyState}>
              No products found for this category.
            </Text>
          ) : null}

          <Text style={styles.sectionHeading}>Latest blogs</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
            style={styles.categoryScroll}
          >
            <Pressable
              style={[
                styles.categoryChip,
                selectedBlogCategory === "" && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedBlogCategory("")}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedBlogCategory === "" && styles.categoryChipTextActive,
                ]}
              >
                All Blog Categories
              </Text>
            </Pressable>
            {availableBlogCategories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryChip,
                  selectedBlogCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedBlogCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedBlogCategory === category &&
                      styles.categoryChipTextActive,
                  ]}
                >
                  {CATEGORY_LABELS[category] || category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sortRow}
            style={styles.categoryScroll}
          >
            {BLOG_SORT_OPTIONS.map((option) => (
              <Pressable
                key={option.key}
                style={[
                  styles.sortChip,
                  selectedBlogSort === option.key && styles.sortChipActive,
                ]}
                onPress={() => setSelectedBlogSort(option.key)}
              >
                <Text
                  style={[
                    styles.sortChipText,
                    selectedBlogSort === option.key && styles.sortChipTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {blogLoadError ? (
            <Text style={styles.notice}>{blogLoadError}</Text>
          ) : null}

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
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },
  screenContent: {
    paddingBottom: 32,
  },
  hero: {
    height: 240,
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
  pagePadding: {
    paddingHorizontal: 12,
    paddingTop: 18,
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
    backgroundColor: "#f6f1e8",
    borderColor: "#6c665e",
    borderWidth: 1,
    borderRadius: 14,
    color: "#111",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  categoryScroll: {
    marginBottom: 12,
  },
  categoryRow: {
    paddingRight: 12,
    gap: 10,
  },
  sortRow: {
    paddingRight: 12,
    gap: 10,
    marginBottom: 14,
  },
  categoryChip: {
    backgroundColor: "#ede7de",
    borderWidth: 1,
    borderColor: "#c8bfb2",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryChipActive: {
    backgroundColor: "#1c1c1c",
    borderColor: "#f6f1e8",
  },
  categoryChipText: {
    color: "#171717",
    fontWeight: "700",
    fontSize: 14,
  },
  categoryChipTextActive: {
    color: "#f7f5f2",
  },
  sortChip: {
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#4b4b4b",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  sortChipActive: {
    backgroundColor: "#f6f1e8",
    borderColor: "#f6f1e8",
  },
  sortChipText: {
    color: "#f3eee6",
    fontWeight: "700",
    fontSize: 13,
  },
  sortChipTextActive: {
    color: "#111111",
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
