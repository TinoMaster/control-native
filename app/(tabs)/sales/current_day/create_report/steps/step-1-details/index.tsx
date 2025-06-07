import { MachinesSelection } from "features/sales/current_day/components/step1/machines";
import { MoneyDetails } from "features/sales/current_day/components/step1/moneyDetails";
import { Workers } from "features/sales/current_day/components/step1/workers";
import useColors from "hooks/useColors";
import { View, Text } from "react-native";

export default function Step1Details() {
  const defaultColors = useColors();

  return (
    <View>
      <Text style={{ color: defaultColors.text }} className="text-lg font-semibold mb-2">
        Detalles Monetarios
      </Text>
      <MoneyDetails />

      <MachinesSelection />

      <Workers />
    </View>
  );
}
