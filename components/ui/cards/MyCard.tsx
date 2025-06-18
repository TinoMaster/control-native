import { Ionicons } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { Text, View } from "react-native";
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
  readonly style?: object;
}

export function MyCard({
  children,
  onPressIcon,
  iconTitle,
  iconButton,
  title,
  iconButtonLabel,
  header = true,
  style
}: Props) {
  const defaultColors = useColors();
  return (
    <GlassCard style={style}>
      {header && (
        <View
          className="flex-row items-center justify-between p-2 rounded-lg"
          style={{ borderColor: defaultColors.textSecondary }}
        >
          <View className="flex-row items-center">
            {iconTitle && <Ionicons name={iconTitle} size={16} color={defaultColors.primary} />}
            <Text style={{ color: defaultColors.text }} className="text-lg font-semibold ml-2">
              {title}
            </Text>
          </View>
          {onPressIcon && (
            <MiniIconButton
              icon={iconButton ?? "add"}
              onPress={onPressIcon}
              iconSize={16}
              label={iconButtonLabel}
              style={{ borderRadius: 10 }}
            />
          )}
        </View>
      )}
      <View className="flex-row justify-between items-center">
        <View className="flex-1 p-3">{children}</View>
      </View>
    </GlassCard>
  );
}
