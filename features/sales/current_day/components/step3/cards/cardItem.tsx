import { useCardsFinalSaleStore } from "features/sales/current_day/store/useCardsFinalSale.store";
import useColors from "hooks/useColors";
import { CardPayment } from "models/api/businessFinalSale.model";
import { useCallback } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export const CardItem = ({ item }: { item: CardPayment }) => {
  const { deleteCard } = useCardsFinalSaleStore();
  const defaultColors = useColors();

  const handleDeleteCard = useCallback(
    (card: CardPayment) => {
      Alert.alert("Eliminar tarjeta", `¿Estás seguro de eliminar esta tarjeta?`, [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteCard(card)
        }
      ]);
    },
    [deleteCard]
  );

  return (
    <View
      className="p-4 mb-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
      style={{ borderLeftWidth: 4, borderLeftColor: defaultColors.primary }}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="text-base font-semibold text-gray-800 dark:text-gray-200">
              Tarjeta terminada en {item.cardNumber.slice(-4)}
            </Text>
          </View>

          <View className="flex-row mt-2 justify-between">
            <View>
              <Text className="text-xs text-gray-500 dark:text-gray-400">Monto</Text>
              <Text className="text-sm font-medium text-gray-800 dark:text-gray-200">${item.amount.toFixed(2)}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleDeleteCard(item)}
          className="p-2"
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Text style={{ color: defaultColors.secondary }}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
