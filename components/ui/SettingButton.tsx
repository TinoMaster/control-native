import { Feather, Ionicons } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { AccessibilityRole, Text, TouchableOpacity, View } from "react-native";

import { ComponentProps } from "react";

interface SettingButtonProps {
  readonly onPress: () => void;
  readonly icon: ComponentProps<typeof Ionicons>["name"];
  readonly title: string;
  readonly accessibilityRole?: AccessibilityRole;
  readonly accessibilityLabel?: string;
  readonly iconRight?: boolean;
}

export function SettingButton({
  onPress,
  icon,
  title,
  accessibilityRole,
  accessibilityLabel,
  iconRight = false
}: SettingButtonProps) {
  const defaultColors = useColors();
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between"
      onPress={onPress}
      accessibilityRole={accessibilityRole ?? "button"}
      accessibilityLabel={accessibilityLabel}
    >
      <View className="flex-row items-center gap-2">
        <Ionicons name={icon} size={24} color={defaultColors.primary} />
        <Text style={{ color: defaultColors.text }}>{title}</Text>
      </View>
      {iconRight && <Feather name="chevron-right" size={20} color={defaultColors.textSecondary} />}
    </TouchableOpacity>
  );
}
