import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import useColors from "hooks/useColors";
import { BusinessFinalSaleModelResponse } from "models/api/businessFinalSale.model";
import { MotiView } from "moti";
import { Text, TouchableOpacity, View } from "react-native";

interface DailyReportCardProps {
  readonly report: BusinessFinalSaleModelResponse;
  readonly onPress?: () => void;
  readonly smallView?: boolean;
}

export function DailyReportCard({ report, onPress, smallView = false }: DailyReportCardProps) {
  const defaultColors = useColors();
  const createdAt = report.createdAt ? new Date(report.createdAt) : null;
  const pendingAmount = report.total - report.paid;
  const isPaid = pendingAmount <= 0;
  const bgColor = { backgroundColor: defaultColors.background };

  // Common formatted date text
  const dateText = createdAt ? format(createdAt, "dd/MM/yyyy HH:mm") : "Fecha no disponible";

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 300 }}
    >
      <TouchableOpacity
        onPress={onPress}
        className={`rounded-xl ${smallView ? "p-3 mb-2" : "p-4 mb-4"} shadow-sm`}
        style={bgColor}
        activeOpacity={0.8}
      >
        {/* Header - Common in both views */}
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 mr-2">
            <Text
              className={`${smallView ? "text-sm" : "text-base"} font-semibold mb-0.5`}
              style={{ color: defaultColors.text }}
              numberOfLines={1}
            >
              {report.name}
            </Text>
            <Text
              className={`${smallView ? "text-xs" : "text-sm"}`}
              style={{ color: defaultColors.textSecondary }}
              numberOfLines={1}
            >
              {dateText}
            </Text>
          </View>

          {/* Amount display */}
          <View className="items-end">
            <Text
              className={`${smallView ? "text-sm" : "text-base"} font-semibold`}
              style={{ color: defaultColors.primary }}
            >
              ${report.total.toFixed(2)}
            </Text>
            {!isPaid && (
              <Text className={`${smallView ? "text-xs" : "text-sm"}`} style={{ color: defaultColors.secondary }}>
                ${pendingAmount.toFixed(2)}
              </Text>
            )}
          </View>

          {!smallView && <Ionicons name="chevron-forward" size={24} color={defaultColors.textSecondary} />}
        </View>

        {/* Content section - Only in detailed view */}
        {!smallView && (
          <View className="mb-3">
            <IconWithCount name="people-outline" count={report.workers.length} label="trabajadores" />
            <IconWithCount name="construct-outline" count={report.machines.length} label="máquinas" />
            {Boolean(report.note) && (
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="document-text-outline" size={16} color={defaultColors.textSecondary} />
                <Text className="text-sm" style={{ color: defaultColors.textSecondary }} numberOfLines={1}>
                  {report.note}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Footer */}
        <View
          className={`flex-row items-center ${
            smallView ? "justify-start gap-3" : "justify-between pt-2 border-t border-gray-100"
          }`}
        >
          {smallView ? (
            // Compact footer for small view
            <>
              <IconWithCount name="people-outline" count={report.workers.length} />
              <IconWithCount name="construct-outline" count={report.machines.length} />
              {report.cards.length > 0 && <IconWithCount name="card-outline" count={report.cards.length} />}
              <Ionicons
                name={isPaid ? "checkmark-circle-outline" : "alert-circle-outline"}
                size={14}
                color={isPaid ? defaultColors.primary : defaultColors.secondary}
              />
            </>
          ) : (
            // Detailed footer
            <>
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Ionicons name="cash-outline" size={16} color={defaultColors.primary} />
                  <Text className="text-sm font-medium" style={{ color: defaultColors.primary }}>
                    Total: ${report.total.toFixed(2)}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Ionicons
                    name={isPaid ? "checkmark-circle-outline" : "alert-circle-outline"}
                    size={16}
                    color={isPaid ? defaultColors.primary : defaultColors.secondary}
                  />
                  <Text
                    className="text-sm font-medium"
                    style={{ color: isPaid ? defaultColors.primary : defaultColors.secondary }}
                  >
                    {isPaid ? "Pagado" : `Pendiente: $${pendingAmount.toFixed(2)}`}
                  </Text>
                </View>
              </View>
              {report.cards.length > 0 && (
                <View className="flex-row items-center gap-2">
                  <Ionicons name="card-outline" size={16} color={defaultColors.textSecondary} />
                  <Text className="text-sm" style={{ color: defaultColors.textSecondary }}>
                    {report.cards.length} {report.cards.length === 1 ? "tarjeta" : "tarjetas"}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}

// Icon with count component to reduce repetition
const IconWithCount = ({
  name,
  count,
  label = "",
  smallView = false
}: {
  name: any;
  count: number;
  label?: string;
  smallView?: boolean;
}) => {
  const size = smallView ? 14 : 16;
  const defaultColors = useColors();

  return (
    <View className={`flex-row items-center ${smallView ? "gap-1" : "gap-2 mb-2"}`}>
      <Ionicons name={name} size={size} color={defaultColors.textSecondary} />
      <Text className={`${smallView ? "text-xs" : "text-sm"}`} style={{ color: defaultColors.textSecondary }}>
        {count}
        {Boolean(label) && ` ${label}`}
      </Text>
    </View>
  );
};
