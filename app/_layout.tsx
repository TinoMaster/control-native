import { ThemeProvider } from "context/ThemeContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useColors from "hooks/useColors";
import "./globals.css";
import { StatusBar } from "expo-status-bar";

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
        name="(tabs)"
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
        <StatusBar style="auto" />
        <RootLayoutNav />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
