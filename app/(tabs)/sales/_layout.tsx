import NavigationMenu from "components/ui/menus/NavigationMenu";
import { Stack } from "expo-router";
import { View } from "react-native";
import { IMenuItem } from "types/global.types";

const menuItems: IMenuItem[] = [
  { label: "Servicios", path: "/(tabs)/sales/sale_services", icon: "clipboard" },
  { label: "Cuadre", path: "/(tabs)/sales/current_day", icon: "clipboard" },
  {
    label: "Reportes",
    path: "/(tabs)/sales/list",
    icon: "calendar"
  },
  {
    label: "Deudas",
    path: "/(tabs)/sales/debts",
    icon: "cash-outline"
  }
];

export default function SalesLayout() {
  return (
    <View className="flex-1">
      <NavigationMenu items={menuItems} />
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </View>
  );
}
