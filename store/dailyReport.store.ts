import { BusinessFinalSaleModel, CardPayment } from "models/api/businessFinalSale.model";
import { DebtModel } from "models/api/debt.model";
import { EmployeeModel } from "models/api/employee.model";
import { MachineModel } from "models/api/machine.model";
import { MachineStateModel } from "models/api/machineState.model";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { create } from "zustand";

function checkIfMachineStatesAreValid(machineStates: MachineStateModel[]): boolean {
  console.log("machineStates", machineStates);
  return machineStates.length > 0 && machineStates.every((ms) => ms.fund > 0);
}

function checkStep1Completion(report: BusinessFinalSaleModel, machineStates: MachineStateModel[]): boolean {
  // Chequeo para validar que el paso 1
  const isTotalValid = Boolean(report.total) && typeof report.total === "number" && report.total > 0;
  const atLeastOneMachineSelected = Array.isArray(report.machines) && report.machines.length > 0;
  const atLeastOneWorkerSelected = Array.isArray(report.workers) && report.workers.length > 0;
  const areMachineStatesValid = checkIfMachineStatesAreValid(machineStates);
  console.log("areMachineStatesValid", areMachineStatesValid);
  return isTotalValid && atLeastOneMachineSelected && atLeastOneWorkerSelected && areMachineStatesValid;
}
function checkStep2Completion(): boolean {
  return true;
}
function checkStep3Completion(): boolean {
  return true;
}
function checkStep4Completion(): boolean {
  return true;
}

interface DailyReportState {
  /* states */
  totalSteps: number;
  currentStep: number;
  report: BusinessFinalSaleModel;
  cards: CardPayment[];
  machineStates: MachineStateModel[];

  /* actions */
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  setCards: (cards: CardPayment[]) => void;
  setTotal: (total: number) => void;
  setFund: (fund: number) => void;
  setMachines: (machines: MachineModel[]) => void;
  setWorkers: (workers: EmployeeModel[]) => void;
  setDebts: (debts: DebtModel[]) => void;
  setServicesSales: (servicesSales: ServiceSaleModel[]) => void;
  setNote: (note: string) => void;
  setMachineStates: (machineStates: MachineStateModel[]) => void;
  clearReport: () => void;
  isStepCompleted: (step: number) => boolean;
}

export const useDailyReportStore = create<DailyReportState>((set, get) => ({
  totalSteps: 5,
  currentStep: 1,
  report: {} as BusinessFinalSaleModel,
  cards: [],
  machineStates: [],

  /* actions */
  handleNextStep: () => {
    set((state) => ({
      currentStep: state.currentStep + 1
    }));
  },
  handlePreviousStep: () => {
    set((state) => ({
      currentStep: state.currentStep - 1
    }));
  },
  setCards: (cards: CardPayment[]) => {
    set((state) => ({
      cards: cards
    }));
  },
  setTotal: (total: number) => {
    set((state) => ({
      report: {
        ...state.report,
        total: total
      }
    }));
  },
  setFund: (fund: number) => {
    set((state) => ({
      report: {
        ...state.report,
        fund: fund
      }
    }));
  },
  setMachines: (machines: MachineModel[]) => {
    set((state) => {
      const machineIds: number[] = machines.map((machine) => machine.id!);
      return {
        report: {
          ...state.report,
          machines: machineIds
        }
      };
    });
  },
  setWorkers: (workers: EmployeeModel[]) => {
    set((state) => {
      return {
        report: {
          ...state.report,
          workers: workers
        }
      };
    });
  },
  setDebts: (debts: DebtModel[]) => {
    set((state) => {
      return {
        report: {
          ...state.report,
          debts: debts
        }
      };
    });
  },
  setServicesSales: (servicesSales: ServiceSaleModel[]) => {
    set((state) => {
      return {
        report: {
          ...state.report,
          servicesSales: servicesSales
        }
      };
    });
  },
  setNote: (note: string) => {
    set((state) => {
      return {
        report: {
          ...state.report,
          note: note
        }
      };
    });
  },
  setMachineStates: (machineStates: MachineStateModel[]) => {
    const totalFund = machineStates.reduce((total, machineState) => total + machineState.fund, 0);
    set((state) => {
      return {
        machineStates: machineStates,
        report: {
          ...state.report,
          fund: totalFund
        }
      };
    });
  },
  clearReport: () => {
    set((state) => {
      return {
        report: {} as BusinessFinalSaleModel,
        cards: [],
        machineStates: [],
        currentStep: 1
      };
    });
  },
  isStepCompleted: (step: number): boolean => {
    const { report, machineStates } = get();
    switch (step) {
      case 1:
        return checkStep1Completion(report, machineStates);
      case 2:
        return checkStep2Completion();
      case 3:
        return checkStep3Completion();
      case 4:
        return checkStep4Completion();
      default:
        console.warn(`isStepCompleted called for unknown step: ${step}`);
        return false;
    }
  }
}));
