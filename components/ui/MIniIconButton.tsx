import { Ionicons } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

interface Props {
  readonly icon: keyof typeof Ionicons.glyphMap;
  readonly onPress: () => void;
  readonly style?: StyleProp<ViewStyle>;
  readonly iconSize?: number;
  readonly iconColor?: string;
}

export function MiniIconButton({ icon, onPress, style, iconSize = 12, iconColor }: Props) {
  const defaultColors = useColors();

  return (
    <TouchableOpacity
      style={[{ backgroundColor: defaultColors.background }, style]}
      onPress={onPress}
      className="p-2 rounded-lg shadow-sm"
    >
      <Ionicons name={icon} size={iconSize} color={iconColor ?? defaultColors.primary} />
    </TouchableOpacity>
  );
}
