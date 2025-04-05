import { Redirect } from "expo-router";
import { ERole } from "models/api";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/auth.store";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const role = useAuthStore((state) => state.role);

  const privateContainerToRender = () => {
    if (role === ERole.SUPERADMIN) {
      return <Redirect href="/(admin)" />;
    } else {
      return <Redirect href="/(tabs)" />;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await useAuthStore.getState().initializeAuth();
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return null; // O puedes retornar un componente de carga
  }

  return isLoggedIn ? privateContainerToRender() : <Redirect href="/(auth)" />;
}
