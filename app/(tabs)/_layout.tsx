import ProtectedRoute from "components/auth/ProtectedRoute";
import { BusinessIcon } from "components/Icons";
import { Tabs } from "expo-router";
import { HeaderBackground } from "features/layouts/(tabs)_layout/HeaderBackground";
import { HeaderLeft } from "features/layouts/(tabs)_layout/HeaderLeft";
import { HeaderRight } from "features/layouts/(tabs)_layout/HeaderRight";
import { tabsConfig } from "features/layouts/(tabs)_layout/tabs.configs";
import useColors from "hooks/useColors";
import { ERole } from "models/api";
import { useAuthStore } from "store/auth.store";
import colors from "styles/colors";

export default function TabsLayout() {
  const defaultColors = useColors();
  const { role, isLoggedIn } = useAuthStore();

  // Verificar si el usuario tiene permisos de administrador o propietario
  const hasBusinessAccess = isLoggedIn && (role === ERole.ADMIN || role === ERole.OWNER);

  // Crear una copia local del array de configuración de pestañas
  const localTabsConfig = [...tabsConfig];

  // Si el usuario tiene permisos, agregar la pestaña de negocios a la copia local
  if (hasBusinessAccess) {
    localTabsConfig.push({
      name: "business",
      title: "Gestión",
      icon: BusinessIcon
    });
  }

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background.dark.primary,
            borderTopWidth: 0,
            elevation: 0,
            height: 60,
            paddingTop: 4,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
          },
          tabBarActiveTintColor: colors.primary.light,
          tabBarInactiveTintColor: colors.darkMode.textSecondary.light,
          headerBackground: HeaderBackground,
          tabBarLabelPosition: "below-icon",
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            shadowOpacity: 0
          },
          headerTitleStyle: {
            color: defaultColors.text,
            fontWeight: "bold"
          },
          headerTitle: "",
          headerLeft: HeaderLeft,
          headerRight: HeaderRight
        }}
      >
        {localTabsConfig.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, size }) => tab.icon({ color, size }),
              // Proteger la ruta de negocios a nivel de navegación
              href: tab.name === "business" && !hasBusinessAccess ? null : undefined
            }}
          />
        ))}
      </Tabs>
    </ProtectedRoute>
  );
}
