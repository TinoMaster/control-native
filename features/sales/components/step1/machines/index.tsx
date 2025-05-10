import { SelectionControls } from "features/sales/components/step1/machines/selectionControls";
import { QueryTypeBusinessFinalSale, useBusinessFinalSale } from "hooks/api/useBusinessFinalSale";
import useColors from "hooks/useColors";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import { MachineItem } from "./machineItem";

export function MachinesSelection() {
  const business = useBusinessStore((state) => state.business);
  const { machinesAlreadySelected } = useBusinessFinalSale(QueryTypeBusinessFinalSale.DAILY);
  const { machines } = business;
  const defaultColors = useColors();

  /* Seleccionar solo las maquinas activas y que no estén ya seleccionadas en un reporte del mismo dia */
  const activeMachines = useMemo(() => {
    const selectedMachineIds = machinesAlreadySelected ? machinesAlreadySelected() : undefined;
    return (
      machines
        ?.filter((machine) => (selectedMachineIds ? !selectedMachineIds.includes(machine.id) : true))
        .filter((machine) => machine.active) || []
    );
  }, [machines, machinesAlreadySelected]);

  if (!machines || machines.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text style={{ color: defaultColors.text }} className="text-center">
          No hay máquinas disponibles para seleccionar
        </Text>
      </View>
    );
  }

  return (
    <View>
      <SelectionControls machines={activeMachines} />

      {activeMachines.length > 0 ? (
        <View className="flex-1 pb-4">
          {activeMachines.map((machine) => (
            <MachineItem key={machine.id} machine={machine} />
          ))}
        </View>
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text style={{ color: defaultColors.text }} className="text-center">
            No hay máquinas activas disponibles
          </Text>
        </View>
      )}
    </View>
  );
}
