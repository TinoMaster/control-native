import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "styles/colors";
import { AddIcon } from "./Icons";

interface PageTitleProps {
  title: string;
  showAddButton?: boolean;
  onPressAddButton?: () => void;
  icon?: ComponentProps<typeof Ionicons>["name"];
}

export const PageTitle = ({ title, showAddButton = false, onPressAddButton, icon }: PageTitleProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)"
      }}
    >
      <View className="flex-row items-center">
        {icon && <Ionicons name={icon} size={24} color={colors.primary.light} />}
        <Text
          className="text-xl font-bold ml-2"
          style={{ color: colors.darkMode.text.light, textTransform: "capitalize" }}
        >
          {title}
        </Text>
      </View>
      {showAddButton && (
        <TouchableOpacity
          className="bg-opacity-90 rounded-full p-2"
          style={{ backgroundColor: colors.primary.light }}
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
