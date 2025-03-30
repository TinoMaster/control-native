import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const BalanceCard = () => {
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
      <View style={styles.header}>
        <Text
          style={[
            styles.balanceLabel,
            { color: isDarkMode ? "#9CA3AF" : "#6B7280" },
          ]}
        >
          Balance
        </Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.balanceAmount,
          { color: isDarkMode ? "#FFFFFF" : "#1F2937" },
        ]}
      >
        $6,421.52
      </Text>

      <View style={styles.transaction}>
        <View style={styles.transactionLeft}>
          <View
            style={[
              styles.transactionIcon,
              { backgroundColor: isDarkMode ? "#374151" : "#E5E7EB" },
            ]}
          >
            <Ionicons
              name="card-outline"
              size={20}
              color={isDarkMode ? "#FFFFFF" : "#1F2937"}
            />
          </View>
          <View>
            <Text
              style={[
                styles.transactionTitle,
                { color: isDarkMode ? "#FFFFFF" : "#1F2937" },
              ]}
            >
              ATM, 375 Canal St
            </Text>
            <Text
              style={[
                styles.transactionSubtitle,
                { color: isDarkMode ? "#9CA3AF" : "#6B7280" },
              ]}
            >
              Cash withdrawal
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.transactionAmount,
            { color: isDarkMode ? "#FFFFFF" : "#1F2937" },
          ]}
        >
          -$300
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
  },
  seeMore: {
    fontSize: 14,
    color: "#3B82F6",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  transactionSubtitle: {
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default BalanceCard; 