import AppTitle from "components/AppTitle";
import {
  GridOutlineIcon,
  InputIcon,
  PersonOutlineIcon,
  StatsChartOutlineIcon,
  WalletOutlineIcon,
} from "components/Icons";
import { useTheme } from "contexts/ThemeContext";
import { Tabs } from "expo-router";
import useColors from "hooks/useColors";
import { ImageBackground, Pressable, Text, View } from "react-native";
import colors from "styles/colors";

export default function TabsLayout() {
  const defaultColors = useColors();
  const { toggleTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background.dark.primary,
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingTop: 4,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        },
        tabBarActiveTintColor: colors.primary.light,
        tabBarInactiveTintColor: colors.darkMode.textSecondary.light,
        headerBackground: () => (
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={require("assets/images/header-bg.jpg")}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            <View
              className="absolute top-0 left-0 right-0 bottom-0"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: defaultColors.text,
          fontWeight: "bold",
        },
        headerTitle: "",
        headerLeft: () => <AppTitle />,
        headerRight: () => (
          <View style={{ paddingRight: 16, flexDirection: "row", gap: 16 }}>
            <Pressable
              onPress={toggleTheme}
              style={{
                backgroundColor: defaultColors.primary,
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Cambiar Tema
              </Text>
            </Pressable>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <GridOutlineIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, size }) => (
            <WalletOutlineIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="entries"
        options={{
          title: "Entries",
          tabBarIcon: ({ color, size }) => (
            <InputIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color, size }) => (
            <StatsChartOutlineIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <PersonOutlineIcon size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
