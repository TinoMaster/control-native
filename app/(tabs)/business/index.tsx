import { PageTitle } from "components/PageTitle";
import { SettingButton } from "components/ui/SettingButton";
import { useRouter } from "expo-router";
import useColors from "hooks/useColors";
import { ERole } from "models/api";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useAuthStore } from "store/auth.store";

export default function BusinessScreen() {
  const { role, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const defaultColors = useColors();

  // Verificar si el usuario tiene permisos de administrador o propietario
  const hasBusinessAccess = isLoggedIn && (role === ERole.ADMIN || role === ERole.OWNER);

  // Redirigir si no tiene permisos
  useEffect(() => {
    if (!hasBusinessAccess) {
      router.replace("/");
    }
  }, [hasBusinessAccess, router]);

  // Si no tiene permisos, no mostrar nada mientras se redirige
  if (!hasBusinessAccess) {
    return null;
  }

  return (
    <ScrollView
      className="flex-1"
      style={{
        backgroundColor: defaultColors.background
      }}
    >
      <PageTitle title="Gestión de Negocios" icon="business" />
      <View className="p-6 gap-6">
        <SettingButton
          onPress={() => router.push("/(tabs)/business/my_businesses")}
          icon="business"
          title="Mis Negocios"
          accessibilityRole="button"
          accessibilityLabel="Ver mis negocios"
          iconRight
        />
        <SettingButton
          onPress={() => router.push("/(tabs)/business/my_businesses")}
          icon="bar-chart"
          title="Estadísticas de Negocios"
          accessibilityRole="button"
          accessibilityLabel="Ver estadísticas de negocios"
          iconRight
        />
      </View>
    </ScrollView>
  );
}
