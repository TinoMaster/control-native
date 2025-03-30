import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

export default function StatsScreen() {
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? "#1A1A1A" : "#FFFFFF",
      }}
    >
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: isDarkMode ? "#FFFFFF" : "#1F2937",
          }}
        >
          Statistics
        </Text>
      </View>
    </SafeAreaView>
  );
} 