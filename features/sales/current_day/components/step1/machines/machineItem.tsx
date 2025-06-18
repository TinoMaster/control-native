import { Feather } from "@expo/vector-icons";
import { useThemeStore } from "contexts/ThemeContext";
import { BlurView } from "expo-blur";
import { MachineStateModal } from "features/sales/current_day/components/step1/machines/MachineStateModal";
import { useMachineStateModal } from "features/sales/current_day/hooks/useMachineStateModal";
import { useMachineFinalSaleStore } from "features/sales/current_day/store/useMachineFinalSale.store";
import { useMachineStateFinalSaleStore } from "features/sales/current_day/store/useMachineStateFinalSale.store";
import useColors from "hooks/useColors";
import { MachineModel } from "models/api/machine.model";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { formatCurrency } from "utilities/formatters";

export function MachineItem({ machine }: Readonly<{ machine: MachineModel }>) {
  const { isSelected, toggleMachine } = useMachineFinalSaleStore();
  const { selectedMachineStates, deleteMachineState } = useMachineStateFinalSaleStore();
  const { isModalVisible, openModal, closeModal } = useMachineStateModal();
  const isActive = isSelected(machine);
  const defaultColors = useColors();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Check if this machine has a state with fund
  const machineState = selectedMachineStates.find((state) => state.machine.id === machine.id);
  const hasFund = machineState !== undefined;

  const toggleMachineState = () => {
    toggleMachine(machine);

    if (isActive) {
      deleteMachineState(machineState!);
    } else {
      openModal();
    }
  };

  return (
    <Animated.View entering={FadeIn.duration(300)} className="mx-1 my-1">
      <Pressable
        onPress={toggleMachineState}
        className={`p-3 rounded-xl border overflow-hidden ${
          isActive ? "border-primary-light" : "border-gray-400"
        }`}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }]
          }
        ]}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${machine.name} ${isActive ? "selected" : "not selected"}`}
        accessibilityState={{ selected: isActive }}
      >
        {isActive && (
          <BlurView
            intensity={20}
            className="absolute top-0 left-0 right-0 bottom-0 z-0"
            tint={isDarkMode ? "dark" : "light"}
          />
        )}
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text style={{ color: defaultColors.text }} className="text-base font-medium">
              {machine.name}
            </Text>
            <Text style={{ color: defaultColors.textSecondary }} className="text-xs">
              Fondo: {hasFund ? formatCurrency(machineState?.fund ?? 0) : ""}
            </Text>
          </View>

          <View className="flex-row items-center">
            {isActive && (
              <TouchableOpacity
                onPress={openModal}
                className="mr-2 p-2 rounded-full bg-primary-light"
                accessibilityLabel="Agregar fondo a esta máquina"
                accessibilityRole="adjustable"
              >
                <Feather name="dollar-sign" size={14} color="#fff" />
              </TouchableOpacity>
            )}

            <View
              className={`w-6 h-6 rounded-full justify-center items-center border ${
                isActive ? "bg-primary-light border-primary-dark" : "border-gray-400"
              }`}
            >
              {isActive && <Feather name="check" size={14} color="#fff" />}
            </View>
          </View>
        </View>
      </Pressable>

      {/* Modal para agregar fondos a la máquina */}
      <MachineStateModal isVisible={isModalVisible} onClose={closeModal} />
    </Animated.View>
  );
}
