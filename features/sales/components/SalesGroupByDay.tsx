import { Feather } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "expo-router";
import useColors from "hooks/useColors";
import { BusinessFinalSaleModelResponse } from "models/api/businessFinalSale.model";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import { DailyReportCardSmall } from "./DailyReportCardSmall";

interface SalesGroupByDayProps {
  readonly date: string;
  readonly reports: BusinessFinalSaleModelResponse[];
}

export interface GroupedSale {
  date: string;
  formattedDate: string;
  reports: BusinessFinalSaleModelResponse[];
  totalAmount: number;
}

export function SalesGroupByDay({ date, reports }: SalesGroupByDayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const defaultColors = useColors();
  const router = useRouter();

  const totalAmount = useMemo(() => {
    return reports.reduce((sum, report) => {
      // Calculate total from report details if available
      const reportTotal = report.total || 0;
      return sum + reportTotal;
    }, 0);
  }, [reports]);

  const formattedDate = useMemo(() => {
    // Format the date as "Lunes, 5 de mayo"
    return format(parseISO(date), "EEEE, d 'de' MMMM", { locale: es });
  }, [date]);

  return (
    <View style={[styles.container, { backgroundColor: adjustBrightness(defaultColors.background, 20) }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        accessibilityRole="button"
        accessibilityLabel={`Ventas del día ${formattedDate}. ${reports.length} reportes. Total: ${totalAmount.toFixed(
          2
        )}`}
        accessibilityHint="Presiona para expandir o contraer los detalles"
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.dateText, { color: defaultColors.text }]}>{formattedDate}</Text>
            <Text style={[styles.reportsCount, { color: defaultColors.textSecondary }]}>
              {reports.length} {reports.length === 1 ? "reporte" : "reportes"}
            </Text>
          </View>

          <View style={styles.rightContent}>
            <Text style={[styles.totalAmount, { color: defaultColors.primary }]}>${totalAmount.toFixed(2)}</Text>
            <Feather
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color={defaultColors.textSecondary}
              style={styles.icon}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContent}>
          {reports.map((report) => (
            <DailyReportCardSmall
              key={report.id}
              report={report}
              onPress={() => {
                if (report.id) {
                  router.push(`/(tabs)/sales/${report.id}` as any);
                }
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  header: {
    padding: 16
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize"
  },
  reportsCount: {
    fontSize: 14,
    marginTop: 2
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8
  },
  icon: {
    marginLeft: 4
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  reportItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  reportItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: "500"
  },
  reportSubtitle: {
    fontSize: 12,
    marginTop: 2
  },
  reportAmount: {
    fontSize: 16,
    fontWeight: "600"
  }
});
