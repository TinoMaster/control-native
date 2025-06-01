import { QueryClientProvider } from "@tanstack/react-query";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { ModalProvider } from "components/ui/modals/ModalProvider";
import { queryClient } from "config/react-query.config";
import { NotificationProvider } from "contexts/NotificationContext";
import { ThemeProvider } from "contexts/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import useColors from "hooks/useColors";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore } from "store/auth.store";
import "./globals.css";

/* Tareas pendientes de la app */
// TODO: En la pagina de detalles de un negocio, hacer que se actualize la fecha de actualización cada vez que se modifique algo
// TODO: Hacer que el reporte finalizado se pueda actualizar

function RootLayoutNav() {
  const colors = useColors();
  const { loadingUser, initializeAuth } = useAuthStore();
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
    return <LoadingPage message="Cargando aplicación..." />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background
        }
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="(admin)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* GestureHandlerRootView es necesario para que los gestos funcionen correctamente */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider>
            <NotificationProvider>
              <ModalProvider>
                <StatusBar style="light" />
                <RootLayoutNav />
              </ModalProvider>
            </NotificationProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
