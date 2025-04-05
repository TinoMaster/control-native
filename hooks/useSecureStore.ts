import * as SecureStore from "expo-secure-store";
import { useState, useCallback } from "react";

export const useSecureStore = () => {
  const [error, setError] = useState<string | null>(null);

  const saveValue = useCallback(async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
      setError(null);
    } catch (err) {
      setError("Error al guardar el valor en Secure Store");
      console.error(err);
    }
  }, []);

  const getValue = useCallback(async (key: string) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      setError(null);
      return value;
    } catch (err) {
      setError("Error al recuperar el valor del Secure Store");
      console.error(err);
      return null;
    }
  }, []);

  const deleteValue = useCallback(async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
      setError(null);
    } catch (err) {
      setError("Error al eliminar el valor del Secure Store");
      console.error(err);
    }
  }, []);

  return {
    saveValue,
    getValue,
    deleteValue,
    error,
  };
};
