import { MachineModel } from "models/api/machine.model";
import { useDailyReportStore } from "store/dailyReport.store";
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
    // Variable para guardar el resultado del cambio
    let updatedSelectedMachines: MachineModel[] = [];

    set((state) => {
      const isAlreadySelected = state.selectedMachines.some((m) => m.id === machine.id);

      updatedSelectedMachines = isAlreadySelected
        ? state.selectedMachines.filter((m) => m.id !== machine.id) // Calcula la nueva lista si se deselecciona
        : [...state.selectedMachines, machine]; // Calcula la nueva lista si se selecciona

      return {
        selectedMachines: updatedSelectedMachines // Actualiza el estado con la nueva lista
      };
    });

    // Actualiza el reporte general con las máquinas seleccionadas
    useDailyReportStore.getState().setMachines(updatedSelectedMachines);
  },
  selectAll: (machines) => {
    // Actualiza el estado de esta store (la pequeña)
    set({ selectedMachines: [...machines] });

    // 2. Justo después, llama a la acción de la store grande
    //    pasándole la lista completa que recibimos ('machines').
    useDailyReportStore.getState().setMachines(machines);
  },
  clearAll: () => {
    // Actualiza el estado de esta store (la pequeña)
    set({ selectedMachines: [] });

    // 2. Justo después, llama a la acción de la store grande
    //    pasándole una lista vacía.
    useDailyReportStore.getState().setMachines([]);
  },
  isSelected: (machine) => {
    return get().selectedMachines.some((m) => m.id === machine.id);
  }
}));
