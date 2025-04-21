import { Redirect } from "expo-router";

export default function Sales() {
  return <Redirect href={"/(tabs)/sales/current_day" as any} />;
}
