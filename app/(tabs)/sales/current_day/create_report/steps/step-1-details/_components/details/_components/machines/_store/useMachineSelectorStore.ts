import { MachineModel } from "models/api/machine.model";
import { create } from "zustand";

interface MachineSelectionState {
  selectedMachines: MachineModel[];
  toggleMachine: (machine: MachineModel) => void;
  selectAll: (machines: MachineModel[]) => void;
  clearAll: () => void;
  isSelected: (machine: MachineModel) => boolean;
}

export const useMachineSelectionStore = create<MachineSelectionState>((set, get) => ({
  selectedMachines: [],
  toggleMachine: (machine) => {
    set((state) => {
      const isAlreadySelected = state.selectedMachines.some((m) => m.id === machine.id);

      return {
        selectedMachines: isAlreadySelected
          ? state.selectedMachines.filter((m) => m.id !== machine.id)
          : [...state.selectedMachines, machine]
      };
    });
  },
  selectAll: (machines) => set({ selectedMachines: [...machines] }),
  clearAll: () => set({ selectedMachines: [] }),
  isSelected: (machine) => {
    return get().selectedMachines.some((m) => m.id === machine.id);
  }
}));
