import { MachineStateModel } from "models/api/machineState.model";
import { useDailyReportStore } from "features/sales/current_day/store/dailyReport.store";
import { create } from "zustand";

interface MachineStateSelectionState {
  selectedMachineStates: MachineStateModel[];
  addMachineState: (machineState: MachineStateModel) => void;
  deleteMachineState: (machineState: MachineStateModel) => void;
  clearAll: () => void;
  clearMachineStates: () => void;
}

export const useMachineStateFinalSaleStore = create<MachineStateSelectionState>((set, get) => ({
  selectedMachineStates: [],
  addMachineState: (machineState) => {
    const updatedMachineStates = get().selectedMachineStates.concat(machineState);
    set((state) => ({
      selectedMachineStates: updatedMachineStates
    }));

    useDailyReportStore.getState().setMachineStates(updatedMachineStates);
  },
  deleteMachineState: (machineState) => {
    const updatedMachineStates = get().selectedMachineStates.filter((ms) => ms.id !== machineState.id);
    set((state) => ({
      selectedMachineStates: updatedMachineStates
    }));

    useDailyReportStore.getState().setMachineStates(updatedMachineStates);
  },
  clearAll: () => {
    set({
      selectedMachineStates: []
    });

    useDailyReportStore.getState().setMachineStates([]);
  },
  clearMachineStates: () => {
    set({
      selectedMachineStates: []
    });
  }
}));
