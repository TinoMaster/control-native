import { MyCard } from "components/ui/MyCard";
import { useRouter } from "expo-router";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { Text, TouchableOpacity, View } from "react-native";

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
    <MyCard title="Máquinas" iconTitle="hardware-chip-outline" iconButton="add" onPressIcon={handleViewMachines}>
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

        {(business?.machines?.length ?? 0) > 3 && (
          <TouchableOpacity onPress={handleViewMachines} className="py-3 items-center">
            <Text style={{ color: defaultColors.primary }} className="text-sm font-medium">
              Ver todas las máquinas
            </Text>
          </TouchableOpacity>
        )}

        {!(business?.machines?.length ?? 0) && (
          <Text style={{ color: defaultColors.textSecondary, textAlign: "center" }} className="text-base">
            No tienes máquinas registradas
          </Text>
        )}
      </View>
    </MyCard>
  );
}
