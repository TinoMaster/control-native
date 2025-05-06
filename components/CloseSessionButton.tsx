import { useRouter } from "expo-router";
import { useAuthStore } from "store/auth.store";
import { SettingButton } from "./ui/SettingButton";

export function CloseSessionButton() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)");
  };
  return (
    <SettingButton
      onPress={handleLogout}
      icon="log-out-outline"
      title="Cerrar Sesión"
      accessibilityRole="button"
      accessibilityLabel="Cerrar sesión"
    />
  );
}
