import { useThemeStore } from "contexts/ThemeContext";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface BlurBarProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const BlurBar = ({ children, style }: BlurBarProps) => {
  const { isDarkMode } = useThemeStore();

  if (Platform.OS === "ios") {
    return (
      <BlurView
        tint={isDarkMode ? "dark" : "light"}
        intensity={90}
        style={[styles.containerFixed, style]}
      >
        {children}
      </BlurView>
    );
  }

  return (
    <View
      style={[
        styles.containerFixed,
        {
          backgroundColor: isDarkMode ? "rgba(51, 51, 51, 0.85)" : "rgba(245, 245, 245, 0.85)"
        },
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerFixed: {
    width: "100%",
    flexDirection: "row",
    padding: 12,
    position: "absolute",
    zIndex: 1000
  }
});
