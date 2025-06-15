import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import { MyScrollView } from "components/ui/MyScrollView";
import { SettingButton } from "components/ui/SettingButton";
import { useRouter } from "expo-router";
import { ERole } from "models/api";
import { useEffect } from "react";
import { View } from "react-native";
import { useAuthStore } from "store/auth.store";

export default function BusinessScreen() {
  const { role, isLoggedIn } = useAuthStore();
  const router = useRouter();

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
    <GradientBackground>
      <CustomHeader title="Gestión de Negocios" icon="business" />

      <MyScrollView>
        <ContentWrapper>
          <View className="p-6 gap-8">
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
        </ContentWrapper>
      </MyScrollView>
    </GradientBackground>
  );
}
