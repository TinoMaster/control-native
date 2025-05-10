import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import colors from "styles/colors";

interface FloatingActionButtonProps {
  readonly onPress: () => void;
  readonly iconName?: keyof typeof Ionicons.glyphMap;
  readonly iconSize?: number;
  readonly iconColor?: string;
  readonly backgroundColor?: string;
  readonly style?: StyleProp<ViewStyle>;
}

export function FloatingActionButton({
  onPress,
  iconName = "add",
  iconSize = 28,
  iconColor: iconColorProp,
  backgroundColor: backgroundColorProp,
  style
}: FloatingActionButtonProps) {
  const { colorScheme } = useColorScheme();
  const finalIconColor = iconColorProp ?? colors.darkMode.text.light;
  const tempBackgroundColor = backgroundColorProp ?? colors.primary;

  const resolvedBackgroundColor =
    typeof tempBackgroundColor === "object" && tempBackgroundColor !== null
      ? tempBackgroundColor[colorScheme ?? "light"]
      : tempBackgroundColor;

  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: resolvedBackgroundColor }, style]}
      onPress={onPress}
      accessibilityLabel="Add new item"
      accessibilityRole="button"
    >
      <Ionicons name={iconName} size={iconSize} color={finalIconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  }
});
