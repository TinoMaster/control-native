import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "config/react-query.config";
import { ThemeProvider } from "contexts/ThemeContext";
import { NotificationProvider } from "contexts/NotificationContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import useColors from "hooks/useColors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";

function RootLayoutNav() {
  const colors = useColors();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(admin)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NotificationProvider>
            <StatusBar style="light" />
            <RootLayoutNav />
          </NotificationProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
