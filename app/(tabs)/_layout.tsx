import { Tabs } from "expo-router";
import { View, ImageBackground, TouchableOpacity, Text } from "react-native";
import useColors from "hooks/useColors";
import {
  GridOutlineIcon,
  WalletOutlineIcon,
  AddIcon,
  StatsChartOutlineIcon,
  PersonOutlineIcon,
} from "components/Icons";
import AppTitle from "components/AppTitle";
import { useTheme } from "context/ThemeContext";

export default function TabsLayout() {
  const colors = useColors();
  const { toggleTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
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
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
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
          color: colors.text,
          fontWeight: "bold",
        },
        headerTitle: "",
        headerLeft: () => <AppTitle />,
        headerRight: () => (
          <View style={{ paddingRight: 16, flexDirection: "row", gap: 16 }}>
            <TouchableOpacity
              onPress={toggleTheme}
              style={{
                backgroundColor: colors.primary,
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Cambiar Tema
              </Text>
            </TouchableOpacity>
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
        name="add"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 30,
                marginTop: -20,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AddIcon color="white" />
            </View>
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
