import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { usePathname, useRouter } from "expo-router";
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
  const pathname = usePathname();

  console.log(pathname);
  console.log(activePath);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, { backgroundColor: defaultColors.background }]}
    >
      {items.map((item) => (
        <LinearGradient
          key={item.path}
          colors={[colors.primary.light, colors.primary.dark]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.button}
        >
          <Pressable
            onPress={() => router.push(item.path as any)}
            style={[
              styles.button,
              item.path.includes(activePath)
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
          >
            <Ionicons name={item.icon as any} size={24} color="#fff" />
            <Text
              style={[
                styles.text,
                item.path.includes(activePath)
                  ? styles.activeText
                  : styles.inactiveText,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        </LinearGradient>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.secondary.dark,
    borderWidth: 1,
  },
  activeButton: {
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  inactiveButton: {
    borderColor: colors.secondary.dark,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  activeText: {
    color: "#fff",
  },
  inactiveText: {
    color: "#fff",
  },
});
