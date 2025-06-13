import { MiniCard } from "components/ui/cards/MiniCard";
import { useCardsFinalSaleStore } from "features/sales/current_day/store/useCardsFinalSale.store";
import useColors from "hooks/useColors";
import { CardPayment } from "models/api/businessFinalSale.model";
import { useCallback } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import colors from "styles/colors";

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
    <MiniCard>
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text style={{ color: defaultColors.text }} className="text-base font-semibold ">
              Tarjeta terminada en {item.cardNumber.slice(-4)}
            </Text>
          </View>

          <View className="flex-row mt-2 justify-between">
            <View>
              <Text style={{ color: defaultColors.text }} className="text-xs">
                Monto
              </Text>
              <Text style={{ color: defaultColors.text }} className="text-sm font-medium">
                ${item.amount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleDeleteCard(item)}
          className="p-2"
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Text style={{ color: colors.error.light }}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </MiniCard>
  );
};
