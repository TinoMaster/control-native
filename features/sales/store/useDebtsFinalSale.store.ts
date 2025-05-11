import { DebtModel } from "models/api/debt.model";
import { useDailyReportStore } from "features/sales/store/dailyReport.store";
import { create } from "zustand";

interface DebtsSectionState {
  debts: DebtModel[];
  deleteDebt: (debt: DebtModel) => void;
  addDebt: (debt: DebtModel) => void;
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
    set((state) => ({
      debts: updatedDebts
    }));

    useDailyReportStore.getState().setDebts(updatedDebts);
  },
  clearDebts: () => {
    set((state) => {
      return {
        debts: []
      };
    });
  }
}));
