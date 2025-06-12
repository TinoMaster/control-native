import { DebtModel } from "models/api/debt.model";
import { Text, View } from "react-native";
import colors from "styles/colors";
import { formatCurrency } from "utilities/formatters";

export function DebtItem({ debt }: { readonly debt: DebtModel }) {
  return (
    <View className="py-2">
      <View className="flex-row justify-between">
        <Text style={{ color: colors.darkMode.text.light }} className="font-medium">
          {debt.name}
        </Text>
        <Text style={{ color: colors.darkMode.text.light }} className="font-semibold">
          {formatCurrency(debt.total)}
        </Text>
      </View>
      {debt.description && (
        <Text style={{ color: colors.darkMode.textSecondary.light }} className="text-sm mt-1">
          {debt.description}
        </Text>
      )}
    </View>
  );
}
