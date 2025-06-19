import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export function HeaderRight() {
  const router = useRouter();

  return (
    <View style={{ paddingRight: 16, flexDirection: "row", gap: 8 }}>
      {/* Tareas */}
      <Pressable
        onPress={() => router.push("/tasks")}
        style={{
          padding: 8,
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.3)"
        }}
        accessibilityLabel="Tareas"
        accessibilityRole="button"
      >
        <Feather name="file-text" size={24} color="#FFFFFF" />
      </Pressable>
      {/* Notificaciones */}
      <Pressable
        onPress={() => router.push("/notifications")}
        style={{
          padding: 8,
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.3)"
        }}
        accessibilityLabel="Notificaciones"
        accessibilityRole="button"
      >
        <Feather name="bell" size={24} color="#FFFFFF" />
      </Pressable>
      {/* Configuración */}
      <Pressable
        onPress={() => router.push("/settings")}
        style={{
          padding: 8,
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.3)"
        }}
        accessibilityLabel="Configuración"
        accessibilityRole="button"
      >
        <Feather name="settings" size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
