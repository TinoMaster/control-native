import { ThemeProvider } from "context/ThemeContext";
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
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="light" />
        <RootLayoutNav />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
