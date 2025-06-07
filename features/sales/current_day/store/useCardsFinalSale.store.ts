import { CardPayment } from "models/api/businessFinalSale.model";
import { useDailyReportStore } from "features/sales/current_day/store/dailyReport.store";
import { create } from "zustand";

interface CardsFinalSaleState {
  cards: CardPayment[];
  deleteCard: (card: CardPayment) => void;
  addCard: (card: CardPayment) => void;
  clearCards: () => void;
}

export const useCardsFinalSaleStore = create<CardsFinalSaleState>((set, get) => ({
  cards: [],
  deleteCard: (card) => {
    const updatedCards = get().cards.filter((c) => c.id !== card.id);
    set((state) => ({
      cards: updatedCards
    }));

    useDailyReportStore.getState().setCards(updatedCards);
  },
  addCard: (card) => {
    const updatedCards = get().cards.concat(card);
    set((state) => ({
      cards: updatedCards
    }));

    useDailyReportStore.getState().setCards(updatedCards);
  },
  clearCards: () => {
    set((state) => {
      return {
        cards: []
      };
    });
  }
}));
