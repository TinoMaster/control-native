import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import { Text, View } from "react-native";
import { formatCurrency } from "utilities/formatters";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

export function DebtItem({ debt }: { readonly debt: DebtModel }) {
  const defaultColors = useColors();

  return (
    <View style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }} className="py-2">
      <View className="flex-row justify-between">
        <Text style={{ color: defaultColors.text }} className="font-medium">
          {debt.name}
        </Text>
        <Text style={{ color: defaultColors.text }} className="font-semibold">
          {formatCurrency(debt.total)}
        </Text>
      </View>
      {debt.description && (
        <Text style={{ color: defaultColors.textSecondary }} className="text-sm mt-1">
          {debt.description}
        </Text>
      )}
    </View>
  );
}
