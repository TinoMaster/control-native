import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useColors from "hooks/useColors";
import { Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "store/auth.store";
import colors from "styles/colors";

export function CloseSessionButton() {
  const logout = useAuthStore((state) => state.logout);
  const defaultColors = useColors();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)");
  };
  return (
    <TouchableOpacity className="flex-row items-center gap-2" onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={24} color={colors.error.light} />
      <Text style={{ color: defaultColors.text }}>Cerrar Sesión</Text>
    </TouchableOpacity>
  );
}
