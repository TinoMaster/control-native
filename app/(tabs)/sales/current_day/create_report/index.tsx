import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { dailyReportStore } from "store/dailyReport.store";
import { StepsHeader } from "./steps/_components/stepsHeader";
import { StepsNavigation } from "./steps/_components/stepsNavigation";
import { Step1Details } from "./steps/step-1-details";
import Step2Debts from "./steps/step-2-debts";

export default function CreateReportWizard() {
  const currentStep = dailyReportStore((state) => state.currentStep);

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
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1">
        {/* Header */}
        <StepsHeader />

        {/* Step Content */}
        <View className="flex-1">{renderCurrentStep()}</View>

        {/* Navigation */}
        <StepsNavigation />
      </View>
    </SafeAreaView>
  );
}
