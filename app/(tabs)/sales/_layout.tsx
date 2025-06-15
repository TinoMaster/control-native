import { Ionicons } from "@expo/vector-icons";
import NavigationMenu from "components/NavigationMenu";
import { Stack } from "expo-router";
import { HeaderActionsServiceSales } from "features/sales/sale_services/components/HeaderActions";
import { View } from "react-native";

const menuItems: {
  label: string;
  path: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
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

const HeaderRightSaleServices = () => {
  return <HeaderActionsServiceSales />;
};

export default function SalesLayout() {
  return (
    <View className="flex-1">
      <NavigationMenu items={menuItems} />
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="sale_services/index" />
      </Stack>
    </View>
  );
}
