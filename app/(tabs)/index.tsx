import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/context/ThemeContext";
import ExpenseCard from "@/components/ExpenseCard";
import BalanceCard from "@/components/BalanceCard";
import StatsCard from "@/components/StatsCard";

export default function Dashboard() {
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? "#1A1A1A" : "#FFFFFF",
      }}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: isDarkMode ? "#9CA3AF" : "#6B7280",
                }}
              >
                Hi, George
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: isDarkMode ? "#FFFFFF" : "#1F2937",
                }}
              >
                Dashboard
              </Text>
            </View>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
          </View>

          {/* Expense Monitoring Card */}
          <ExpenseCard />

          {/* Balance Card */}
          <BalanceCard />

          {/* Stats Section */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginTop: 20,
            }}
          >
            <StatsCard
              title="Profit"
              percentage="53.2%"
              trend="up"
              style={{ flex: 1 }}
            />
            <StatsCard
              title="Debt"
              percentage="53.2%"
              trend="down"
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 