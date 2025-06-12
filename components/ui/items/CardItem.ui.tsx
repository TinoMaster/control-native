import { CardPayment } from "models/api/businessFinalSale.model";
import { Text, View } from "react-native";
import colors from "styles/colors";
import { formatCurrency } from "utilities/formatters";

export function CardItem({ card }: { readonly card: CardPayment }) {
  return (
    <View className="flex-row justify-between items-center py-2">
      <View>
        <Text style={{ color: colors.darkMode.text.light }} className="font-medium">
          Tarjeta {card.cardNumber}
        </Text>
      </View>
      <Text style={{ color: colors.darkMode.text.light }} className="font-semibold">
        {formatCurrency(card.amount)}
      </Text>
    </View>
  );
}
