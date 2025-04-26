import { MachineModel } from "models/api/machine.model";
import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { useMachineSelectionStore } from "../_store/useMachineSelectorStore";
import useColors from "hooks/useColors";

export default function SelectionControls({ machines }: Readonly<{ machines: MachineModel[] | undefined }>) {
  const defaultColors = useColors();
  const { selectedMachines, selectAll, clearAll } = useMachineSelectionStore();
  const allSelected = machines?.length === selectedMachines.length && machines?.length > 0;

  const handleSelectAll = useCallback(() => {
    if (machines) {
      if (allSelected) {
        clearAll();
      } else {
        selectAll(machines);
      }
    }
  }, [machines, allSelected, clearAll, selectAll]);

  return (
    <View className="mb-4 px-1">
      <View className="flex-row justify-between items-center">
        <Text style={{ color: defaultColors.text }} className="text-lg font-semibold">
          Seleccionar máquinas
        </Text>
        <Pressable
          style={{ backgroundColor: defaultColors.primary }}
          onPress={handleSelectAll}
          className="py-2 px-3 rounded-lg"
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${allSelected ? "Deseleccionar" : "Seleccionar"} todas las máquinas`}
        >
          <Text className="text-sm font-medium text-white">
            {allSelected ? "Deseleccionar todas" : "Seleccionar todas"}
          </Text>
        </Pressable>
      </View>
      <View className="mt-1">
        <Text style={{ color: defaultColors.text }} className="text-xs">
          Máquinas seleccionadas: {selectedMachines.length}
        </Text>
      </View>
    </View>
  );
}
