import { Feather } from "@expo/vector-icons";
import { useTheme } from "contexts/ThemeContext";
import { BlurView } from "expo-blur";
import { useWorkersSelectorStore } from "features/sales/store/useWorkersSelectorStore"; // Updated store import
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model"; // Updated model import
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function WorkerItem({ worker }: Readonly<{ worker: EmployeeModel }>) {
  // Updated prop name
  const { isSelected, toggleWorker } = useWorkersSelectorStore(); // Updated store functions
  const isActive = isSelected(worker);
  const defaultColors = useColors();
  const { isDarkMode } = useTheme();

  return (
    <Animated.View entering={FadeIn.duration(300)} className="mx-1 my-1">
      <Pressable
        onPress={() => toggleWorker(worker)} // Updated toggle function
        className={`p-3 rounded-xl border overflow-hidden ${isActive ? "border-primary-light" : "border-white"}`}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }]
          }
        ]}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${worker.user.name} ${isActive ? "selected" : "not selected"}`} // Updated label
        accessibilityState={{ selected: isActive }}
      >
        {isActive && (
          <BlurView
            intensity={20}
            className="absolute top-0 left-0 right-0 bottom-0 z-0"
            tint={isDarkMode ? "dark" : "light"}
          />
        )}
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text style={{ color: defaultColors.text }} className="text-base font-medium">
              {worker.user.name} {/* Updated text content */}
            </Text>
          </View>
          <View
            className={`w-6 h-6 rounded-full justify-center items-center border ${
              isActive ? "bg-primary-500 border-primary-700" : "border-neutral-300 dark:border-neutral-600"
            }`}
          >
            {isActive && <Feather name="check" size={14} color="#fff" />}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
