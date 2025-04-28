import MyButton from "components/ui/MyButton";
import { useMachineSelectionStore } from "features/sales/store/useMachineSelectorStore";
import useColors from "hooks/useColors";
import { MachineModel } from "models/api/machine.model";
import { useCallback } from "react";
import { Text, View } from "react-native";

export function SelectionControls({ machines }: Readonly<{ machines: MachineModel[] | undefined }>) {
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
        <MyButton onPress={handleSelectAll} label={allSelected ? "Deseleccionar todas" : "Seleccionar todas"} />
      </View>
      <View className="mt-1">
        <Text style={{ color: defaultColors.textSecondary }} className="text-xs">
          Máquinas seleccionadas: {selectedMachines.length}
        </Text>
      </View>
    </View>
  );
}
