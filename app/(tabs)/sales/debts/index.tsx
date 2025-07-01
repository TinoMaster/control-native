import { Redirect } from "expo-router";

export default function DebtsScreen() {
  return <Redirect href={"/(tabs)/sales/debts/today_debts" as any} />;
}
