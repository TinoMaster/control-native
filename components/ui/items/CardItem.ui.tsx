import useColors from "hooks/useColors";
import { CardPayment } from "models/api/businessFinalSale.model";
import { Text, View } from "react-native";
import { formatCurrency } from "utilities/formatters";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

export function CardItem({ card }: { readonly card: CardPayment }) {
  const defaultColors = useColors();

  return (
    <View
      style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }}
      className="flex-row justify-between items-center py-2"
    >
      <View>
        <Text style={{ color: defaultColors.text }} className="font-medium">
          Tarjeta {card.cardNumber}
        </Text>
      </View>
      <Text style={{ color: defaultColors.text }} className="font-semibold">
        {formatCurrency(card.amount)}
      </Text>
    </View>
  );
}
