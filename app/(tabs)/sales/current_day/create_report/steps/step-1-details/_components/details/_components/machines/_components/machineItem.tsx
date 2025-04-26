import { Feather } from "@expo/vector-icons";
import { useTheme } from "contexts/ThemeContext";
import { BlurView } from "expo-blur";
import useColors from "hooks/useColors";
import { MachineModel } from "models/api/machine.model";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useMachineSelectionStore } from "../_store/useMachineSelectorStore";

export default function MachineItem({ machine }: Readonly<{ machine: MachineModel }>) {
  const { isSelected, toggleMachine } = useMachineSelectionStore();
  const isActive = isSelected(machine);
  const defaultColors = useColors();
  const { isDarkMode } = useTheme();

  return (
    <Animated.View entering={FadeIn.duration(300)} className="mx-1 my-1">
      <Pressable
        onPress={() => toggleMachine(machine)}
        className={`p-3 rounded-xl ${
          isActive ? "border-primary-500" : "border-neutral-300 dark:border-neutral-700"
        } border overflow-hidden`}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }]
          }
        ]}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${machine.name} ${isActive ? "selected" : "not selected"}`}
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
              {machine.name}
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
