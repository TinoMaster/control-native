import { Text, View } from "react-native";

export function Step1Details() {
  return (
    <View className="p-4 space-y-4">
      <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">Paso 1: Detalles Principales</Text>

      {/* Placeholder for Total Collected Input */}
      <View className="p-3 border border-gray-300 dark:border-gray-600 rounded-md">
        <Text className="text-gray-600 dark:text-gray-400">Campo para: Total Recaudado</Text>
      </View>

      {/* Placeholder for Cash Fund Left Input */}
      <View className="p-3 border border-gray-300 dark:border-gray-600 rounded-md">
        <Text className="text-gray-600 dark:text-gray-400">Campo para: Fondo Dejado</Text>
      </View>

      {/* Placeholder for Workers Selection */}
      <View className="p-3 border border-gray-300 dark:border-gray-600 rounded-md">
        <Text className="text-gray-600 dark:text-gray-400">Campo para: Trabajadores Participantes</Text>
      </View>
    </View>
  );
}
