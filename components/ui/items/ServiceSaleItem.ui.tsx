import useColors from "hooks/useColors";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { Text, View } from "react-native";
import { formatCurrency } from "utilities/formatters";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

export function ServiceSaleItem({ service }: { readonly service: ServiceSaleModel }) {
  const defaultColors = useColors();

  return (
    <View style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }} className="py-2">
      <View className="flex-row justify-between">
        <Text style={{ color: defaultColors.text }} className="font-medium">
          {service.service.name}
        </Text>
        <Text style={{ color: defaultColors.text }} className="font-semibold">
          {formatCurrency(service.service.price * service.quantity)}
        </Text>
      </View>
      <View className="flex-row justify-between mt-1">
        <Text style={{ color: defaultColors.textSecondary }} className="text-sm">
          {service.employee.user.name}
        </Text>
        <Text style={{ color: defaultColors.textSecondary }} className="text-sm">
          Cantidad: {service.quantity}
        </Text>
      </View>
    </View>
  );
}
