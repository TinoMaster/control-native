import useColors from "hooks/useColors";
import React from "react";
import { StyleSheet, View } from "react-native";

interface PageWrapperProps {
  children: React.ReactNode;
}
//TODO: Aplicar este wrapper a todas las paginas
export const PageWrapper = ({ children }: PageWrapperProps) => {
  const colors = useColors();
  return <View style={[styles.container, { backgroundColor: colors.background }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16
  }
});
