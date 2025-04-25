import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "config/react-query.config";
import { ThemeProvider } from "contexts/ThemeContext";
import { NotificationProvider } from "contexts/NotificationContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import useColors from "hooks/useColors";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore } from "store/auth.store";
import "./globals.css";

function RootLayoutNav() {
  const colors = useColors();

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
        name="(auth)"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="(tabs)"
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

// Componente inicializador global que se ejecuta en cualquier ruta de la aplicación
function GlobalInitializer() {
  useEffect(() => {
    // Solo inicializamos si no estamos ya logueados
    if (!useAuthStore.getState().isLoggedIn) {
      const initializeAuthData = async () => {
        try {
          await useAuthStore.getState().initializeAuth();
        } catch (error) {
          console.error("Error inicializando datos globales:", error);
        }
      };

      initializeAuthData();
    }
  }, []);

  // Este componente no renderiza nada, solo inicializa datos
  return null;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NotificationProvider>
            <GlobalInitializer />
            <StatusBar style="light" />
            <RootLayoutNav />
          </NotificationProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
