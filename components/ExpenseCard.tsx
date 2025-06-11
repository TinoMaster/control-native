import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "contexts/ThemeContext";
import useColors from "hooks/useColors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "styles/colors";
import ui from "styles/ui";

const ExpenseCard = () => {
  const { isDarkMode } = useThemeStore();
  const colors = useColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? "#262626" : "#F3F4F6"
        }
      ]}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[ui.card.title, { color: isDarkMode ? "#FFFFFF" : "#1F2937" }]}>Monitor your expenses</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.cube}>
            <Ionicons name="cube-outline" size={24} color="#FFFFFF" />
          </View>
          <View style={[styles.coin, { backgroundColor: colors.secondary }]}>
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
    padding: 16
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: ui.card.title.fontSize,
    fontWeight: ui.card.title.fontWeight,
    marginBottom: ui.card.title.marginBottom
  },
  button: {
    backgroundColor: colors.secondary.dark,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start"
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600"
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100
  },
  cube: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: colors.secondary.dark,
    padding: 12,
    borderRadius: 12
  },
  coin: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  coinText: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});

export default ExpenseCard;
