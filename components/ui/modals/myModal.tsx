import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import useColors from "hooks/useColors";
import { ReactNode } from "react";
import { Modal, SafeAreaView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import colors from "styles/colors";

interface MyModalProps {
  readonly isVisible: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly children: ReactNode;
  readonly showCloseButton?: boolean;
  readonly footerContent?: ReactNode;
  readonly width?: "auto" | number | `${number}%`;
  readonly height?: "auto" | number | `${number}%`;
}

export function MyModal({
  isVisible,
  onClose,
  title,
  children,
  showCloseButton = true,
  footerContent,
  width = "90%" as const,
  height = "auto" as const
}: MyModalProps) {
  const defaultColors = useColors();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      {/* Background Blur */}
      <BlurView intensity={isDarkMode ? 40 : 30} tint={isDarkMode ? "dark" : "light"} className="absolute inset-0" />

      {/* Background Dimming Touchable */}
      <TouchableOpacity activeOpacity={1} onPress={onClose} className="absolute inset-0 bg-black/40 dark:bg-black/60" />

      <SafeAreaView className="flex-1 justify-center items-center p-5">
        {/* Modal Content Box */}
        <View
          style={{
            backgroundColor: defaultColors.background,
            borderColor: colors.primary.light,
            borderWidth: 1,
            shadowColor: isDarkMode ? "#000" : "#888",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isDarkMode ? 0.25 : 0.1,
            shadowRadius: 4,
            elevation: 3,
            width: width,
            maxHeight: height === "auto" ? undefined : height
          }}
          className="rounded-xl overflow-hidden"
        >
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <Text style={{ color: defaultColors.text }} className="text-lg font-semibold">
              {title}
            </Text>
            {showCloseButton && (
              <TouchableOpacity
                onPress={onClose}
                className="p-1 rounded-full active:bg-gray-200 dark:active:bg-gray-700"
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <MaterialIcons name="close" size={22} color={defaultColors.text} />
              </TouchableOpacity>
            )}
          </View>

          {/* Content */}
          <View className="p-4">{children}</View>

          {/* Optional Footer */}
          {footerContent && <View className="pr-4 pb-4">{footerContent}</View>}
        </View>
      </SafeAreaView>
    </Modal>
  );
}
