import { Href } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategorySelectorProps<T> {
  categories: T[];
  activeCategory: string;
  handleCategoryPress: (category: T) => void;
}

export const CategorySelector = <T extends { id: string; label: string; route: Href }>({
  categories,
  activeCategory,
  handleCategoryPress
}: CategorySelectorProps<T>) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.categorySelector}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  categorySelector: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingBottom: 12
  },
  scrollContent: {
    flexGrow: 1,
    gap: 2,
    paddingRight: 20
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20
  },
  activeCategoryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  },
  categoryText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontWeight: "500"
  },
  activeCategoryText: {
    color: "#FFFFFF",
    fontWeight: "700"
  }
});
