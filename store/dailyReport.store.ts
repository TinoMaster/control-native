import { BusinessFinalSaleModel, CardPayment } from "models/api/businessFinalSale.model";
import { DebtModel } from "models/api/debt.model";
import { EmployeeModel } from "models/api/employee.model";
import { MachineModel } from "models/api/machine.model";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { create } from "zustand";

function checkStep1Completion(report: BusinessFinalSaleModel): boolean {
  // Chequeo para validar que el paso 1
  const isTotalValid = Boolean(report.total) && typeof report.total === "number" && report.total > 0;
  const isFundValid = Boolean(report.fund) && typeof report.fund === "number" && report.fund > 0;
  const atLeastOneMachineSelected = Array.isArray(report.machines) && report.machines.length > 0;
  const atLeastOneWorkerSelected = Array.isArray(report.workers) && report.workers.length > 0;
  return isTotalValid && isFundValid && atLeastOneMachineSelected && atLeastOneWorkerSelected;
}
function checkStep2Completion(): boolean {
  return true;
}
function checkStep3Completion(): boolean {
  return true;
}

interface DailyReportState {
  /* states */
  totalSteps: number;
  currentStep: number;
  report: BusinessFinalSaleModel;
  cards: CardPayment[];

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
  isStepCompleted: (step: number) => boolean;
}

export const useDailyReportStore = create<DailyReportState>((set, get) => ({
  totalSteps: 5,
  currentStep: 1,
  report: {} as BusinessFinalSaleModel,
  cards: [],

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
  isStepCompleted: (step: number): boolean => {
    const { report, cards } = get();
    console.log("report", report);
    console.log("cards", cards); // Get current state dynamically
    switch (step) {
      case 1:
        return checkStep1Completion(report);
      case 2:
        return checkStep2Completion();
      case 3:
        return checkStep3Completion();
      default:
        console.warn(`isStepCompleted called for unknown step: ${step}`);
        return false;
    }
  }
}));
