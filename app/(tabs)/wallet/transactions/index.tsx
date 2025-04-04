import useColors from "hooks/useColors";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
}

const transactions: Transaction[] = [
  { id: "1", amount: 100, description: "Compra en Amazon", date: "2024-03-30" },
  { id: "2", amount: -50, description: "Restaurante", date: "2024-03-29" },
  { id: "3", amount: 200, description: "Depósito", date: "2024-03-28" },
];

export default function TransactionsScreen() {
  const colors = useColors();

  const renderItem = ({ item }: { item: Transaction }) => (
    <View
      style={[styles.transactionItem, { backgroundColor: colors.background }]}
    >
      <View>
        <Text style={[styles.description, { color: colors.text }]}>
          {item.description}
        </Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>
          {item.date}
        </Text>
      </View>
      <Text
        style={[
          styles.amount,
          { color: item.amount > 0 ? colors.primary : colors.text },
        ]}
      >
        {item.amount > 0 ? "+" : ""}
        {item.amount}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
  },
  date: {
    fontSize: 14,
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
