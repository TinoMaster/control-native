import { Href } from "expo-router";
import { create } from "zustand";

interface NavigationState {
  history: Href[];
  previousPath: Href | null;
  currentPath: Href | null;
  addPath: (path: Href) => void;
}

export const navigationStore = create<NavigationState>((set, get) => ({
  history: [],
  previousPath: null,
  currentPath: null,
  addPath: (path: Href) => {
    const currentHistory = get().history;
    const newHistory = [...currentHistory, path].slice(-5);
    set({
      history: newHistory,
      previousPath: get().currentPath,
      currentPath: path
    });
  }
}));
