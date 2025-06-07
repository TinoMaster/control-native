import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import useColors from "hooks/useColors";
import { BusinessFinalSaleModelResponse } from "models/api/businessFinalSale.model";
import { Text, TouchableOpacity, View } from "react-native";

interface DailyReportCardSmallProps {
  readonly report: BusinessFinalSaleModelResponse;
  readonly onPress?: () => void;
}

export function DailyReportCardSmall({ report, onPress }: DailyReportCardSmallProps) {
  const defaultColors = useColors();
  const createdAt = report.createdAt ? new Date(report.createdAt) : null;
  const pendingAmount = report.total - report.paid;
  const isPaid = pendingAmount <= 0;
  const bgColor = { backgroundColor: defaultColors.background };

  // Formatted date text
  const dateText = createdAt ? format(createdAt, "dd/MM/yyyy HH:mm") : "Fecha no disponible";

  return (
    <View>
      <TouchableOpacity onPress={onPress} className="rounded-xl p-3 mb-2 shadow-sm" style={bgColor} activeOpacity={0.8}>
        {/* Header */}
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 mr-2">
            <Text className="text-sm font-semibold mb-0.5" style={{ color: defaultColors.text }} numberOfLines={1}>
              {report.name}
            </Text>
            <Text className="text-xs" style={{ color: defaultColors.textSecondary }} numberOfLines={1}>
              {dateText}
            </Text>
          </View>

          {/* Amount display */}
          <View className="items-end">
            <Text className="text-sm font-semibold" style={{ color: defaultColors.primary }}>
              ${report.total.toFixed(2)}
            </Text>
            {!isPaid && (
              <Text className="text-xs" style={{ color: defaultColors.secondary }}>
                ${pendingAmount.toFixed(2)}
              </Text>
            )}
          </View>
        </View>

        {/* Footer - Compact version */}
        <View className="flex-row items-center justify-start gap-3">
          <IconWithCount name="people-outline" count={report.workers.length} />
          <IconWithCount name="construct-outline" count={report.machines.length} />
          {report.cards.length > 0 && <IconWithCount name="card-outline" count={report.cards.length} />}
          <Ionicons
            name={isPaid ? "checkmark-circle-outline" : "alert-circle-outline"}
            size={14}
            color={isPaid ? defaultColors.primary : defaultColors.secondary}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

// Icon with count component to reduce repetition
const IconWithCount = ({ name, count }: { name: any; count: number }) => {
  const defaultColors = useColors();

  return (
    <View className="flex-row items-center gap-1">
      <Ionicons name={name} size={14} color={defaultColors.textSecondary} />
      <Text className="text-xs" style={{ color: defaultColors.textSecondary }}>
        {count}
      </Text>
    </View>
  );
};
