import NavigationMenu from "components/NavigationMenu";
import { Stack } from "expo-router";
import useColors from "hooks/useColors";
import { View } from "react-native";

const menuItems: {
  label: string;
  path: `/(tabs)/entries${string}`;
  icon: string;
}[] = [
  { label: "Servicios", path: "/(tabs)/entries/services", icon: "hammer" },
  {
    label: "Ingresos",
    path: "/(tabs)/entries/income",
    icon: "arrow-down-circle-outline",
  },
  {
    label: "Gastos",
    path: "/(tabs)/entries/expenses",
    icon: "arrow-up-circle-outline",
  },
  {
    label: "Transfer",
    path: "/(tabs)/entries/transfers",
    icon: "swap-horizontal-outline",
  },
  {
    label: "Category",
    path: "/(tabs)/entries/categories",
    icon: "pricetags-outline",
  },
  {
    label: "Config",
    path: "/(tabs)/entries/settings",
    icon: "settings-outline",
  },
];

export default function EntriesLayout() {
  const defaultColors = useColors();
  return (
    <View className="flex-1">
      <View
        style={{
          backgroundColor: defaultColors.background,
        }}
      >
        <NavigationMenu items={menuItems} />
      </View>
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </View>
  );
}
