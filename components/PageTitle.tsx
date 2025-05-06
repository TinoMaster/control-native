import { Ionicons } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import React, { ComponentProps } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AddIcon } from "./Icons";

interface PageTitleProps {
  title: string;
  showAddButton?: boolean;
  onPressAddButton?: () => void;
  icon?: ComponentProps<typeof Ionicons>["name"];
}

export const PageTitle = ({ title, showAddButton = false, onPressAddButton, icon }: PageTitleProps) => {
  const defaultColors = useColors();
  return (
    <View className="flex-row items-center justify-between gap-2 px-4 py-6 shadow shadow-black/60">
      <View className="flex-row items-center">
        {icon && <Ionicons name={icon} size={24} color={defaultColors.primary} />}
        <Text className="text-2xl font-bold ml-2" style={{ color: defaultColors.text }}>
          {title}
        </Text>
      </View>
      {showAddButton && (
        <TouchableOpacity
          className="bg-opacity-90 rounded-full p-2"
          style={{ backgroundColor: defaultColors.primary }}
          onPress={onPressAddButton}
          accessibilityLabel="Añadir nuevo negocio"
          accessibilityRole="button"
        >
          <AddIcon size={20} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};
