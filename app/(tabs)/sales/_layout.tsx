import { Ionicons } from "@expo/vector-icons";
import NavigationMenu from "components/NavigationMenu";
import { Stack } from "expo-router";
import { View } from "react-native";

const menuItems: {
  label: string;
  path: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { label: "Dia actual", path: "/(tabs)/sales/current_day", icon: "clipboard" },
  {
    label: "Lista de ventas",
    path: "/(tabs)/sales/list",
    icon: "calendar"
  }
];

export default function SalesLayout() {
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
