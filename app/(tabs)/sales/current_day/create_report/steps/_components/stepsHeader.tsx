import useColors from "hooks/useColors";
import { Text, View } from "react-native";
import { useDailyReportStore } from "store/dailyReport.store";

export default function StepsHeader() {
  const currentStep = useDailyReportStore((state) => state.currentStep);
  const totalSteps = useDailyReportStore((state) => state.totalSteps);
  const defaultColors = useColors();

  return (
    <View className="p-4 shadow">
      <Text style={{ color: defaultColors.text }} className="text-center text-xl font-bold">
        Crear Reporte de Venta
      </Text>
      <Text style={{ color: defaultColors.text }} className="text-center text-sm">
        Paso {currentStep} de {totalSteps}
      </Text>
    </View>
  );
}
