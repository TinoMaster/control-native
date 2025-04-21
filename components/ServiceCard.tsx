import { Ionicons } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { ServiceModel } from "models/api/service.model";
import { MotiView } from "moti";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { shadowStyles } from "styles/shadows";

interface ServiceCardProps {
  readonly service: ServiceModel;
  readonly onPress?: () => void;
}

export default function ServiceCard({ service, onPress }: ServiceCardProps) {
  const colors = useColors();

  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.95
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      transition={{
        type: "timing",
        duration: 300
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, { backgroundColor: colors.background }]}
        activeOpacity={0.8}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>{service.name}</Text>
            <Text style={[styles.price, { color: colors.primary }]}>${service.price.toFixed(2)}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
        </View>

        {Boolean(service.description) && (
          <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
            {service.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.infoContainer}>
            <Ionicons name="business-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>Negocio #{service.business}</Text>
          </View>

          {Boolean(service.costs) && service.costs.length > 0 && (
            <View style={styles.infoContainer}>
              <Ionicons name="cash-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                {service.costs.length} costos asociados
              </Text>
            </View>
          )}
        </View>

        {service.createdAt && (
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            Creado: {new Date(service.createdAt).toLocaleDateString()}
          </Text>
        )}
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...shadowStyles.container
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
