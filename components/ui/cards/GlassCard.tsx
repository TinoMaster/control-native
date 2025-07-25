import { useThemeStore } from "contexts/ThemeContext";
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
  withBorder = false,
  customGradient
}: GlassCardProps) => {
  const { isDarkMode } = useThemeStore();
  const tint = propTint ?? (isDarkMode ? "dark" : "light");

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
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className={`w-full ${isDarkMode ? "bg-black/10" : "bg-white/80"}`}>{children}</View>
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
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  },
  gradient: {
    width: "100%"
  }
});
