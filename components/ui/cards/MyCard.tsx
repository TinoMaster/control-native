import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "styles/colors";
import { MiniIconButton } from "../MIniIconButton";
import { GlassCard } from "./GlassCard";

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
  return (
    <GlassCard>
      {header && (
        <View
          className="flex-row items-center justify-between p-2 bg-black/10 rounded-lg"
          style={{ borderColor: colors.darkMode.text.light }}
        >
          <View className="flex-row items-center">
            {iconTitle && <Ionicons name={iconTitle} size={16} color={colors.primary.light} />}
            <Text style={{ color: colors.darkMode.text.dark }} className="text-lg font-semibold ml-2">
              {title}
            </Text>
          </View>
          {onPressIcon && (
            <MiniIconButton icon={iconButton ?? "add"} onPress={onPressIcon} iconSize={16} label={iconButtonLabel} />
          )}
        </View>
      )}
      <View className="flex-row justify-between items-center">
        <View className="flex-1 p-3">{children}</View>
      </View>
    </GlassCard>
  );
}
