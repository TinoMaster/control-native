import { StepsHeader } from "features/sales/components/stepsHeader";
import StepsNavigation from "features/sales/components/stepsNavigation";
import useColors from "hooks/useColors";
import { Text, View } from "react-native";
import { useDailyReportStore } from "features/sales/store/dailyReport.store";
import Step1Details from "./steps/step-1-details";
import Step2Debts from "./steps/step-2-debts";
import Step3Cards from "./steps/step-3-cards";
import Step4ServicesSales from "./steps/step-4-services-sales";
import ReviewFinalReport from "./steps/review_final_report";
import { useBusinessStore } from "store/business.store";
import { QueryTypeBusinessFinalSale, useBusinessFinalSale } from "hooks/api/useBusinessFinalSale";
import { useMemo } from "react";
import { getActiveMachines } from "utilities/helpers/machines.utils";

export default function CreateReportWizard() {
  const currentStep = useDailyReportStore((state) => state.currentStep);
  /* TODO: continuar aqui, ver si esto se puede mejorar */
  const business = useBusinessStore((state) => state.business);
  const { machinesAlreadySelected } = useBusinessFinalSale(QueryTypeBusinessFinalSale.DAILY);
  const { machines } = business;
  const defaultColors = useColors();

  /* Seleccionar solo las maquinas activas y que no estén ya seleccionadas en un reporte del mismo dia */
  const activeMachines = useMemo(() => {
    return getActiveMachines(machines, machinesAlreadySelected?.());
  }, [machines, machinesAlreadySelected]);

  if (activeMachines.length === 0) {
    return (
      <View style={{ backgroundColor: defaultColors.background }} className="flex-1 justify-center items-center p-4">
        <Text style={{ color: defaultColors.text }} className="text-center">
          No hay máquinas activas disponibles
        </Text>
      </View>
    );
  }

  function renderCurrentStep() {
    if (currentStep === 1) {
      return <Step1Details />;
    }
    if (currentStep === 2) {
      return <Step2Debts />;
    }
    if (currentStep === 3) {
      return <Step3Cards />;
    }
    if (currentStep === 4) {
      return <Step4ServicesSales />;
    }
    if (currentStep === 5) {
      return <ReviewFinalReport />;
    }
    return <Step1Details />;
  }

  return (
    <View style={{ backgroundColor: defaultColors.background }} className="flex-1">
      {/* Header */}
      <StepsHeader />

      {/* Step Content */}
      <View className="flex-1 p-4">{renderCurrentStep()}</View>

      {/* Navigation */}
      <StepsNavigation />
    </View>
  );
}
