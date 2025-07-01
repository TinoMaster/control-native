import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { usePathname, useRouter } from "expo-router";
import useColors from "hooks/useColors";
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import colors from "styles/colors";
import { IMenuItem } from "types/global.types";

interface NavigationMenuProps {
  readonly items: IMenuItem[];
}

// Función auxiliar para determinar el estilo del botón basado en estado activo y número de elementos
function getButtonStyle(isActive: boolean, hasFewItems: boolean) {
  if (isActive) {
    return hasFewItems ? styles.fewItemsActiveButton : styles.activeButton;
  }
  return hasFewItems ? styles.fewItemsInactiveButton : styles.inactiveButton;
}

export default function NavigationMenu({ items }: NavigationMenuProps) {
  const defaultColors = useColors();
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();

  const activePath = pathname.split("/").pop() ?? "";
  const hasFewItems = items.length < 6;

  return (
    <View
      style={{
        backgroundColor: defaultColors.background
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={hasFewItems ? styles.fewItemsContainer : undefined}
        style={[styles.container, { backgroundColor: colors.background.dark.primary }]}
      >
        {items.map((item) => (
          <LinearGradient
            key={item.path}
            colors={[colors.background.dark.secondary, colors.background.dark.primary]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={[
              hasFewItems ? styles.fewItemsButton : styles.button,
              hasFewItems && { width: Math.min(width / items.length - 24, 120) }
            ]}
          >
            <Pressable
              onPress={() => router.push(item.path as any)}
              style={[
                hasFewItems ? styles.fewItemsButton : styles.button,
                getButtonStyle(item.path.includes(activePath), hasFewItems),
                hasFewItems && { width: Math.min(width / items.length - 24, 120) }
              ]}
            >
              <Ionicons name={item.icon} size={hasFewItems ? 20 : 24} color="#fff" />
              <Text
                style={[
                  hasFewItems ? styles.fewItemsText : styles.text,
                  item.path.includes(activePath) ? styles.activeText : styles.inactiveText
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 16
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 35,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  activeButton: {
    borderColor: colors.primary.light,
    borderWidth: 2,
    backgroundColor: colors.primary.dark
  },
  inactiveButton: {
    borderColor: colors.background.dark.secondary,
    borderWidth: 2
  },
  text: {
    fontSize: 8,
    fontWeight: "500",
    marginTop: 4
  },
  activeText: {
    color: "#fff"
  },
  inactiveText: {
    color: "#fff"
  },
  // Estilos para pocos elementos
  fewItemsContainer: {
    flexGrow: 1,
    justifyContent: "space-evenly"
  },
  fewItemsButton: {
    height: 60,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  fewItemsActiveButton: {
    borderColor: colors.primary.light,
    borderWidth: 2,
    backgroundColor: colors.primary.dark
  },
  fewItemsInactiveButton: {
    borderColor: colors.background.dark.secondary,
    borderWidth: 2
  },
  fewItemsText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center"
  }
});
