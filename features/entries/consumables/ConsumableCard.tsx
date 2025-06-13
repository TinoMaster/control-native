import { Ionicons } from "@expo/vector-icons";
import { MyCard } from "components/ui/cards/MyCard";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { StyleSheet, Text, View } from "react-native";

interface ConsumableCardProps {
  readonly consumable: ConsumableModel;
  readonly onPress?: () => void;
}

export default function ConsumableCard({ consumable, onPress }: ConsumableCardProps) {
  const colors = useColors();

  return (
    <MyCard title={consumable.name} onPressIcon={onPress} iconButton="chevron-forward">
      <Text style={[styles.price, { color: colors.primary }]}>${consumable.price.toFixed(2)}</Text>

      {Boolean(consumable.description) && (
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {consumable.description}
        </Text>
      )}

      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <Ionicons name="cube-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Stock: {consumable.stock} {consumable.unit}
          </Text>
        </View>
        {consumable.consumableKey?.createdAt && (
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            Creado: {new Date(consumable.consumableKey.createdAt).toLocaleDateString()}
          </Text>
        )}
      </View>
    </MyCard>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  titleContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  infoText: {
    fontSize: 12,
    marginLeft: 4
  },
  date: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "right"
  }
});
