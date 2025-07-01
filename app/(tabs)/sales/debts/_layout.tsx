import { CategorySelector } from "components/ui/menus/CategorySelector";
import { Stack } from "expo-router";
import { View } from "react-native";
import { ICategoryItem } from "types/global.types";

const menuItems: ICategoryItem[] = [
  {
    id: "debt",
    label: "Deudas del día",
    route: "/(tabs)/sales/debts"
  }
];

export default function DebtsLayout() {
  return (
    <View className="flex-1">
      <CategorySelector
        categories={menuItems}
        activeCategory={"debt"}
        handleCategoryPress={() => {}}
      />
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </View>
  );
}
