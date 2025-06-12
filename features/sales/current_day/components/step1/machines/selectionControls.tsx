import MyButton from "components/ui/MyButton";
import { useMachineFinalSaleStore } from "features/sales/current_day/store/useMachineFinalSale.store";
import { MachineModel } from "models/api/machine.model";
import { useCallback } from "react";
import { Text, View } from "react-native";
import colors from "styles/colors";

export function SelectionControls({ machines }: Readonly<{ machines: MachineModel[] | undefined }>) {
  const { selectedMachines, selectAll, clearAll } = useMachineFinalSaleStore();
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
        <Text style={{ color: colors.darkMode.text.light }} className="text-lg font-semibold">
          Seleccionar máquinas
        </Text>
        <MyButton onPress={handleSelectAll} label={allSelected ? "Deseleccionar todas" : "Seleccionar todas"} />
      </View>
      <View className="mt-1">
        <Text style={{ color: colors.darkMode.textSecondary.light }} className="text-xs">
          Máquinas seleccionadas: {selectedMachines.length}
        </Text>
      </View>
    </View>
  );
}
