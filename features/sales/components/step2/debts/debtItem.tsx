import { useDebtsFinalSaleStore } from "features/sales/store/useDebtsFinalSale.store";
import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import { useCallback } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export const DebtItem = ({ item }: { item: DebtModel }) => {
  const { deleteDebt } = useDebtsFinalSaleStore();
  const defaultColors = useColors();

  const handleDeleteDebt = useCallback(
    (debt: DebtModel) => {
      Alert.alert("Eliminar deuda", `¿Estás seguro de eliminar la deuda de ${debt.name}?`, [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteDebt(debt)
        }
      ]);
    },
    [deleteDebt]
  );

  return (
    <View
      className="p-4 mb-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
      style={{ borderLeftWidth: 4, borderLeftColor: defaultColors.primary }}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-800 dark:text-gray-200">{item.name}</Text>
          {item.description && (
            <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</Text>
          )}
          <View className="flex-row mt-2 justify-between">
            <View>
              <Text className="text-xs text-gray-500 dark:text-gray-400">Total</Text>
              <Text className="text-sm font-medium text-gray-800 dark:text-gray-200">${item.total.toFixed(2)}</Text>
            </View>
            <View>
              <Text className="text-xs text-gray-500 dark:text-gray-400">Pagado</Text>
              <Text className="text-sm font-medium text-gray-800 dark:text-gray-200">${item.paid.toFixed(2)}</Text>
            </View>
            <View>
              <Text className="text-xs text-gray-500 dark:text-gray-400">Pendiente</Text>
              <Text className="text-sm font-medium" style={{ color: defaultColors.secondary }}>
                ${(item.total - item.paid).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleDeleteDebt(item)}
          className="p-2"
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Text style={{ color: defaultColors.secondary }}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
