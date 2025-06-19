import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { MessageModal } from "components/ui/modals/messageModal";
import { useRouter } from "expo-router";
import { StepsHeader } from "features/sales/current_day/components/stepsHeader";
import StepsNavigation from "features/sales/current_day/components/stepsNavigation";
import { useDailyReportStore } from "features/sales/current_day/store/dailyReport.store";
import { useDailySales } from "hooks/api/useDailySales";
import { useMemo } from "react";
import { useBusinessStore } from "store/business.store";
import { getActiveMachines } from "utilities/helpers/machines.utils";
import ReviewFinalReport from "./steps/review_final_report";
import Step1Details from "./steps/step-1-details";
import Step2Debts from "./steps/step-2-debts";
import Step3Cards from "./steps/step-3-cards";
import Step4ServicesSales from "./steps/step-4-services-sales";

export default function CreateReportWizard() {
  const currentStep = useDailyReportStore((state) => state.currentStep);
  const business = useBusinessStore((state) => state.business);
  const { machinesAlreadySelected } = useDailySales();
  const { machines, users } = business;
  const router = useRouter();

  const activeMachines = useMemo(() => {
    return getActiveMachines(machines, machinesAlreadySelected?.());
  }, [machines, machinesAlreadySelected]);

  if (users?.length === 0) {
    return (
      <MessageModal
        title="No hay usuarios"
        message="No hay usuarios disponibles"
        onClose={() => router.back()}
        isVisible={true}
      />
    );
  }

  if (activeMachines.length === 0) {
    return (
      <MessageModal
        title="No hay máquinas activas"
        message="No hay máquinas activas disponibles"
        onClose={() => router.back()}
        isVisible={true}
      />
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
    <GradientBackground>
      <StepsHeader />
      {renderCurrentStep()}
      <StepsNavigation />
    </GradientBackground>
  );
}
