import { Feather } from "@expo/vector-icons";
import { MiniCard } from "components/ui/cards/MiniCard";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { Text, TouchableOpacity, View } from "react-native";

interface BusinessCardProps {
  readonly business: BusinessModel;
  readonly onPress?: () => void;
}

export function BusinessCard({ business, onPress }: BusinessCardProps) {
  const defaultColors = useColors();

  return (
    <MiniCard>
      <TouchableOpacity
        className="rounded-lg flex-row items-center justify-between"
        onPress={onPress}
        accessibilityLabel={`Ver detalles de ${business.name}`}
        accessibilityRole="button"
      >
        <View className="flex-1">
          <Text className="text-lg font-semibold" style={{ color: defaultColors.text }}>
            {business.name}
          </Text>
          <Text style={{ color: defaultColors.textSecondary }}>
            {business.address.municipality}
          </Text>
          <View className="flex-row items-center mt-2">
            <Feather name="users" size={14} color={defaultColors.textSecondary} />
            <Text className="ml-1" style={{ color: defaultColors.textSecondary }}>
              {business.users?.length} empleados
            </Text>
          </View>
        </View>
        <Feather name="chevron-right" size={20} color={defaultColors.textSecondary} />
      </TouchableOpacity>
    </MiniCard>
  );
}
