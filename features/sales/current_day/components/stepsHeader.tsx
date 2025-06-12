import { useDailyReportStore } from "features/sales/current_day/store/dailyReport.store";
import { Text, View } from "react-native";
import colors from "styles/colors";

export function StepsHeader() {
  const currentStep = useDailyReportStore((state) => state.currentStep);
  const totalSteps = useDailyReportStore((state) => state.totalSteps);

  return (
    <View className="p-4 border-b border-gray-600">
      <Text style={{ color: colors.darkMode.text.light }} className="text-center text-xl font-bold">
        Crear Reporte de Venta
      </Text>
      <Text style={{ color: colors.darkMode.textSecondary.light }} className="text-center text-sm">
        Paso {currentStep} de {totalSteps}
      </Text>
    </View>
  );
}
