import ProtectedRoute from "components/auth/ProtectedRoute";
import { Tabs } from "expo-router";
import { AdminTitle } from "features-admin/layout/AdminTitle";
import { HeaderAdminBackground } from "features-admin/layout/HeaderAdminBackground";
import { tabsAdminConfig } from "features-admin/layout/TabsAdmin.config";
import useColors from "hooks/useColors";
import colors from "styles/colors";

export default function AdminLayout() {
  const defaultColors = useColors();
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
          headerBackground: HeaderAdminBackground,
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
          headerTitle: AdminTitle
        }}
      >
        {tabsAdminConfig.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, size }) => tab.icon({ color, size })
            }}
          />
        ))}
      </Tabs>
    </ProtectedRoute>
  );
}
