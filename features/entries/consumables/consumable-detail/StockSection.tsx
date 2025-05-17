import { MyCard } from "components/ui/MyCard";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { TRANSLATE_UNIT } from "models/api/unit.model";
import { Text, View } from "react-native";

interface StockSectionProps {
  readonly consumable: ConsumableModel;
}

export const StockSection = ({ consumable }: StockSectionProps) => {
  const defaultColors = useColors();

  return (
    <MyCard title="Información de Stock" iconTitle="cube-outline">
      <View className="py-2">
        <Text className="text-base mb-2" style={{ color: defaultColors.textSecondary }}>
          Cantidad disponible: {consumable.stock} {TRANSLATE_UNIT[consumable.unit]}
        </Text>
      </View>
    </MyCard>
  );
};
