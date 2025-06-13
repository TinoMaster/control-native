import { MyCard } from "components/ui/cards/MyCard";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { Text, View } from "react-native";

interface AdditionalInfoProps {
  readonly consumable: ConsumableModel;
}

export const AdditionalInfo = ({ consumable }: AdditionalInfoProps) => {
  const defaultColors = useColors();

  return (
    <MyCard title="Información Adicional" iconTitle="information-circle-outline">
      <View className="py-2">
        {consumable?.consumableKey?.createdAt && (
          <Text className="text-base mb-2" style={{ color: defaultColors.textSecondary }}>
            Creado: {new Date(consumable.consumableKey.createdAt).toLocaleDateString()}
          </Text>
        )}
        {consumable.updatedAt && (
          <Text className="text-base mb-2" style={{ color: defaultColors.textSecondary }}>
            Última actualización: {new Date(consumable.updatedAt).toLocaleDateString()}
          </Text>
        )}
      </View>
    </MyCard>
  );
};
