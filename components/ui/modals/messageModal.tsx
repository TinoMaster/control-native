import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import useColors from "hooks/useColors";
import { Modal, SafeAreaView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import colors from "styles/colors";
import MyButton from "../MyButton"; // Assuming MyButton is in components/ui/

interface MessageModalProps {
  readonly isVisible: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly message: string;
  readonly buttonText?: string;
  readonly onButtonPress?: () => void;
}

export function MessageModal({
  isVisible,
  onClose,
  title,
  message,
  buttonText = "OK", // Default button text
  onButtonPress
}: MessageModalProps) {
  const defaultColors = useColors();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  function handleButtonPress() {
    if (onButtonPress) {
      onButtonPress();
    } else {
      onClose(); // Default action is to close if no specific handler provided
    }
  }

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
            elevation: 3
          }}
          className="rounded-xl w-full max-w-sm overflow-hidden"
        >
          {/* Header */}
          <View className="flex-row justify-between items-center p-4">
            <Text style={{ color: defaultColors.text }} className="text-lg font-semibold">
              {title}
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1 rounded-full active:bg-gray-200 dark:active:bg-gray-700">
              <MaterialIcons name="close" size={22} color={defaultColors.text} />
            </TouchableOpacity>
          </View>

          {/* Message Body */}
          <View className="p-4">
            <Text style={{ color: defaultColors.text }} className="text-base">
              {message}
            </Text>
          </View>

          {/* Footer Button */}
          <View className="p-4">
            <MyButton label={buttonText} onPress={handleButtonPress} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
