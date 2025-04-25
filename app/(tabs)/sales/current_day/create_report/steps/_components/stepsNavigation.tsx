import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useDailyReportStore } from "store/dailyReport.store";

export function StepsNavigation() {
  const currentStep = useDailyReportStore((state) => state.currentStep);
  const totalSteps = useDailyReportStore((state) => state.totalSteps);
  const handleNextStep = useDailyReportStore((state) => state.handleNextStep);
  const handlePreviousStep = useDailyReportStore((state) => state.handlePreviousStep);
  const router = useRouter();

  function handleNext() {
    if (currentStep < totalSteps) {
      handleNextStep();
    }
  }

  function handlePrevious() {
    handlePreviousStep();
  }

  function handleCancel() {
    router.back();
  }
  return (
    <View className="flex-row justify-between p-4 border-t border-gray-200 dark:border-gray-700">
      <View className="flex-row space-x-2">
        <TouchableOpacity onPress={handleCancel} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md">
          <Text className="text-gray-800 dark:text-gray-100">Cancelar</Text>
        </TouchableOpacity>

        {currentStep > 1 && (
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-700 rounded-md"
          >
            <Text className="text-white">Anterior</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={handleNext} className="px-4 py-2 bg-blue-500 dark:bg-blue-700 rounded-md">
        <Text className="text-white">{currentStep === totalSteps ? "Finalizar" : "Siguiente"}</Text>
      </TouchableOpacity>
    </View>
  );
}
