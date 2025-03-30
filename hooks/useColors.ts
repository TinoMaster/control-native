import { useTheme } from "context/ThemeContext";
import colors from "styles/colors";

export default function useColors() {
  const { isDarkMode } = useTheme();

  return {
    primary: isDarkMode ? colors.primary.dark : colors.primary.light,
    secondary: isDarkMode ? colors.secondary.dark : colors.secondary.light,
    background: isDarkMode ? colors.background.dark : colors.background.light,
    text: isDarkMode ? colors.text.dark : colors.text.light,
    textSecondary: isDarkMode
      ? colors.textSecondary.dark
      : colors.textSecondary.light,
  };
}
