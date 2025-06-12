import MyButton from "components/ui/MyButton";
import { useWorkersFinalSaleStore } from "features/sales/current_day/store/useWorkersFinalSale.store";
import { EmployeeModel } from "models/api/employee.model";
import { useCallback } from "react";
import { Text, View } from "react-native";
import colors from "styles/colors";

interface SelectionControlsProps {
  readonly workers: EmployeeModel[] | undefined;
}

export function SelectionControls({ workers }: SelectionControlsProps) {
  const { selectedWorkers, selectAll, clearAll } = useWorkersFinalSaleStore();
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
        <Text style={{ color: colors.darkMode.text.light }} className="text-lg font-semibold">
          Seleccionar trabajadores
        </Text>
        <MyButton onPress={handleSelectAll} label={allSelected ? "Deseleccionar todos" : "Seleccionar todos"} />
      </View>
      <View className="mt-1 gap-1">
        <Text style={{ color: colors.darkMode.textSecondary.light }} className="text-xs">
          Trabajadores seleccionados: {selectedWorkers.length}
        </Text>
        <Text style={{ color: colors.darkMode.textSecondary.light }} className="text-xs">
          (Nota): Solo aparecerán los trabajadores que estén disponibles para trabajar, osea que sean trabajadores
          activos y tengan un salario asignado
        </Text>
      </View>
    </View>
  );
}
