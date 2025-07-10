import ProtectedRoute from "components/auth/ProtectedRoute";
import { BusinessIcon, StatsIcon } from "components/Icons";
import { Redirect, Tabs } from "expo-router";
import { HeaderBackground } from "features/layouts/(tabs)_layout/HeaderBackground";
import { HeaderLeft } from "features/layouts/(tabs)_layout/HeaderLeft";
import { HeaderRight } from "features/layouts/(tabs)_layout/HeaderRight";
import { tabsConfig } from "features/layouts/(tabs)_layout/tabs.configs";
import useColors from "hooks/useColors";
import { ERole } from "models/api";
import { useAuthStore } from "store/auth.store";
import colors from "styles/colors";
import { ITabsItem } from "types/global.types";

// TabIcon component extracted from the parent component
function TabIcon({
  icon: Icon,
  color,
  size
}: Readonly<{ icon: ITabsItem["icon"]; color: string; size: number }>) {
  return <Icon color={color} size={size} />;
}

export default function TabsLayout() {
  const defaultColors = useColors();
  const { role, isLoggedIn } = useAuthStore();

  if (role === ERole.SUPERADMIN) {
    return <Redirect href="/(admin)" />;
  }

  const hasAdminAccess = isLoggedIn && (role === ERole.ADMIN || role === ERole.OWNER);

  const localTabsConfig = [...tabsConfig];

  if (hasAdminAccess) {
    localTabsConfig.push({
      name: "personal",
      title: "Personal",
      icon: StatsIcon
    });
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
            backgroundColor: colors.background.dark.secondary,
            borderTopWidth: 0,
            elevation: 0,
            height: 60,
            paddingTop: 4
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
              tabBarIcon: ({ color, size }) => (
                <TabIcon icon={tab.icon} color={color} size={size} />
              ),
              href:
                !hasAdminAccess && (tab.name === "personal" || tab.name === "business")
                  ? null
                  : undefined
            }}
          />
        ))}
      </Tabs>
    </ProtectedRoute>
  );
}
