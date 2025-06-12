import { MyScrollView } from "components/ui/MyScrollView";
import { MachinesSelection } from "features/sales/current_day/components/step1/machines";
import { MoneyDetails } from "features/sales/current_day/components/step1/moneyDetails";
import { Workers } from "features/sales/current_day/components/step1/workers";
import { Text } from "react-native";
import colors from "styles/colors";

export default function Step1Details() {
  return (
    <MyScrollView>
      <Text style={{ color: colors.darkMode.text.light }} className="text-lg font-semibold mb-2">
        Detalles Monetarios
      </Text>
      <MoneyDetails />

      <MachinesSelection />

      <Workers />
    </MyScrollView>
  );
}
