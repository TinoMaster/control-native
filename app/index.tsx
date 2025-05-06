import { Redirect } from "expo-router";
import { ERole } from "models/api";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAuthStore } from "store/auth.store";

export default function Index() {
  const { isLoggedIn, loadingUser, role, initializeAuth } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  // Aseguramos que la autenticación se inicialice antes de decidir la redirección
  useEffect(() => {
    const init = async () => {
      try {
        await initializeAuth();
      } catch (error) {
        console.error("Error inicializando autenticación:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, []);

  // Mostramos un estado de carga mientras se inicializa la autenticación o se carga el usuario
  if (isInitializing || loadingUser) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Text className="text-gray-800 dark:text-gray-100">Cargando...</Text>
      </View>
    );
  }

  const privateContainerToRender = () => {
    if (role === ERole.SUPERADMIN) {
      return <Redirect href="/(admin)" />;
    } else {
      return <Redirect href="/(tabs)" />;
    }
  };

  return isLoggedIn ? privateContainerToRender() : <Redirect href="/(auth)" />;
}
