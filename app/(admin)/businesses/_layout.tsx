import { Ionicons } from "@expo/vector-icons";
import NavigationMenu from "components/NavigationMenu";
import { Stack } from "expo-router";
import { View } from "react-native";

const menuItems: {
  label: string;
  path: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { label: "Mis Negocios", path: "/(admin)/businesses/my_businesses", icon: "business" },
  { label: "Autorizaciones", path: "/(admin)/businesses/authorizations", icon: "key" }
];

export default function BusinessesLayout() {
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
