import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { secureStorage } from "../utilities/storage/secure-storage";

type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

/**
 * Adaptador de storage para usar secureStorage con Zustand
 */
const secureStorageAdapter = {
  getItem: async (name: string): Promise<string | null> => {
    return secureStorage.getItem(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await secureStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await secureStorage.removeItem(name);
  }
};

/**
 * Store para el manejo del tema de la aplicación usando Zustand
 * No requiere un provider como el contexto de React
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: true,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode }))
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => secureStorageAdapter)
    }
  )
);
