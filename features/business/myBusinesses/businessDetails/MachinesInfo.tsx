import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { Text, TouchableOpacity, View } from "react-native";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

interface Props {
  readonly business: BusinessModel;
}

export function MachinesInfo({ business }: Props) {
  const defaultColors = useColors();
  const router = useRouter();
  const handleViewMachines = () => {
    router.push(`/business/my_businesses/${business.id}/machines`);
  };
  return (
    <View
      style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }}
      className="m-4 p-4 rounded-xl shadow-sm"
    >
      <TouchableOpacity onPress={handleViewMachines} className="flex-row items-center mb-4">
        <Ionicons name="hardware-chip-outline" size={24} color={defaultColors.primary} />
        <Text style={{ color: defaultColors.text }} className="text-lg font-semibold ml-2">
          Máquinas ({business?.machines?.length ?? 0})
        </Text>
        <Ionicons name="chevron-forward" size={20} color={defaultColors.primary} className="ml-auto" />
      </TouchableOpacity>

      <View className="mt-2">
        {business?.machines?.slice(0, 3).map((machine, index) => (
          <View
            key={machine.id ?? index}
            className="flex-row justify-between items-center py-3 border-b border-gray-200/20"
          >
            <View className="flex-row items-center">
              <Text style={{ color: defaultColors.text }} className="text-base mr-2">
                {machine.name}
              </Text>
              <View
                className="w-2 h-2 rounded-full ml-2"
                style={{ backgroundColor: machine.active ? "#4ADE80" : "#F87171" }}
              />
            </View>
            <Text style={{ color: machine.active ? "#4ADE80" : "#F87171" }} className="text-sm">
              {machine.active ? "Activa" : "Inactiva"}
            </Text>
          </View>
        ))}

        {business?.machines?.length && business?.machines?.length > 3 && (
          <TouchableOpacity onPress={handleViewMachines} className="py-3 items-center">
            <Text style={{ color: defaultColors.primary }} className="text-sm font-medium">
              Ver todas las máquinas
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
