import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import useColors from "hooks/useColors";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { MotiView } from "moti";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

interface SaleServiceCardProps {
  readonly saleService: ServiceSaleModel;
  readonly onPress?: () => void;
  readonly allDetails?: boolean;
}

export function SaleServiceCard({ saleService, onPress, allDetails = true }: SaleServiceCardProps) {
  const defaultColors = useColors();
  const createdAt = saleService.createdAt ? new Date(saleService.createdAt) : null;
  const totalAmount = saleService.quantity * saleService.service.price;

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
        style={[styles.container, { backgroundColor: adjustBrightness(defaultColors.background, 8) }]}
        activeOpacity={0.8}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: defaultColors.text }]}>{saleService.service.name}</Text>
            <Text style={[styles.subtitle, { color: defaultColors.textSecondary }]}>
              {createdAt ? format(createdAt, "dd/MM/yyyy HH:mm") : "Fecha no disponible"}
            </Text>
          </View>
          {onPress && <Ionicons name="chevron-forward" size={24} color={defaultColors.textSecondary} />}
        </View>

        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <Ionicons name="person-outline" size={16} color={defaultColors.textSecondary} />
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
              {saleService.employee.user.name}
            </Text>
          </View>

          {allDetails && (
            <View style={styles.infoContainer}>
              <Ionicons name="document-text-outline" size={16} color={defaultColors.textSecondary} />
              <Text style={[styles.infoText, { color: defaultColors.textSecondary }]} numberOfLines={2}>
                {saleService.service.description}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.amountContainer}>
            <View style={styles.infoContainer}>
              <Ionicons name="pricetag-outline" size={16} color={defaultColors.textSecondary} />
              <Text style={[styles.amountText, { color: defaultColors.textSecondary }]}>
                Precio: ${saleService.service.price.toFixed(2)}
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <Ionicons name="calculator-outline" size={16} color={defaultColors.textSecondary} />
              <Text style={[styles.amountText, { color: defaultColors.textSecondary }]}>
                Cantidad: {saleService.quantity}
              </Text>
            </View>
          </View>

          {allDetails && (
            <View style={[styles.infoContainer, styles.totalAmount]}>
              <Ionicons name="cash-outline" size={18} color={defaultColors.primary} />
              <Text style={[styles.totalText, { color: defaultColors.primary }]}>Total: ${totalAmount.toFixed(2)}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </MotiView>
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
    marginBottom: 12
  },
  titleContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4
  },
  content: {
    marginBottom: 12,
    gap: 6
  },
  footer: {
    marginTop: 8
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  amountText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8
  },
  totalAmount: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eaeaea"
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8
  }
});
