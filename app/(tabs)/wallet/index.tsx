import { Link } from "expo-router";
import useColors from "hooks/useColors";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function WalletScreen() {
  const colors = useColors();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 20 }}>
        {/* Balance Card */}
        <View
          style={{
            backgroundColor: colors.primary,
            padding: 20,
            borderRadius: 16,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Balance Total</Text>
          <Text style={{ color: "white", fontSize: 32, fontWeight: "bold" }}>
            $5,000.00
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
          <Link
            href="/wallet/transactions"
            style={{
              flex: 1,
              backgroundColor: colors.background,
              padding: 16,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "bold" }}>
              Ver Transacciones
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
