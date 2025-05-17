import { MyCard } from "components/ui/MyCard";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { TRANSLATE_UNIT } from "models/api/unit.model";
import { Text, View } from "react-native";

export const PrincipalInfo = ({ consumable }: { consumable: ConsumableModel }) => {
  const defaultColors = useColors();

  return (
    <MyCard header={false}>
      <Text className="text-2xl font-bold my-2" style={{ color: defaultColors.text }}>
        {consumable.name}
      </Text>
      <View className="flex-row items-baseline mb-4">
        <Text className="text-xl font-semibold" style={{ color: defaultColors.primary }}>
          ${consumable.price.toFixed(2)}
        </Text>
        <Text className="text-base ml-1" style={{ color: defaultColors.textSecondary }}>
          / {TRANSLATE_UNIT[consumable.unit]}
        </Text>
      </View>
      {Boolean(consumable.description) && (
        <Text className="text-base leading-6" style={{ color: defaultColors.textSecondary }}>
          {consumable.description}
        </Text>
      )}
    </MyCard>
  );
};
