import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export const HeaderActionsServiceSales = () => {
  const router = useRouter();

  return (
    <View className="flex-row items-end">
      <Pressable
        onPress={() => router.push("/(tabs)/sales/sale_services/create_service_sale" as any)}
        className="p-2 rounded-full bg-gray-800/50"
      >
        <Ionicons name="ellipsis-vertical" size={22} color="#ffffff" />
      </Pressable>
    </View>
  );
};
