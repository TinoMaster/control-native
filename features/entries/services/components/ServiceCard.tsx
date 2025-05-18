import { Ionicons } from "@expo/vector-icons";
import { MyCard } from "components/ui/MyCard";
import useColors from "hooks/useColors";
import { ServiceModel } from "models/api/service.model";
import { StyleSheet, Text, View } from "react-native";

interface ServiceCardProps {
  readonly service: ServiceModel;
  readonly onPress?: () => void;
}

export default function ServiceCard({ service, onPress }: ServiceCardProps) {
  const colors = useColors();

  return (
    <MyCard title={service.name} onPressIcon={onPress} iconButton="chevron-forward">
      <Text style={[styles.price, { color: colors.primary }]}>${service.price.toFixed(2)}</Text>

      {Boolean(service.description) && (
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {service.description}
        </Text>
      )}

      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <Ionicons name="cash-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {service.costs.length} {service.costs.length === 1 ? "costo asociado" : "costos asociados"}
          </Text>
        </View>
        {service.serviceKey?.createdAt && (
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            Creado: {new Date(service.serviceKey.createdAt).toLocaleDateString()}
          </Text>
        )}
      </View>
    </MyCard>
  );
}

const styles = StyleSheet.create({
  price: {
    fontSize: 16,
    fontWeight: "500"
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
