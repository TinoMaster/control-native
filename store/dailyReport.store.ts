import { BusinessFinalSaleModel, CardPayment } from "models/api/businessFinalSale.model";
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
  }
}));
