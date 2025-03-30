import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface StatsCardProps {
  title: string;
  percentage: string;
  trend: "up" | "down";
  style?: object;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  percentage,
  trend,
  style,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? "#262626" : "#F3F4F6",
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isDarkMode ? "#9CA3AF" : "#6B7280" },
        ]}
      >
        {title}
      </Text>
      <View style={styles.content}>
        <Text
          style={[
            styles.percentage,
            { color: isDarkMode ? "#FFFFFF" : "#1F2937" },
          ]}
        >
          {percentage}
        </Text>
        <View
          style={[
            styles.trendContainer,
            {
              backgroundColor: trend === "up" ? "#10B981" : "#EF4444",
            },
          ]}
        >
          <Ionicons
            name={trend === "up" ? "trending-up" : "trending-down"}
            size={16}
            color="#FFFFFF"
          />
        </View>
      </View>
      <View style={styles.dots}>
        <View
          style={[
            styles.dot,
            { backgroundColor: isDarkMode ? "#374151" : "#E5E7EB" },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: isDarkMode ? "#374151" : "#E5E7EB" },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: isDarkMode ? "#374151" : "#E5E7EB" },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  percentage: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
  },
  trendContainer: {
    padding: 4,
    borderRadius: 8,
  },
  dots: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default StatsCard; 