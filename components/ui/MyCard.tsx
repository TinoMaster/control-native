import { Ionicons } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { Text, View } from "react-native";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import { MiniIconButton } from "./MIniIconButton";

interface Props {
  readonly children: React.ReactNode;
  readonly header?: boolean;
  readonly onPressIcon?: () => void;
  readonly iconTitle?: keyof typeof Ionicons.glyphMap;
  readonly iconButton?: keyof typeof Ionicons.glyphMap;
  readonly title?: string;
  readonly iconButtonLabel?: string;
}

export function MyCard({ children, onPressIcon, iconTitle, iconButton, title, iconButtonLabel, header = true }: Props) {
  const defaultColors = useColors();

  return (
    <View
      style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }}
      className="rounded-xl shadow-sm pb-2"
    >
      {header && (
        <View
          className="flex-row items-center justify-between mb-3 p-2 border-b"
          style={{ borderColor: defaultColors.background }}
        >
          <View className="flex-row items-center">
            {iconTitle && <Ionicons name={iconTitle} size={24} color={defaultColors.primary} />}
            <Text style={{ color: defaultColors.text }} className="text-lg font-semibold ml-2">
              {title}
            </Text>
          </View>
          {onPressIcon && (
            <MiniIconButton icon={iconButton ?? "add"} onPress={onPressIcon} iconSize={16} label={iconButtonLabel} />
          )}
        </View>
      )}
      <View className="flex-row justify-between items-center">
        <View className="flex-1 p-4">{children}</View>
      </View>
    </View>
  );
}
