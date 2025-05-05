import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import useColors from "hooks/useColors";
import { BusinessFinalSaleModelResponse } from "models/api/businessFinalSale.model";
import { MotiView } from "moti";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { shadowStyles } from "styles/shadows";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

interface DailyReportCardProps {
  readonly report: BusinessFinalSaleModelResponse;
  readonly onPress?: () => void;
}

export function DailyReportCard({ report, onPress }: DailyReportCardProps) {
  const colors = useColors();
  const createdAt = report.createdAt ? new Date(report.createdAt) : null;
  const pendingAmount = report.total - report.paid;
  const isPaid = pendingAmount <= 0;

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
        style={[styles.container, { backgroundColor: adjustBrightness(colors.background, 18) }]}
        activeOpacity={0.8}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>{report.name}</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {createdAt ? format(createdAt, "dd/MM/yyyy HH:mm") : "Fecha no disponible"}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
        </View>

        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <Ionicons name="people-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>{report.workers.length} trabajadores</Text>
          </View>

          <View style={styles.infoContainer}>
            <Ionicons name="construct-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>{report.machines.length} máquinas</Text>
          </View>

          {Boolean(report.note) && (
            <View style={styles.infoContainer}>
              <Ionicons name="document-text-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.infoText, { color: colors.textSecondary }]} numberOfLines={1}>
                {report.note}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.amountContainer}>
            <View style={styles.infoContainer}>
              <Ionicons name="cash-outline" size={16} color={colors.primary} />
              <Text style={[styles.amountText, { color: colors.primary }]}>Total: ${report.total.toFixed(2)}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Ionicons
                name={isPaid ? "checkmark-circle-outline" : "alert-circle-outline"}
                size={16}
                color={isPaid ? colors.primary : colors.secondary}
              />
              <Text style={[styles.amountText, { color: isPaid ? colors.primary : colors.secondary }]}>
                {isPaid ? "Pagado" : `Pendiente: $${pendingAmount.toFixed(2)}`}
              </Text>
            </View>
          </View>

          {report.cards.length > 0 && (
            <View style={[styles.infoContainer, styles.paymentMethod]}>
              <Ionicons name="card-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                {report.cards.length} {report.cards.length === 1 ? "tarjeta" : "tarjetas"}
              </Text>
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
    marginBottom: 12,
    ...shadowStyles.card
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
  paymentMethod: {
    marginTop: 4
  }
});
