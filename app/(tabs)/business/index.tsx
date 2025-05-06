import { Feather } from "@expo/vector-icons";
import { PageTitle } from "components/PageTitle";
import { useRouter } from "expo-router";
import { BusinessCard } from "features/business/BusinessCard";
import useColors from "hooks/useColors";
import { ERole } from "models/api";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useAuthStore } from "store/auth.store";
import { useBusinessStore } from "store/business.store";

export default function BusinessScreen() {
  const { role, isLoggedIn } = useAuthStore();
  const { businessList } = useBusinessStore();
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
      <PageTitle
        title="Gestión de Negocios"
        showAddButton
        onPressAddButton={() => console.log("Añadir nuevo negocio")}
        icon="business"
      />
      <View className="px-4">
        <Text className="mb-4" style={{ color: defaultColors.textSecondary }}>
          Administra tus negocios. Puedes crear, editar y gestionar todos los negocios desde esta sección.
        </Text>

        {/* Lista de negocios */}
        {businessList.map((business) => (
          <BusinessCard key={business.id} business={business} onPress={() => console.log("Ver detalles del negocio")} />
        ))}

        {/* Sección de estadísticas */}
        <View
          className="rounded-lg p-4 mt-4"
          style={{ backgroundColor: defaultColors.background === "#F5F5F5" ? "#FFFFFF" : "#2A2A2A" }}
        >
          <Text className="text-lg font-semibold mb-3" style={{ color: defaultColors.text }}>
            Resumen
          </Text>

          <View className="flex-row justify-between mb-2">
            <View className="flex-row items-center">
              <Feather name="briefcase" size={16} color={defaultColors.primary} />
              <Text className="ml-2" style={{ color: defaultColors.text }}>
                Total de negocios
              </Text>
            </View>
            <Text className="font-semibold" style={{ color: defaultColors.text }}>
              {businessList.length}
            </Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <View className="flex-row items-center">
              <Feather name="users" size={16} color={defaultColors.primary} />
              <Text className="ml-2" style={{ color: defaultColors.text }}>
                Total de empleados
              </Text>
            </View>
            <Text className="font-semibold" style={{ color: defaultColors.text }}>
              {businessList.reduce((total, business) => total + (business.users?.length ?? 0), 0)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
