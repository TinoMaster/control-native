import { CategorySelector } from "components/ui/menus/CategorySelector";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ICategoryItem } from "types/global.types";

const menuItems: ICategoryItem[] = [
  {
    id: "debt",
    label: "Deudas del día",
    route: "/(tabs)/sales/debts"
  },
  {
    id: "all_debts",
    label: "Todas las deudas",
    route: "/(tabs)/sales/debts/all_debts"
  }
];

export default function DebtsLayout() {
  const [activeCategory, setActiveCategory] = useState("debt");
  const router = useRouter();

  const handleCategoryPress = (category: ICategoryItem) => {
    setActiveCategory(category.id);
    router.push(category.route);
  };

  return (
    <View className="flex-1">
      <CategorySelector
        categories={menuItems}
        activeCategory={activeCategory}
        handleCategoryPress={handleCategoryPress}
      />
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </View>
  );
}
