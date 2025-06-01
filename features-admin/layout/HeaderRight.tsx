import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export function HeaderRight() {
  const router = useRouter();

  return (
    <View style={{ paddingRight: 16, flexDirection: "row", gap: 16 }}>
      <Pressable
        onPress={() => router.push("/settings")}
        style={{
          padding: 8,
          borderRadius: 8
        }}
        accessibilityLabel="Configuración"
        accessibilityRole="button"
      >
        <Feather name="settings" size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
