import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "contexts/ThemeContext";
import { useRouter } from "expo-router";
import { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";

interface CustomHeaderProps {
  readonly title: string;
  readonly showBackButton?: boolean;
  readonly rightComponent?: React.ReactNode;
  readonly onBackPress?: () => void;
  readonly compact?: boolean;
  readonly icon?: ComponentProps<typeof Ionicons>["name"];
}

export function CustomHeader({
  title,
  showBackButton = false,
  rightComponent,
  onBackPress,
  compact = false,
  icon
}: CustomHeaderProps) {
  const { isDarkMode } = useThemeStore();
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
        backgroundColor: isDarkMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
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
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "#FFFFFF" : "#000000"} />
          </Pressable>
        )}
        {icon && <Ionicons name={icon} size={24} color={isDarkMode ? "#FFFFFF" : "#000000"} />}
        <Text
          style={{
            color: isDarkMode ? "#FFFFFF" : "#000000",
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
