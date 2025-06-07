import { DebtModel } from "models/api/debt.model";
import { useDailyReportStore } from "features/sales/current_day/store/dailyReport.store";
import { create } from "zustand";

interface DebtsSectionState {
  debts: DebtModel[];
  deleteDebt: (debt: DebtModel) => void;
  addDebt: (debt: DebtModel) => void;
  addDebts: (debts: DebtModel[]) => void;
  clearDebts: () => void;
}

export const useDebtsFinalSaleStore = create<DebtsSectionState>((set, get) => ({
  debts: [],
  deleteDebt: (debt) => {
    const updatedDebts = get().debts.filter((d) => d.id !== debt.id);
    set((state) => ({
      debts: updatedDebts
    }));

    useDailyReportStore.getState().setDebts(updatedDebts);
  },
  addDebt: (debt) => {
    const updatedDebts = get().debts.concat(debt);
    const newSet = new Set(updatedDebts);
    const updatedDebtsUnique = Array.from(newSet);
    set((state) => ({
      debts: updatedDebtsUnique
    }));

    useDailyReportStore.getState().setDebts(updatedDebts);
  },
  addDebts: (debts) => {
    const updatedDebts = get().debts.concat(debts);
    const newSet = new Set(updatedDebts);
    const updatedDebtsUnique = Array.from(newSet);
    set((state) => ({
      debts: updatedDebtsUnique
    }));

    useDailyReportStore.getState().setDebts(updatedDebtsUnique);
  },
  clearDebts: () => {
    set((state) => {
      return {
        debts: []
      };
    });
  }
}));
