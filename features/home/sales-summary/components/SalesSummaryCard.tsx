import { MaterialIcons } from "@expo/vector-icons";
import { MyCard } from "components/ui/MyCard";
import { SelectModal } from "components/ui/modals/selectModal";
import { TIME_RANGE_OPTIONS_TRANSLATION } from "data/global.data";
import useColors from "hooks/useColors";
import { useState } from "react";
import { Text, View } from "react-native";
import { useHomeSalesResume } from "../hooks/useHomeSalesResume";
import { usePeriodStore } from "../store/period.store";
import { MetricItem } from "./MetricItem";
import { formatCurrency } from "utilities/formatters";

export function SalesSummaryCard() {
  const defaultColors = useColors();
  const [showTimeRangeModal, setShowTimeRangeModal] = useState(false);

  const { selectedTimeRange, setSelectedTimeRange, translationTimeRange } = usePeriodStore();

  const { salesResumeData, isLoadingSalesResume } = useHomeSalesResume(selectedTimeRange);

  // Datos de ejemplo
  const salesDataExample = {
    totalSales: 12540.75,
    paid: 9840,
    pending: 2700.25,
    totalServices: 42,
    trend: "up" as const,
    trendPercentage: 12.5
  };

  return (
    <MyCard
      title="Resumen de Ventas"
      iconTitle="stats-chart"
      iconButton="filter"
      onPressIcon={() => setShowTimeRangeModal(true)}
      iconButtonLabel={translationTimeRange}
    >
      {/* Métricas principales */}
      <View className="flex-row flex-wrap justify-between gap-2">
        <MetricItem
          label="Ventas Totales"
          value={`${formatCurrency(salesResumeData?.data?.totalSales ?? 0)}`}
          icon="attach-money"
          color={defaultColors.primary}
          isLoading={isLoadingSalesResume}
        />
        <MetricItem
          label="En Servicios"
          value={`${formatCurrency(salesResumeData?.data?.totalServices ?? 0)}`}
          icon="check-circle"
          color="#4CAF50"
          isLoading={isLoadingSalesResume}
        />
        <MetricItem
          label="Costo Total (Insumos)"
          value={`${formatCurrency(salesResumeData?.data?.totalCost ?? 0)}`}
          icon="pending"
          color="#FF9800"
          isLoading={isLoadingSalesResume}
        />
        <MetricItem
          label="Gastos (Salarios)"
          value={`${formatCurrency(salesResumeData?.data?.totalSalaries ?? 0)}`}
          icon="miscellaneous-services"
          color="#9C27B0"
          isLoading={isLoadingSalesResume}
        />
      </View>

      {/* Tendencias */}
      <View className="flex-row items-center mt-2">
        <MaterialIcons
          name={salesDataExample.trend === "up" ? "trending-up" : "trending-down"}
          size={20}
          color={salesDataExample.trend === "up" ? "#4CAF50" : "#F44336"}
        />
        <Text style={{ color: defaultColors.text }} className="ml-1 text-sm">
          {salesDataExample.trend === "up" ? "+" : "-"}
          {salesDataExample.trendPercentage}% respecto al período anterior
        </Text>
      </View>

      {/* Modal de selección de rango de tiempo */}
      <SelectModal
        isVisible={showTimeRangeModal}
        title="Seleccionar período"
        onClose={() => setShowTimeRangeModal(false)}
        data={TIME_RANGE_OPTIONS_TRANSLATION}
        renderItem={(item) => (
          <View className="flex-row justify-between items-center p-2">
            <Text style={{ color: defaultColors.text }} className="text-base">
              {item.label}
            </Text>
            {selectedTimeRange === item.id && <MaterialIcons name="check" size={20} color={defaultColors.primary} />}
          </View>
        )}
        onSelect={(item) => {
          setSelectedTimeRange(item.id);
          setShowTimeRangeModal(false);
        }}
        keyExtractor={(item) => item.id}
      />
    </MyCard>
  );
}
