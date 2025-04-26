import { BusinessFinalSaleModel, CardPayment } from "models/api/businessFinalSale.model";
import { MachineModel } from "models/api/machine.model";
import { create } from "zustand";

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
  setFound: (found: number) => void;
  setMachines: (machines: MachineModel[]) => void;
}

export const useDailyReportStore = create<DailyReportState>((set, get) => ({
  totalSteps: 3,
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
  setFound: (found: number) => {
    set((state) => ({
      report: {
        ...state.report,
        found: found
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
  }
}));
