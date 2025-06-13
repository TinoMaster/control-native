import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ColorValue, StyleSheet, View } from "react-native";

interface GlassCardProps {
  children: React.ReactNode;
  intensity?: number;
  isDark?: boolean;
  tint?: "light" | "dark" | "default";
  style?: object;
  withBorder?: boolean;
  customGradient?: [ColorValue, ColorValue];
}

export const GlassCard = ({
  children,
  intensity = 50,
  isDark = true,
  tint: propTint,
  style = {},
  withBorder = true,
  customGradient
}: GlassCardProps) => {
  const tint = propTint ?? "dark";

  // Colors for different themes
  const borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)";

  // Default gradient colors based on theme
  const defaultGradientColors: [ColorValue, ColorValue] = isDark
    ? ["rgba(40,40,40,0.1)", "rgba(20,20,20,0.05)"]
    : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"];

  // Use custom gradient if provided, otherwise use default
  const gradientColors = customGradient ?? defaultGradientColors;

  return (
    <BlurView
      intensity={intensity}
      tint={tint}
      style={[styles.container, withBorder && { borderColor, borderWidth: 1 }, style]}
    >
      <LinearGradient colors={gradientColors} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View className="w-full bg-primary-dark/5">{children}</View>
      </LinearGradient>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
  },
  gradient: {
    width: "100%"
  }
});
