import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { useAuthStore } from "store/auth.store";
import { ERole } from "models/api";
import { useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import useColors from "hooks/useColors";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BusinessScreen() {
  const { role, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const defaultColors = useColors();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  // Verificar si el usuario tiene permisos de administrador o propietario
  const hasBusinessAccess = isLoggedIn && (role === ERole.ADMIN || role === ERole.OWNER);

  // Redirigir si no tiene permisos
  useEffect(() => {
    if (!hasBusinessAccess) {
      router.replace("/");
    }
  }, [hasBusinessAccess, router]);

  // Función para refrescar la página
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Aquí puedes añadir la lógica para recargar los datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Si no tiene permisos, no mostrar nada mientras se redirige
  if (!hasBusinessAccess) {
    return null;
  }

  // Datos de ejemplo para los negocios
  const businessList = [
    { id: 1, name: "Cafetería Central", location: "Calle Principal 123", employees: 8 },
    { id: 2, name: "Restaurante El Sabor", location: "Avenida Norte 456", employees: 15 },
    { id: 3, name: "Tienda de Ropa Fashion", location: "Plaza Comercial 789", employees: 5 }
  ];

  return (
    <ScrollView
      className="flex-1"
      style={{
        backgroundColor: defaultColors.background,
        paddingTop: insets.top
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center">
            <Feather name="briefcase" size={24} color={defaultColors.primary} />
            <Text className="text-2xl font-bold ml-2" style={{ color: defaultColors.text }}>
              Gestión de Negocios
            </Text>
          </View>
          <TouchableOpacity
            className="bg-opacity-90 rounded-full p-2"
            style={{ backgroundColor: defaultColors.primary }}
            onPress={() => {
              // Aquí puedes implementar la lógica para añadir un nuevo negocio
              console.log("Añadir nuevo negocio");
            }}
            accessibilityLabel="Añadir nuevo negocio"
            accessibilityRole="button"
          >
            <Feather name="plus" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="mb-4" style={{ color: defaultColors.textSecondary }}>
          Administra los negocios registrados en el sistema. Puedes crear, editar y gestionar todos los negocios desde
          esta sección.
        </Text>

        {/* Lista de negocios */}
        {businessList.map((business) => (
          <TouchableOpacity
            key={business.id}
            className="rounded-lg p-4 mb-4 flex-row items-center justify-between"
            style={{ backgroundColor: defaultColors.background === "#F5F5F5" ? "#FFFFFF" : "#2A2A2A" }}
            onPress={() => {
              // Aquí puedes implementar la navegación al detalle del negocio
              console.log(`Ver detalles del negocio ${business.id}`);
            }}
            accessibilityLabel={`Ver detalles de ${business.name}`}
            accessibilityRole="button"
          >
            <View className="flex-1">
              <Text className="text-lg font-semibold" style={{ color: defaultColors.text }}>
                {business.name}
              </Text>
              <Text style={{ color: defaultColors.textSecondary }}>{business.location}</Text>
              <View className="flex-row items-center mt-2">
                <Feather name="users" size={14} color={defaultColors.textSecondary} />
                <Text className="ml-1" style={{ color: defaultColors.textSecondary }}>
                  {business.employees} empleados
                </Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color={defaultColors.textSecondary} />
          </TouchableOpacity>
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
              {businessList.reduce((total, business) => total + business.employees, 0)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
