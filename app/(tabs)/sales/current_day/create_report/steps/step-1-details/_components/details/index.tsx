import { View } from "react-native";
import MachinesSelection from "./_components/machines";
import MoneyDetails from "./_components/moneyDetails";

// Main Details Component
export default function Details() {
  return (
    <View className="flex-1">
      <MoneyDetails />
      <MachinesSelection />
    </View>
  );
}
