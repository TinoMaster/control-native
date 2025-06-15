import { CloseSessionButton } from "components/CloseSessionButton";
import { CustomHeader } from "components/ui/CustomHeader";
import useColors from "hooks/useColors";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const defaultColors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <CustomHeader title="Perfil" />

      <View style={styles.section}>
        <CloseSessionButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  section: {
    overflow: "hidden",
    padding: 16,
    gap: 20
  }
});
