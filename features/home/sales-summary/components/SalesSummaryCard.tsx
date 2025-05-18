// features/home/sales-summary/components/SalesSummaryCard.tsx
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { MyCard } from "components/ui/MyCard";
import { SelectModal } from "components/ui/modals/selectModal";
import useColors from "hooks/useColors";

type TimeRange = "day" | "week" | "month" | "year" | "all";

const TIME_RANGE_OPTIONS = [
  { id: "day", label: "Hoy" },
  { id: "week", label: "Esta semana" },
  { id: "month", label: "Este mes" },
  { id: "year", label: "Este año" },
  { id: "all", label: "Todo el tiempo" }
];

export function SalesSummaryCard() {
  const defaultColors = useColors();
  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  const [showTimeRangeModal, setShowTimeRangeModal] = useState(false);

  // Datos de ejemplo
  const salesData = {
    totalSales: 12540.75,
    paid: 9840.5,
    pending: 2700.25,
    totalServices: 42,
    trend: "up" as const,
    trendPercentage: 12.5
  };

  const selectedRangeLabel = TIME_RANGE_OPTIONS.find((opt) => opt.id === timeRange)?.label ?? "";

  return (
    <MyCard
      title="Resumen de Ventas"
      iconTitle="stats-chart"
      iconButton="filter"
      onPressIcon={() => setShowTimeRangeModal(true)}
      iconButtonLabel={selectedRangeLabel}
    >
      {/* Métricas principales */}
      <View className="grid grid-cols-2 gap-4">
        <MetricItem
          label="Ventas Totales"
          value={`$${salesData.totalSales.toLocaleString()}`}
          icon="attach-money"
          color={defaultColors.primary}
        />
        <MetricItem label="Pagado" value={`$${salesData.paid.toLocaleString()}`} icon="check-circle" color="#4CAF50" />
        <MetricItem label="Pendiente" value={`$${salesData.pending.toLocaleString()}`} icon="pending" color="#FF9800" />
        <MetricItem
          label="Servicios"
          value={salesData.totalServices.toString()}
          icon="miscellaneous-services"
          color="#9C27B0"
        />
      </View>

      {/* Tendencias */}
      <View className="flex-row items-center mt-2">
        <MaterialIcons
          name={salesData.trend === "up" ? "trending-up" : "trending-down"}
          size={20}
          color={salesData.trend === "up" ? "#4CAF50" : "#F44336"}
        />
        <Text style={{ color: defaultColors.text }} className="ml-1 text-sm">
          {salesData.trend === "up" ? "+" : "-"}
          {salesData.trendPercentage}% respecto al período anterior
        </Text>
      </View>

      {/* Modal de selección de rango de tiempo */}
      <SelectModal
        isVisible={showTimeRangeModal}
        title="Seleccionar período"
        onClose={() => setShowTimeRangeModal(false)}
        data={TIME_RANGE_OPTIONS}
        renderItem={(item) => (
          <View className="flex-row justify-between items-center p-2">
            <Text style={{ color: defaultColors.text }} className="text-base">
              {item.label}
            </Text>
            {timeRange === item.id && <MaterialIcons name="check" size={20} color={defaultColors.primary} />}
          </View>
        )}
        onSelect={(item) => {
          setTimeRange(item.id as TimeRange);
          setShowTimeRangeModal(false);
        }}
        keyExtractor={(item) => item.id}
      />
    </MyCard>
  );
}

interface MetricItemProps {
  readonly label: string;
  readonly value: string;
  readonly icon: string;
  readonly color: string;
}

function MetricItem({ label, value, icon, color }: MetricItemProps) {
  const defaultColors = useColors();
  return (
    <View style={{ backgroundColor: defaultColors.background }} className="w-full px-3 py-2 rounded-lg">
      <View className="w-9 h-9 rounded-full items-center justify-center mb-2" style={{ backgroundColor: `${color}20` }}>
        <MaterialIcons name={icon as any} size={20} color={color} />
      </View>
      <Text style={{ color: defaultColors.text }} className="text-lg font-semibold">
        {value}
      </Text>
      <Text style={{ color: defaultColors.text }} className="text-xs">
        {label}
      </Text>
    </View>
  );
}
