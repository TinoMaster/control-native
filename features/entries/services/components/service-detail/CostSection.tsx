import { MyCard } from "components/ui/cards/MyCard";
import useColors from "hooks/useColors";
import { ServiceModel } from "models/api";
import { StyleSheet, Text, View } from "react-native";

export const CostSection = ({ service }: { service: ServiceModel }) => {
  const defaultColors = useColors();

  return (
    <MyCard title="Costos Asociados" iconTitle="cash-outline">
      {service.costs.map((cost) => (
        <View key={cost.id} style={styles.costItem}>
          <Text style={[styles.costName, { color: defaultColors.text }]}>{cost.consumable.name}</Text>
          <Text style={[styles.costAmount, { color: defaultColors.primary }]}>
            {cost.quantity} x ${cost.consumable.price.toFixed(2)}
          </Text>
        </View>
      ))}
    </MyCard>
  );
};

const styles = StyleSheet.create({
  costItem: {
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8
  },
  costName: {
    fontSize: 14
  },
  costAmount: {
    fontSize: 14,
    fontWeight: "500"
  }
});
