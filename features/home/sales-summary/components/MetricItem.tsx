import { MaterialIcons } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { Text, View } from "react-native";
import { SkeletonItemLoader } from "./SkeletonItemLoader";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

interface MetricItemProps {
  readonly label: string;
  readonly value: string;
  readonly icon: string;
  readonly color: string;
  readonly isLoading?: boolean;
}

export const MetricItem = ({ label, value, icon, color, isLoading = false }: MetricItemProps) => {
  const defaultColors = useColors();

  return (
    <View style={{ backgroundColor: adjustBrightness(defaultColors.background, 5) }} className="w-[48%] p-3 rounded-lg">
      {isLoading ? (
        <SkeletonItemLoader color={color} />
      ) : (
        <>
          <View
            className="w-9 h-9 rounded-full items-center justify-center mb-1"
            style={{ backgroundColor: `${color}20` }}
          >
            <MaterialIcons name={icon as any} size={20} color={color} />
          </View>
          <Text style={{ color: defaultColors.text }} className="text-lg font-semibold">
            {value}
          </Text>
          <Text style={{ color: defaultColors.text }} className="text-xs">
            {label}
          </Text>
        </>
      )}
    </View>
  );
};
