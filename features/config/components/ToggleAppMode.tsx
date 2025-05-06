import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "contexts/ThemeContext";
import { Text, TouchableOpacity } from "react-native";
import useColors from "hooks/useColors";

export function ToggleAppMode() {
  const { isDarkMode, toggleTheme } = useTheme();
  const defaultColors = useColors();
  return (
    <TouchableOpacity className="flex-row items-center gap-2" onPress={toggleTheme}>
      <Ionicons name={isDarkMode ? "moon" : "sunny"} size={24} color={defaultColors.text} />
      <Text style={{ color: defaultColors.text }}>{isDarkMode ? "Modo Claro" : "Modo Oscuro"}</Text>
    </TouchableOpacity>
  );
}
