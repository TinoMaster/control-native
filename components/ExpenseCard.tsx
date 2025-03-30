import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const ExpenseCard = () => {
  const { isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? "#262626" : "#F3F4F6",
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? "#FFFFFF" : "#1F2937" },
            ]}
          >
            Monitor your expenses
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.cube}>
            <Ionicons
              name="cube-outline"
              size={24}
              color={isDarkMode ? "#FFFFFF" : "#1F2937"}
            />
          </View>
          <View style={[styles.coin, { backgroundColor: "#FFB800" }]}>
            <Text style={styles.coinText}>$</Text>
          </View>
          <View style={[styles.coin, { backgroundColor: "#3B82F6" }]}>
            <Text style={styles.coinText}>$</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
  },
  cube: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#3B82F6",
    padding: 12,
    borderRadius: 12,
  },
  coin: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  coinText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ExpenseCard; 