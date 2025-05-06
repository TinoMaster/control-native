import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useColors from "hooks/useColors";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const BackButtonPlusTitle = ({ title }: { title: string }) => {
  const router = useRouter();
  const defaultColors = useColors();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)",
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginRight: 16,
        }}
      >
        <Ionicons name="arrow-back" size={24} color={defaultColors.text} />
      </TouchableOpacity>
      <Text
        style={{ fontSize: 20, fontWeight: "600", color: defaultColors.text }}
      >
        {title}
      </Text>
    </View>
  );
};
