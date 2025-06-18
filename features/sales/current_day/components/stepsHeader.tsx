import { BlurBar } from "components/ui/BlurBar";
import { useDailyReportStore } from "features/sales/current_day/store/dailyReport.store";
import useColors from "hooks/useColors";
import React from "react";
import { Text, View } from "react-native";

export function StepsHeader() {
  const currentStep = useDailyReportStore((state) => state.currentStep);
  const totalSteps = useDailyReportStore((state) => state.totalSteps);
  const defaultColors = useColors();

  const steps = totalSteps > 0 ? Array.from({ length: totalSteps }, (_, i) => i + 1) : [];

  const successColor = "#28a745";
  const borderColor = "#DDDDDD";

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
      <Text style={{ color: defaultColors.text }} className="text-center font-bold">
        Crear Reporte de Venta
      </Text>

      {steps.length > 0 && (
        <View className="flex-row items-center justify-center px-4">
          {steps.map((step, index) => {
            const isCurrent = step === currentStep;
            const isCompleted = step < currentStep;

            const circleBgColor: string = isCurrent
              ? defaultColors.primary
              : isCompleted
              ? successColor
              : defaultColors.background;

            const connectorColor = isCompleted ? successColor : borderColor;

            return (
              <React.Fragment key={step}>
                <View
                  style={{ backgroundColor: circleBgColor }}
                  className="w-6 h-6 rounded-full items-center justify-center"
                >
                  {isCompleted ? (
                    <Text style={{ color: "#FFFFFF" }} className="text-sm font-bold">
                      ✓
                    </Text>
                  ) : (
                    <Text
                      style={{ color: isCurrent ? "#FFFFFF" : defaultColors.textSecondary }}
                      className="text-sm font-bold"
                    >
                      {step}
                    </Text>
                  )}
                </View>

                {index < steps.length - 1 && (
                  <View
                    style={{ backgroundColor: connectorColor, height: 2 }}
                    className="flex-1 mx-2"
                  />
                )}
              </React.Fragment>
            );
          })}
        </View>
      )}

      {steps.length === 0 && (
        <Text style={{ color: defaultColors.textSecondary }} className="text-center text-sm mt-2">
          Cargando pasos...
        </Text>
      )}
    </BlurBar>
  );
}
