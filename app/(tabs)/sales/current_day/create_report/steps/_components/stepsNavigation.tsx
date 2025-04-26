import { MessageModal } from "components/ui/modals/messageModal";
import MyButton from "components/ui/MyButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { useDailyReportStore } from "store/dailyReport.store";

const toShowInModal = (step: number) => {
  switch (step) {
    case 1:
      return { title: "Detalles del Reporte", message: "Por favor, completa los detalles del reporte" };
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
  const router = useRouter();
  const isStepCompleted = useDailyReportStore((state) => state.isStepCompleted);
  const [showModal, setShowModal] = useState(false);

  function handleNext() {
    if (isStepCompleted(currentStep)) {
      handleNextStep();
    } else {
      setShowModal(true);
    }
  }

  function handlePrevious() {
    handlePreviousStep();
  }

  function handleCancel() {
    router.back();
  }

  const { title, message } = toShowInModal(currentStep);

  return (
    <>
      <MessageModal isVisible={showModal} onClose={() => setShowModal(false)} title={title} message={message} />
      <View className="flex-row justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <View className="flex-row space-x-2">
          <MyButton onPress={handleCancel} label="Cancelar" />

          {currentStep > 1 && <MyButton onPress={handlePrevious} label="Anterior" />}
        </View>

        <MyButton onPress={handleNext} label={currentStep === totalSteps ? "Finalizar" : "Siguiente"} />
      </View>
    </>
  );
}
