import { MachinesSelection } from "features/sales/components/step1/machines";
import { View } from "react-native";
import { MoneyDetails } from "./moneyDetails";

// Main Details Component
export function Details() {
  return (
    <View className="flex-1">
      <MoneyDetails />
      <MachinesSelection />
    </View>
  );
}
