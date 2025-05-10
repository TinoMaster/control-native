import { MachinesSelection } from "features/sales/components/step1/machines";
import { MoneyDetails } from "features/sales/components/step1/moneyDetails";
import { Workers } from "features/sales/components/step1/workers";
import useColors from "hooks/useColors";
import { ScrollView, Text } from "react-native";

export default function Step1Details() {
  const defaultColors = useColors();

  return (
    <ScrollView style={{ gap: 10, paddingBottom: 20 }} className="flex-1">
      <Text style={{ color: defaultColors.text }} className="text-lg font-semibold mb-2">
        Detalles Monetarios
      </Text>
      <MoneyDetails />

      <MachinesSelection />

      <Workers />
    </ScrollView>
  );
}
