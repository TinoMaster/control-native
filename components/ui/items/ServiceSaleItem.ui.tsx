import { ServiceSaleModel } from "models/api/serviceSale.model";
import { Text, View } from "react-native";
import colors from "styles/colors";
import { formatCurrency } from "utilities/formatters";

export function ServiceSaleItem({ service }: { readonly service: ServiceSaleModel }) {
  return (
    <View className="py-2">
      <View className="flex-row justify-between">
        <Text style={{ color: colors.darkMode.text.light }} className="font-medium">
          {service.service.name}
        </Text>
        <Text style={{ color: colors.darkMode.text.light }} className="font-semibold">
          {formatCurrency(service.service.price * service.quantity)}
        </Text>
      </View>
      <View className="flex-row justify-between mt-1">
        <Text style={{ color: colors.darkMode.textSecondary.light }} className="text-sm">
          {service.employee.user.name}
        </Text>
        <Text style={{ color: colors.darkMode.textSecondary.light }} className="text-sm">
          Cantidad: {service.quantity}
        </Text>
      </View>
    </View>
  );
}
