import { EmployeeModel } from "models/api/employee.model";
import { useDailyReportStore } from "store/dailyReport.store";
import { create } from "zustand";

interface WorkerSelectionState {
  selectedWorkers: EmployeeModel[];
  toggleWorker: (worker: EmployeeModel) => void;
  selectAll: (workers: EmployeeModel[]) => void;
  clearAll: () => void;
  isSelected: (worker: EmployeeModel) => boolean;
}

export const useWorkersSelectorStore = create<WorkerSelectionState>((set, get) => ({
  selectedWorkers: [],
  toggleWorker: (worker) => {
    let updatedSelectedWorkers: EmployeeModel[] = [];

    set((state) => {
      const isAlreadySelected = state.selectedWorkers.some((w) => w.id === worker.id);

      updatedSelectedWorkers = isAlreadySelected
        ? state.selectedWorkers.filter((w) => w.id !== worker.id) // Calcula la nueva lista si se deselecciona
        : [...state.selectedWorkers, worker]; // Calcula la nueva lista si se selecciona

      return {
        selectedWorkers: updatedSelectedWorkers // Actualiza el estado con la nueva lista
      };
    });

    // Actualiza el reporte general con los trabajadores seleccionados
    useDailyReportStore.getState().setWorkers(updatedSelectedWorkers);
  },
  selectAll: (workers) => {
    set({
      selectedWorkers: [...workers]
    });
    useDailyReportStore.getState().setWorkers(workers);
  },
  clearAll: () => {
    set({
      selectedWorkers: []
    });
    useDailyReportStore.getState().setWorkers([]);
  },
  isSelected: (worker) => {
    return get().selectedWorkers.some((w) => w.id === worker.id);
  }
}));
