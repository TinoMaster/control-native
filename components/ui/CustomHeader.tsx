import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";

interface CustomHeaderProps {
  readonly title: string;
  readonly showBackButton?: boolean;
  readonly rightComponent?: React.ReactNode;
  readonly backgroundColor?: string;
  readonly textColor?: string;
  readonly onBackPress?: () => void;
  readonly compact?: boolean;
  readonly icon?: ComponentProps<typeof Ionicons>["name"];
}

export function CustomHeader({
  title,
  showBackButton = false,
  rightComponent,
  backgroundColor = "rgba(0,0,0,0.1)",
  textColor = "#FFFFFF",
  onBackPress,
  compact = false,
  icon
}: CustomHeaderProps) {
  const router = useRouter();

  const headerHeight = compact ? 40 : 56;

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={{
        backgroundColor,
        height: headerHeight,
        paddingTop: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        borderBottomWidth: 2,
        borderBottomColor: "rgba(0,0,0,0.1)"
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {showBackButton && (
          <Pressable
            onPress={handleBackPress}
            style={{
              padding: 4
            }}
          >
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </Pressable>
        )}
        {icon && <Ionicons name={icon} size={24} color={textColor} />}
        <Text
          style={{
            color: textColor,
            fontSize: 18,
            fontWeight: "600"
          }}
        >
          {title}
        </Text>
      </View>

      {rightComponent && <View>{rightComponent}</View>}
    </View>
  );
}
