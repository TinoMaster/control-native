import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ColorValue, StyleSheet, View } from "react-native";

interface GlassCardProps {
  children: React.ReactNode;
  intensity?: number;
  isDark?: boolean;
  tint?: "light" | "dark" | "default";
  style?: object;
  rounded?: boolean;
  withBorder?: boolean;
  customGradient?: [ColorValue, ColorValue];
}

export const GlassCard = ({
  children,
  intensity = 50,
  isDark = true,
  tint: propTint,
  style = {},
  rounded = true,
  withBorder = true,
  customGradient
}: GlassCardProps) => {
  const tint = propTint ?? (isDark ? "dark" : "light");

  // Colors for different themes
  const borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)";

  // Default gradient colors based on theme
  const defaultGradientColors: [ColorValue, ColorValue] = isDark
    ? ["rgba(40,40,40,0.1)", "rgba(20,20,20,0.05)"]
    : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"];

  // Use custom gradient if provided, otherwise use default
  const gradientColors = customGradient ?? defaultGradientColors;

  return (
    <View
      className={`overflow-hidden shadow-lg ${rounded ? "rounded-3xl" : ""} w-full max-w-[500px]`}
      style={[styles.container, withBorder && { borderColor, borderWidth: 1 }, style]}
      accessibilityRole="none"
    >
      <BlurView intensity={intensity} tint={tint} style={styles.blurContainer}>
        <LinearGradient colors={gradientColors} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View className="p-4 w-full">{children}</View>
        </LinearGradient>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative"
  },
  blurContainer: {
    width: "100%",
    overflow: "hidden"
  },
  gradient: {
    width: "100%"
  }
});
