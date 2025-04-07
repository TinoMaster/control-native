import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "context/ThemeContext";
import { useRouter } from "expo-router";
import useColors from "hooks/useColors";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import colors from "styles/colors";

interface NavigationMenuProps {
  items: {
    label: string;
    path: `/(tabs)/entries${string}`;
    icon: string;
  }[];
  activePath: string;
}

export default function NavigationMenu({
  items,
  activePath,
}: NavigationMenuProps) {
  const router = useRouter();
  const defaultColors = useColors();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, { backgroundColor: defaultColors.background }]}
    >
      {items.map((item) => (
        <Pressable
          key={item.path}
          onPress={() => router.push(item.path as any)}
          style={[
            styles.button,
            activePath === item.path
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
        >
          <Ionicons
            name={item.icon as any}
            size={24}
            color="#fff"
          />
          <Text style={[styles.text]}>{item.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeButton: {
    backgroundColor: colors.primary.light,
  },
  inactiveButton: {
    backgroundColor: colors.primary.dark,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
    color: "#FFFFFF",
  },
});
