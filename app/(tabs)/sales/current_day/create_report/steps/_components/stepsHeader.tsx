import { Text, View } from "react-native";
import { useDailyReportStore } from "store/dailyReport.store";

export default function StepsHeader() {
  const currentStep = useDailyReportStore((state) => state.currentStep);
  const totalSteps = useDailyReportStore((state) => state.totalSteps);

  return (
    <View className="p-4 border-b border-gray-200 dark:border-gray-700">
      <Text className="text-center text-xl font-bold text-gray-800 dark:text-gray-100">Crear Reporte de Venta</Text>
      <Text className="text-center text-sm text-gray-500 dark:text-gray-400">
        Paso {currentStep} de {totalSteps}
      </Text>
    </View>
  );
}
