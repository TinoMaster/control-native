import { useThemeStore } from "contexts/ThemeContext";
import colors from "styles/colors";

export default function useColors() {
  const { isDarkMode } = useThemeStore();

  return {
    primary: isDarkMode ? colors.primary.light : colors.primary.dark,
    secondary: isDarkMode ? colors.secondary.light : colors.secondary.dark,
    background: isDarkMode ? colors.background.dark.secondary : colors.background.light.secondary,
    text: isDarkMode ? colors.darkMode.text.dark : colors.lightMode.text.light,
    textSecondary: isDarkMode ? colors.darkMode.textSecondary.light : colors.lightMode.textSecondary.light,
    error: "#E74C3C",
    card: isDarkMode ? "#2A2A2A" : "#FFFFFF"
  };
}
