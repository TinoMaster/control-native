import { GRADIENT_PALETTE_TO_BACKGROUND } from "data/global.data";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ViewProps } from "react-native";

interface GradientBackgroundProps extends ViewProps {
  readonly variant?: "primary" | "secondary" | "dark" | "light" | "glass" | "neon";
  readonly intensity?: "soft" | "medium" | "strong";
  readonly className?: string;
  readonly borderRadius?: number;
  readonly direction?: "tl-br" | "tr-bl" | "top-bottom" | "left-right";
}

export function GradientBackground({
  children,
  variant = "dark",
  intensity = "soft",
  className = "",
  style,
  borderRadius = 0,
  direction = "tl-br",
  ...props
}: GradientBackgroundProps) {
  const isDark = true;

  const gradientDirections = {
    "tl-br": { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
    "tr-bl": { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
    "top-bottom": { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
    "left-right": { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } }
  };

  const getGradientColors = () => {
    const theme = isDark ? "dark" : "light";
    const colorsByVariant = GRADIENT_PALETTE_TO_BACKGROUND[variant] || GRADIENT_PALETTE_TO_BACKGROUND["primary"];
    const colors = colorsByVariant[theme]?.[intensity] || GRADIENT_PALETTE_TO_BACKGROUND["primary"][theme][intensity];

    if (!colors || colors.length < 2) {
      return ["#141E30", "#243B55"] as const;
    }
    const [first, second, ...rest] = colors;
    return [first, second, ...rest] as const;
  };

  const gradientColors = getGradientColors();

  return (
    <LinearGradient
      colors={gradientColors}
      {...gradientDirections[direction]}
      style={[styles.gradient, { borderRadius }, style]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    overflow: "hidden"
  }
});
