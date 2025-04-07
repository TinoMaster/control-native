import { Stack, usePathname } from "expo-router";
import { View } from "react-native";
import NavigationMenu from "components/NavigationMenu";

const menuItems: { label: string; path: `/(tabs)/entries${string}`; icon: string }[] = [
  { label: "Todos", path: "/(tabs)/entries", icon: "grid-outline" },
  { label: "Ingresos", path: "/(tabs)/entries/income", icon: "arrow-down-circle-outline" },
  { label: "Gastos", path: "/(tabs)/entries/expenses", icon: "arrow-up-circle-outline" },
  { label: "Transfer", path: "/(tabs)/entries/transfers", icon: "swap-horizontal-outline" },
  { label: "Categorías", path: "/(tabs)/entries/categories", icon: "pricetags-outline" },
  { label: "Configuración", path: "/(tabs)/entries/settings", icon: "settings-outline" },
];

export default function EntriesLayout() {
  const pathname = usePathname();

  return (
    <View className="flex-1">
      <View className="h-30">
        <NavigationMenu items={menuItems} activePath={pathname} />
      </View>
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              paddingTop: 16,
            },
          }}
        />
      </View>
    </View>
  );
}
