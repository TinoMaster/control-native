import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { Text, View } from "react-native";
import { filterEmployeesReadyToWork } from "utilities/helpers/globals.helpers";
import { SelectionControls } from "./selectionControls";
import { WorkerItem } from "./workerItem";

export function Workers() {
  const { employees } = useEmployees();
  const defaultColors = useColors();

  const employeesReadyToWork = filterEmployeesReadyToWork(employees);

  if (!employeesReadyToWork || employeesReadyToWork.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text style={{ color: defaultColors.text }} className="text-center">
          No hay trabajadores disponibles para seleccionar
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <SelectionControls workers={employeesReadyToWork} />

      {employeesReadyToWork.length > 0 ? (
        <View className="flex-1 pb-4">
          {employeesReadyToWork.map((employee) => (
            <WorkerItem key={employee.id} worker={employee} />
          ))}
        </View>
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text style={{ color: defaultColors.text }} className="text-center">
            No hay trabajadores disponibles
          </Text>
        </View>
      )}
    </View>
  );
}
