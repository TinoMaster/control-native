import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

/**
 * Abstracción de almacenamiento seguro que funciona en todas las plataformas
 * Usa SecureStore en iOS/Android y localStorage en web
 */
export const secureStorage = {
  /**
   * Guarda un valor de forma segura
   * @param key Clave para almacenar el valor
   * @param value Valor a almacenar
   */
  setItem: async (key: string, value: string): Promise<void> => {
    console.log("Guardando en localStorage:", key, value);
    console.log("Plataforma:", Platform.OS);

    if (Platform.OS === "web") {
      try {
        localStorage.setItem(key, value);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(new Error(`Error al guardar en localStorage: ${error}`));
      }
    } else {
      return SecureStore.setItemAsync(key, value);
    }
  },

  /**
   * Obtiene un valor almacenado de forma segura
   * @param key Clave del valor a obtener
   * @returns El valor almacenado o null si no existe
   */
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === "web") {
      try {
        return Promise.resolve(localStorage.getItem(key));
      } catch (error) {
        console.error("Error al obtener del localStorage:", error);
        return Promise.resolve(null);
      }
    } else {
      return SecureStore.getItemAsync(key);
    }
  },

  /**
   * Elimina un valor almacenado de forma segura
   * @param key Clave del valor a eliminar
   */
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === "web") {
      try {
        localStorage.removeItem(key);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(new Error(`Error al eliminar de localStorage: ${error}`));
      }
    } else {
      return SecureStore.deleteItemAsync(key);
    }
  }
};
