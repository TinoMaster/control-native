import { StepsHeader } from "features/sales/components/stepsHeader";
import StepsNavigation from "features/sales/components/stepsNavigation";
import useColors from "hooks/useColors";
import { View } from "react-native";
import { useDailyReportStore } from "store/dailyReport.store";
import Step1Details from "./steps/step-1-details";
import Step2Debts from "./steps/step-2-debts";

export default function CreateReportWizard() {
  const currentStep = useDailyReportStore((state) => state.currentStep);
  const defaultColors = useColors();

  function renderCurrentStep() {
    if (currentStep === 1) {
      return <Step1Details />;
    }
    if (currentStep === 2) {
      return <Step2Debts />;
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
