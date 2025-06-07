import { Feather } from "@expo/vector-icons";
import MyButton from "components/ui/MyButton";
import { MyModal } from "components/ui/modals/myModal";
import { useMachineFinalSaleStore } from "features/sales/current_day/store/useMachineFinalSale.store";
import { useMachineStateFinalSaleStore } from "features/sales/current_day/store/useMachineStateFinalSale.store";
import useColors from "hooks/useColors";
import { MachineModel } from "models/api/machine.model";
import { MachineStateModel } from "models/api/machineState.model";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { formatCurrency } from "utilities/formatters";

interface MachineStateModalProps {
  readonly isVisible: boolean;
  readonly onClose: () => void;
}

export function MachineStateModal({ isVisible, onClose }: MachineStateModalProps) {
  const defaultColors = useColors();
  const { selectedMachines } = useMachineFinalSaleStore();
  const { selectedMachineStates, addMachineState, deleteMachineState } = useMachineStateFinalSaleStore();

  // Local state to track fund values for each machine
  const [machineFunds, setMachineFunds] = useState<Record<number, string>>({});

  // Handle fund input change for a specific machine
  function handleFundChange(machineId: number, value: string) {
    setMachineFunds({
      ...machineFunds,
      [machineId]: value.replace(/\D/g, "")
    });
  }

  // Save machine state for a specific machine
  function saveMachineState(machine: MachineModel) {
    if (machine.id === undefined) return;

    const fundValue = Number(machineFunds[machine.id] ?? 0);

    // Check if there's already a state for this machine
    const existingState = selectedMachineStates.find((state) => state.machine.id === machine.id);

    if (existingState) {
      // Update existing state
      const updatedState: MachineStateModel = {
        ...existingState,
        fund: fundValue
      };

      // Remove old state and add updated one
      deleteMachineState(existingState);
      addMachineState(updatedState);
    } else {
      // Create new state
      const newState: MachineStateModel = {
        machine: machine,
        fund: fundValue,
        date: new Date()
      };

      addMachineState(newState);
    }
  }

  // Get current fund value for a machine
  function getCurrentFund(machineId: number | undefined): string {
    if (machineId === undefined) return "";

    // First check local state
    if (machineFunds[machineId] !== undefined) {
      return machineFunds[machineId];
    }

    // Then check if there's a saved state
    const existingState = selectedMachineStates.find((state) => state.machine.id === machineId);

    if (existingState) {
      return existingState.fund.toString();
    }

    return "";
  }

  // Check if a machine has a state saved
  function hasMachineState(machineId: number | undefined): boolean {
    if (machineId === undefined) return false;
    return selectedMachineStates.some((state) => state.machine.id === machineId);
  }

  // Save all machine states and close modal
  function handleSaveAll() {
    selectedMachines.forEach((machine) => {
      if (machine.id !== undefined && machineFunds[machine.id]) {
        saveMachineState(machine);
      }
    });

    onClose();
  }

  return (
    <MyModal isVisible={isVisible} onClose={onClose} title="Agregar fondos a máquinas">
      <View className="py-2">
        <Text style={{ color: defaultColors.text }} className="mb-4">
          Ingrese el fondo para cada máquina seleccionada:
        </Text>

        <FlatList
          data={selectedMachines}
          keyExtractor={(item) => item.id?.toString() ?? ""}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <View className="flex-1">
                <Text style={{ color: defaultColors.text }} className="font-medium">
                  {item.name}
                </Text>
                {hasMachineState(item.id) && (
                  <Text style={{ color: defaultColors.textSecondary }} className="text-xs">
                    Fondo: {formatCurrency(Number(getCurrentFund(item.id)))}
                  </Text>
                )}
              </View>

              <View className="flex-row items-center">
                <TextInput
                  style={{
                    color: defaultColors.text,
                    borderColor: defaultColors.textSecondary,
                    backgroundColor: defaultColors.background
                  }}
                  className="border rounded-md px-3 py-2 w-24 text-right"
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={defaultColors.textSecondary}
                  value={getCurrentFund(item.id)}
                  onChangeText={(value) => item.id !== undefined && handleFundChange(item.id, value)}
                />

                <Pressable
                  onPress={() => saveMachineState(item)}
                  className="ml-2 p-2 rounded-full bg-primary-light"
                  accessibilityLabel="Guardar fondo para esta máquina"
                  accessibilityRole="button"
                >
                  <Feather name="check" size={16} color="#fff" />
                </Pressable>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View className="py-4 items-center">
              <Text style={{ color: defaultColors.textSecondary }}>No hay máquinas seleccionadas</Text>
            </View>
          }
        />
      </View>

      <View className="flex-row justify-end mt-4">
        <MyButton label="Guardar" onPress={handleSaveAll} />
      </View>
    </MyModal>
  );
}
