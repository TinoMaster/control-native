import { Stack } from "expo-router";
import useColors from "hooks/useColors";

export default function WalletLayout() {
  const colors = useColors();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Mi Billetera",
        }}
      />
      <Stack.Screen
        name="transactions"
        options={{
          title: "Transacciones",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Configuración",
        }}
      />
    </Stack>
  );
}
