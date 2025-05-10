import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "config/react-query.config";
import { ThemeProvider } from "contexts/ThemeContext";
import { NotificationProvider } from "contexts/NotificationContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import useColors from "hooks/useColors";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore } from "store/auth.store";
import "./globals.css";
import { ModalProvider } from "components/ui/modals/ModalProvider";

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
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    // Siempre inicializamos la autenticación al cargar la app
    const initializeAuthData = async () => {
      try {
        await initializeAuth();
      } catch (error) {
        console.error("Error inicializando datos globales:", error);
      }
    };

    initializeAuthData();
  }, []);

  // Este componente no renderiza nada, solo inicializa datos
  return null;
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
                <GlobalInitializer />
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
