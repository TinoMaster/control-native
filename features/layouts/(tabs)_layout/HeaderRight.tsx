import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useColors from "hooks/useColors";
import { Pressable, View } from "react-native";

export function HeaderRight() {
  const router = useRouter();
  const defaultColors = useColors();

  return (
    <View style={{ paddingRight: 16, flexDirection: "row", gap: 16 }}>
      <Pressable
        onPress={() => router.push({ pathname: "../settings" })}
        style={{
          padding: 8,
          borderRadius: 8
        }}
        accessibilityLabel="Configuración"
        accessibilityRole="button"
      >
        <Feather name="settings" size={24} color={defaultColors.text} />
      </Pressable>
    </View>
  );
}
