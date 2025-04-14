import AppTitle from "components/AppTitle";
import { GridOutlineIcon, InputIcon, PeopleGroupIcon, PersonIcon, WalletOutlineIcon } from "components/Icons";
import { useTheme } from "contexts/ThemeContext";
import { Tabs } from "expo-router";
import useColors from "hooks/useColors";
import { ImageBackground, Pressable, Text, View } from "react-native";
import colors from "styles/colors";

// Icon components defined outside the parent component
const GridIcon = ({ color, size }: { color: string; size: number }) => <GridOutlineIcon size={size} color={color} />;

const WalletIcon = ({ color, size }: { color: string; size: number }) => (
  <WalletOutlineIcon size={size} color={color} />
);

const EntryIcon = ({ color, size }: { color: string; size: number }) => <InputIcon size={size} color={color} />;

const StatsIcon = ({ color, size }: { color: string; size: number }) => <PeopleGroupIcon size={size} color={color} />;

const ProfileIcon = ({ color, size }: { color: string; size: number }) => <PersonIcon size={size} color={color} />;

export default function TabsLayout() {
  const defaultColors = useColors();
  const { toggleTheme } = useTheme();

  const headerBackground = () => (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("assets/images/header-bg.jpg")}
        style={{
          width: "100%",
          height: "100%"
        }}
      />
      <View
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)"
        }}
      />
    </View>
  );

  const headerLeft = () => <AppTitle />;

  const headerRight = () => (
    <View style={{ paddingRight: 16, flexDirection: "row", gap: 16 }}>
      <Pressable
        onPress={toggleTheme}
        style={{
          backgroundColor: defaultColors.primary,
          padding: 8,
          borderRadius: 8
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Cambiar Tema</Text>
      </Pressable>
    </View>
  );

  // Definir la configuración de las pestañas en un array
  const tabsConfig = [
    {
      name: "index",
      title: "Inicio",
      icon: GridIcon
    },
    {
      name: "sales",
      title: "Ventas",
      icon: WalletIcon
    },
    {
      name: "entries",
      title: "Entradas",
      icon: EntryIcon
    },
    {
      name: "personal/index",
      title: "Personal",
      icon: StatsIcon
    },
    {
      name: "profile/index",
      title: "Profile",
      icon: ProfileIcon
    }
  ];

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
          borderTopRightRadius: 5
        },
        tabBarActiveTintColor: colors.primary.light,
        tabBarInactiveTintColor: colors.darkMode.textSecondary.light,
        headerBackground: headerBackground,
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
        headerLeft: headerLeft,
        headerRight: headerRight
      }}
    >
      {tabsConfig.map((tab) => (
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
  );
}
