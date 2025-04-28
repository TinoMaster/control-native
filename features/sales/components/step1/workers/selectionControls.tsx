import MyButton from "components/ui/MyButton";
import { useWorkersSelectorStore } from "features/sales/store/useWorkersSelectorStore";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { useCallback } from "react";
import { Text, View } from "react-native";

export function SelectionControls({ workers }: Readonly<{ workers: EmployeeModel[] | undefined }>) {
  const defaultColors = useColors();
  const { selectedWorkers, selectAll, clearAll } = useWorkersSelectorStore();
  const allSelected = workers?.length === selectedWorkers.length && workers?.length > 0;

  const handleSelectAll = useCallback(() => {
    if (workers) {
      if (allSelected) {
        clearAll();
      } else {
        selectAll(workers);
      }
    }
  }, [workers, allSelected, clearAll, selectAll]);

  return (
    <View className="mb-4 px-1">
      <View className="flex-row justify-between items-center">
        <Text style={{ color: defaultColors.text }} className="text-lg font-semibold">
          Seleccionar trabajadores
        </Text>
        <MyButton onPress={handleSelectAll} label={allSelected ? "Deseleccionar todos" : "Seleccionar todos"} />
      </View>
      <View className="mt-1">
        <Text style={{ color: defaultColors.textSecondary }} className="text-xs">
          Trabajadores seleccionados: {selectedWorkers.length}
        </Text>
      </View>
    </View>
  );
}
