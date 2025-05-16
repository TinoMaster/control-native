import { Stack } from "expo-router";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="superadmin" />
      <Stack.Screen name="business" />
    </Stack>
  );
}
