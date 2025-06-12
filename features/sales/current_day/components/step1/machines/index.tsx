import { MyView } from "components/ui/MyView";
import { SelectionControls } from "features/sales/current_day/components/step1/machines/selectionControls";
import { useDailySales } from "hooks/api/useDailySales";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { getActiveMachines } from "utilities/helpers/machines.utils";
import { MachineItem } from "./machineItem";

export function MachinesSelection() {
  const business = useBusinessStore((state) => state.business);
  const { machinesAlreadySelected } = useDailySales();
  const { machines } = business;

  /* Seleccionar solo las maquinas activas y que no estén ya seleccionadas en un reporte del mismo dia */
  const activeMachines = useMemo(() => {
    return getActiveMachines(machines, machinesAlreadySelected?.());
  }, [machines, machinesAlreadySelected]);

  if (!machines || machines.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text style={{ color: colors.darkMode.text.light }} className="text-center">
          No hay máquinas disponibles para seleccionar
        </Text>
      </View>
    );
  }

  return (
    <MyView>
      <SelectionControls machines={activeMachines} />

      {activeMachines.length > 0 ? (
        <View className="flex-1 pb-4">
          {activeMachines.map((machine) => (
            <MachineItem key={machine.id} machine={machine} />
          ))}
        </View>
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text style={{ color: colors.darkMode.text.light }} className="text-center">
            No hay máquinas activas disponibles
          </Text>
        </View>
      )}
    </MyView>
  );
}
