import { Text, View } from "react-native";
import colors from "styles/colors";

export function InfoRow({
  label,
  value,
  bold,
  success,
  warning,
  error,
  positive,
  negative
}: {
  readonly label: string;
  readonly value: string | number;
  readonly positive?: boolean;
  readonly negative?: boolean;
  readonly bold?: boolean;
  readonly success?: boolean;
  readonly warning?: boolean;
  readonly error?: boolean;
}) {
  // Determinar color de texto seg n estado
  function getTextColor() {
    if (success) return colors.success.light;
    if (warning) return colors.warning.light;
    if (error) return colors.error.light;
    return colors.darkMode.text.light;
  }

  function getSign() {
    if (positive) return "+";
    if (negative) return "-";
    return "";
  }

  const colorText = getTextColor();

  return (
    <View className="flex-row justify-between py-2">
      <Text
        style={{ color: colorText, fontWeight: bold ? "bold" : "normal", fontSize: bold ? 16 : 14 }}
        className="font-medium"
      >
        {label}
      </Text>
      <Text style={{ color: colorText, fontWeight: bold ? "bold" : "normal", fontSize: bold ? 16 : 14 }}>
        {getSign() + " " + value}
      </Text>
    </View>
  );
}
