import { MiniCard } from "components/ui/cards/MiniCard";
import { useDebtsFinalSaleStore } from "features/sales/current_day/store/useDebtsFinalSale.store";
import { useDebts } from "hooks/api/useDebts";
import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "styles/colors";

export const DebtItem = ({ item }: { item: DebtModel }) => {
  const { deleteDebt } = useDebtsFinalSaleStore();
  const { isDebtInActualDay } = useDebts();
  const defaultColors = useColors();

  const handleDeleteDebt = () => {
    deleteDebt(item);
  };

  return (
    <MiniCard>
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text style={{ color: defaultColors.text }} className="text-base font-semibold">{item.name}</Text>
          {item.description && (
            <Text style={{ color: defaultColors.text }} className="text-sm mt-1">{item.description}</Text>
          )}
          <View className="flex-row mt-2 justify-between">
            <View>
              <Text style={{ color: defaultColors.text }} className="text-xs">Total</Text>
              <Text style={{ color: defaultColors.text }} className="text-sm font-medium">${item.total.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={{ color: defaultColors.text }} className="text-xs">Pagado</Text>
              <Text style={{ color: defaultColors.text }} className="text-sm font-medium">${item.paid.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={{ color: defaultColors.text }} className="text-xs">Pendiente</Text>
              <Text style={{ color: defaultColors.text }} className="text-sm font-medium">
                ${(item.total - item.paid).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        {!isDebtInActualDay(item) && (
          <TouchableOpacity
            onPress={handleDeleteDebt}
            className="p-2"
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Text style={{ color: colors.error.light }}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    </MiniCard>
  );
};
