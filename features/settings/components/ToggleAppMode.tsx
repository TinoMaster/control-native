import { SettingButton } from "components/ui/SettingButton";
import { useThemeStore } from "contexts/ThemeContext";

export function ToggleAppMode() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  return (
    <SettingButton
      onPress={toggleTheme}
      icon={isDarkMode ? "moon" : "sunny"}
      title={isDarkMode ? "Modo Claro" : "Modo Oscuro"}
      accessibilityRole="button"
      accessibilityLabel={isDarkMode ? "Cambiar tema a claro" : "Cambiar tema a oscuro"}
    />
  );
}
