import { CloseSessionButton } from "components/CloseSessionButton";
import { PageTitle } from "components/PageTitle";
import { ToggleAppMode } from "features/config/components/ToggleAppMode";
import useColors from "hooks/useColors";
import { StyleSheet, View } from "react-native";

export default function ConfigScreen() {
  const defaultColors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <PageTitle title="Configuración" />

      <View style={styles.section}>
        <ToggleAppMode />
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
