import { BlurBar } from "components/ui/BlurBar";
import { useDailyReportStore } from "features/sales/current_day/store/dailyReport.store";
import useColors from "hooks/useColors";
import { Text } from "react-native";

export function StepsHeader() {
  const currentStep = useDailyReportStore((state) => state.currentStep);
  const totalSteps = useDailyReportStore((state) => state.totalSteps);
  const defaultColors = useColors();

  return (
    <BlurBar
      style={{
        top: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ color: defaultColors.text }} className="text-center text-xl font-bold">
        Crear Reporte de Venta
      </Text>
      <Text style={{ color: defaultColors.textSecondary }} className="text-center text-sm">
        Paso {currentStep} de {totalSteps}
      </Text>
    </BlurBar>
  );
}
