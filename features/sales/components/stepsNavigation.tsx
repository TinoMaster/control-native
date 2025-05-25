import { MessageModal } from "components/ui/modals/messageModal";
import MyButton from "components/ui/MyButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { useDailyReportStore } from "features/sales/store/dailyReport.store";
import { useFinalizeReport } from "../hooks/useFinalizeReport";
import LoadingPage from "components/ui/loaders/LoadingPage";

const toShowInModal = (step: number) => {
  switch (step) {
    case 1:
      return {
        title: "Detalles del Reporte",
        message: `Por favor, completa los detalles del reporte
  - Total
  - Al menos una máquina
  - Fondo de las máquinas seleccionadas
  - Al menos un trabajador`
      };
    case 2:
      return { title: "Detalles Monetarios", message: "Por favor, completa los detalles monetarios" };
    case 3:
      return { title: "Detalles de Ventas", message: "Por favor, completa los detalles de ventas" };
    default:
      return { title: "", message: "" };
  }
};

export default function StepsNavigation() {
  const currentStep = useDailyReportStore((state) => state.currentStep);
  const totalSteps = useDailyReportStore((state) => state.totalSteps);
  const handleNextStep = useDailyReportStore((state) => state.handleNextStep);
  const handlePreviousStep = useDailyReportStore((state) => state.handlePreviousStep);
  const report = useDailyReportStore((state) => state.report);
  const cards = useDailyReportStore((state) => state.cards);
  const machineStates = useDailyReportStore((state) => state.machineStates);
  const router = useRouter();
  const isStepCompleted = useDailyReportStore((state) => state.isStepCompleted);
  const [showModal, setShowModal] = useState(false);
  /* Metodo para finalizar el reporte */
  const { finalizeReport, clearAllReports, loadingSave } = useFinalizeReport();

  function handleNext() {
    if (currentStep === totalSteps) {
      finalizeReport(report, cards, machineStates);
    } else if (isStepCompleted(currentStep)) {
      handleNextStep();
    } else {
      setShowModal(true);
    }
  }

  function handlePrevious() {
    handlePreviousStep();
  }

  function handleCancel() {
    clearAllReports();
    router.replace("/(tabs)/sales/current_day");
  }

  const { title, message } = toShowInModal(currentStep);

  return (
    <>
      {loadingSave && <LoadingPage message="Guardando reporte..." absolute />}
      <MessageModal isVisible={showModal} onClose={() => setShowModal(false)} title={title} message={message} />
      <View className="flex-row justify-between p-4 border-t border-gray-600">
        <View className="flex-row space-x-2">
          <MyButton onPress={handleCancel} label="Cancelar" />

          {currentStep > 1 && <MyButton onPress={handlePrevious} label="Anterior" />}
        </View>

        <MyButton onPress={handleNext} label={currentStep === totalSteps ? "Finalizar" : "Siguiente"} />
      </View>
    </>
  );
}
