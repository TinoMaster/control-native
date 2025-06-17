import useColors from "hooks/useColors";
import { StyleSheet, Text, View } from "react-native";

interface SettingSectionProps {
  readonly children: React.ReactNode;
  readonly title: string;
}

export function SettingSection({ children, title }: SettingSectionProps) {
  const defaultColors = useColors();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>{title}</Text>
      <View style={styles.innerSection}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 10
  },
  innerSection: {
    padding: 16,
    gap: 26
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12
  }
});
