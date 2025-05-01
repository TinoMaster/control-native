import { MachinesSelection } from "features/sales/components/step1/machines";
import { MoneyDetails } from "features/sales/components/step1/moneyDetails";
import { Workers } from "features/sales/components/step1/workers";
import { ScrollView } from "react-native";

export default function Step1Details() {
  return (
    <ScrollView style={{ gap: 10, paddingBottom: 20 }} className="flex-1">
      <MoneyDetails />
      <MachinesSelection />
      <Workers />
    </ScrollView>
  );
}
