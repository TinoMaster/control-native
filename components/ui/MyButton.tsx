import { LinearGradient } from "expo-linear-gradient";
import useColors from "hooks/useColors";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  readonly onPress: () => void;
  readonly label: string;
}

export default function MyButton({ onPress, label }: ButtonProps) {
  const defaultColors = useColors();
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[defaultColors.primary, defaultColors.primary + "AA"]}
        className="px-4 py-2 rounded-md overflow-hidden"
      >
        <Text className="text-white text-center">{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
