import useColors from "hooks/useColors";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { GlassCard } from "./GlassCard";

interface MiniCardProps {
  readonly children: ReactNode;
  readonly style?: StyleProp<ViewStyle>;
  readonly accentColor?: string;
  readonly className?: string;
}

export function MiniCard({ children, style, accentColor, className = "p-4 rounded-lg" }: MiniCardProps) {
  const defaultColors = useColors();

  return (
    <GlassCard>
      <View
        className={className}
        style={[
          {
            borderLeftWidth: 4,
            borderLeftColor: accentColor ?? defaultColors.primary
          },
          style
        ]}
      >
        {children}
      </View>
    </GlassCard>
  );
}
