import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { secureStorage } from "../utilities/storage/secure-storage";

type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

/**
 * Adaptador de storage para usar secureStorage con Zustand
 * Con manejo de errores mejorado para entornos web
 */
const secureStorageAdapter = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await secureStorage.getItem(name);
    } catch (error) {
      console.warn("Error al obtener tema desde storage:", error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await secureStorage.setItem(name, value);
    } catch (error) {
      console.warn("Error al guardar tema en storage:", error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await secureStorage.removeItem(name);
    } catch (error) {
      console.warn("Error al eliminar tema del storage:", error);
    }
  }
};

// Configuración base del store
const baseThemeStore = (set: (fn: (state: ThemeState) => Partial<ThemeState>) => void) => ({
  isDarkMode: true,
  toggleTheme: () => set((state: ThemeState) => ({ isDarkMode: !state.isDarkMode }))
});

/**
 * Store para el manejo del tema de la aplicación usando Zustand
 * No requiere un provider como el contexto de React
 * Usa persistencia solo cuando es seguro hacerlo
 */
export const useThemeStore = create<ThemeState>()(
  Platform.OS === "web"
    ? // En web, verificamos si estamos en un entorno SSR (Server-Side Rendering)
      typeof window === "undefined"
      ? baseThemeStore // Si estamos en SSR, no usamos persistencia
      : persist(baseThemeStore, {
          name: "theme-storage",
          storage: createJSONStorage(() => secureStorageAdapter),
          // Opciones para manejar errores de storage
          onRehydrateStorage: () => (state) => {
            if (state) {
              console.log("Estado del tema restaurado correctamente");
            } else {
              console.warn("Error al restaurar el estado del tema");
            }
          }
        })
    : // En dispositivos móviles, usamos persistencia normalmente
      persist(baseThemeStore, {
        name: "theme-storage",
        storage: createJSONStorage(() => secureStorageAdapter)
      })
);
