import { useBusinessFinalSale } from "hooks/api/useBusinessFinalSale";
import { MachineModel } from "models/api/machine.model";
import { useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import MachineItem from "./_components/machineItem";
import SelectionControls from "./_components/selectionControls";
import useColors from "hooks/useColors";

export default function MachinesSelection() {
  const business = useBusinessStore((state) => state.business);
  const { machinesAlreadySelected } = useBusinessFinalSale();
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
    <View className="flex-1">
      <SelectionControls machines={activeMachines} />

      <View className="flex-1">
        <FlatList
          data={activeMachines}
          keyExtractor={(item: MachineModel) => item.id?.toString() ?? item.name}
          renderItem={({ item }) => <MachineItem machine={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-4">
              <Text style={{ color: defaultColors.text }} className="text-center">
                No hay máquinas activas disponibles
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}
