import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "contexts/ThemeContext";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import colors from "styles/colors";

interface FloatingActionButtonProps {
  readonly onPress: () => void;
  readonly iconName?: keyof typeof Ionicons.glyphMap;
  readonly iconSize?: number;
  readonly iconColor?: string;
  readonly backgroundColor?: string;
  readonly style?: StyleProp<ViewStyle>;
  readonly withBlur?: boolean;
  readonly withGradient?: boolean;
  readonly intensity?: number;
}

export function FloatingActionButton({
  onPress,
  iconName = "add",
  iconSize = 28,
  iconColor: iconColorProp,
  backgroundColor: backgroundColorProp,
  style,
  withBlur = true,
  withGradient = true,
  intensity = 50
}: FloatingActionButtonProps) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Colores adaptados al tema
  const finalIconColor = iconColorProp ?? "#FFFFFF";

  // Colores para el gradiente - usando ColorValue compatible con LinearGradient
  const gradientColors = isDarkMode
    ? ([colors.primary.dark, colors.primary.light] as const)
    : ([colors.primary.light, colors.primary.dark] as const);

  // Color de fondo para cuando no hay gradiente
  const baseBackgroundColor = backgroundColorProp ?? (isDarkMode ? colors.primary.dark : colors.primary.light);

  // Sombra adaptada al tema
  const shadowStyle = {
    shadowColor: colors.primary.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  };

  // Renderiza el contenido del botón con efectos
  const renderButtonContent = () => (
    <View style={styles.iconContainer}>
      <Ionicons name={iconName} size={iconSize} color={finalIconColor} />
    </View>
  );

  // Botón con todos los efectos
  if (withBlur && withGradient) {
    return (
      <TouchableOpacity
        style={[styles.container, shadowStyle, style]}
        onPress={onPress}
        accessibilityLabel="Add new item"
        accessibilityRole="button"
      >
        <BlurView intensity={intensity} tint={isDarkMode ? "dark" : "light"} style={styles.blurView}>
          <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
            {renderButtonContent()}
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    );
  }

  // Botón solo con blur
  if (withBlur) {
    return (
      <TouchableOpacity
        style={[styles.container, shadowStyle, style]}
        onPress={onPress}
        accessibilityLabel="Add new item"
        accessibilityRole="button"
      >
        <BlurView intensity={intensity} tint={isDarkMode ? "dark" : "light"} style={styles.blurView}>
          <View style={[styles.gradient, { backgroundColor: baseBackgroundColor }]}>{renderButtonContent()}</View>
        </BlurView>
      </TouchableOpacity>
    );
  }

  // Botón solo con gradiente
  if (withGradient) {
    return (
      <TouchableOpacity
        style={[styles.container, shadowStyle, style]}
        onPress={onPress}
        accessibilityLabel="Add new item"
        accessibilityRole="button"
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.blurView, styles.gradient]}
        >
          {renderButtonContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Botón básico
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: baseBackgroundColor }, shadowStyle, style]}
      onPress={onPress}
      accessibilityLabel="Add new item"
      accessibilityRole="button"
    >
      {renderButtonContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden"
  },
  blurView: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden"
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
