import { QueryClientProvider } from "@tanstack/react-query";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { ModalProvider } from "components/ui/modals/ModalProvider";
import { queryClient } from "config/react-query.config";
import { NotificationProvider } from "contexts/NotificationContext";
import { Href, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import useColors from "hooks/useColors";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore } from "store/auth.store";
import "./globals.css";
import { navigationStore } from "store/navigation.store";

function RootLayoutNav() {
  const colors = useColors();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const loadingUser = useAuthStore((state) => state.loadingUser);
  const [isInitializing, setIsInitializing] = useState(true);

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
  const addPath = navigationStore((state) => state.addPath);
  const pathname = usePathname();

  useEffect(() => {
    addPath(pathname as Href);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NotificationProvider>
            <ModalProvider>
              <StatusBar style="light" />
              <RootLayoutNav />
            </ModalProvider>
          </NotificationProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
