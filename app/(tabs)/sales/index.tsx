import { Redirect } from "expo-router";

export default function Sales() {
  return <Redirect href={"/(tabs)/sales/sale_services" as any} />;
}
