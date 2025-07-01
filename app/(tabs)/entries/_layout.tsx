import { Ionicons } from "@expo/vector-icons";
import NavigationMenu from "components/ui/menus/NavigationMenu";
import { Stack } from "expo-router";
import { View } from "react-native";

const menuItems: {
  label: string;
  path: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { label: "Servicios", path: "/(tabs)/entries/services", icon: "hammer" },
  {
    label: "Insumos",
    path: "/(tabs)/entries/consumables",
    icon: "flask-sharp"
  },
  {
    label: "Gastos",
    path: "/(tabs)/entries/expenses",
    icon: "arrow-up-circle-outline"
  },
  {
    label: "Transfer",
    path: "/(tabs)/entries/transfers",
    icon: "swap-horizontal-outline"
  },
  {
    label: "Category",
    path: "/(tabs)/entries/categories",
    icon: "pricetags-outline"
  },
  {
    label: "Config",
    path: "/(tabs)/entries/settings",
    icon: "settings-outline"
  }
];

export default function EntriesLayout() {
  return (
    <View className="flex-1">
      <NavigationMenu items={menuItems} />
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false
          }}
        />
      </View>
    </View>
  );
}
