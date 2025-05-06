import { Text, TouchableOpacity, View } from "react-native";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import useColors from "hooks/useColors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  readonly children: React.ReactNode;
  readonly header?: boolean;
  readonly onPressIcon?: () => void;
  readonly iconTitle?: keyof typeof Ionicons.glyphMap;
  readonly iconButton?: keyof typeof Ionicons.glyphMap;
  readonly title?: string;
}

export function MyCard({ children, onPressIcon, iconTitle, iconButton, title, header = true }: Props) {
  const defaultColors = useColors();

  return (
    <View
      style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }}
      className="rounded-xl shadow-sm pb-2"
    >
      {header && (
        <View className="flex-row items-center justify-between mb-3 p-2">
          <View className="flex-row items-center">
            {iconTitle && <Ionicons name={iconTitle} size={24} color={defaultColors.primary} />}
            <Text style={{ color: defaultColors.text }} className="text-lg font-semibold ml-2">
              {title}
            </Text>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: defaultColors.background }}
            onPress={onPressIcon}
            className="p-2 rounded-full shadow-sm"
          >
            {iconButton && <Ionicons name={iconButton} size={16} color={defaultColors.primary} />}
          </TouchableOpacity>
        </View>
      )}
      <View className="flex-row justify-between items-center">
        <View className="flex-1 px-4">{children}</View>
      </View>
    </View>
  );
}
