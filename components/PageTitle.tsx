import useColors from "hooks/useColors";
import React from "react";
import { Text, View } from "react-native";

export const PageTitle = ({ title }: { title: string }) => {
  const defaultColors = useColors();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)"
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "600", color: defaultColors.text }}>{title}</Text>
    </View>
  );
};
