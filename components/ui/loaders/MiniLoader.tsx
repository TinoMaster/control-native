import useColors from "hooks/useColors";
import { MotiView } from "moti";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

interface MiniLoaderProps {
  readonly message?: string;
  readonly size?: "small" | "large" | number;
  readonly showText?: boolean;
  readonly color?: string;
  readonly className?: string;
}

export function MiniLoader({
  message = "Cargando...",
  size = "small",
  showText = true,
  color,
  className = ""
}: MiniLoaderProps) {
  const colors = useColors();
  const loaderColor = color ?? colors.primary;

  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.95
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      transition={{
        type: "timing",
        duration: 200
      }}
      className={`flex-row items-center justify-center ${className}`}
      style={styles.container}
    >
      <ActivityIndicator size={size} color={loaderColor} />
      {showText && (
        <Text style={[styles.text, { color: colors.text }]} className="ml-2" accessibilityRole="text">
          {message}
        </Text>
      )}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6
  },
  text: {
    fontSize: 14,
    fontWeight: "500"
  }
});

export default MiniLoader;
