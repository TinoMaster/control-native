import { Feather } from "@expo/vector-icons";
import { CloseSessionButton } from "components/CloseSessionButton";
import { PageTitle } from "components/PageTitle";
import { SettingButton } from "components/ui/SettingButton";
import { useRouter } from "expo-router";
import { SettingSection } from "features/settings/components/SettingSection";
import { ToggleAppMode } from "features/settings/components/ToggleAppMode";
import useColors from "hooks/useColors";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const router = useRouter();
  const defaultColors = useColors();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: defaultColors.background }]} edges={["bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={defaultColors.text} />
        </TouchableOpacity>
        <PageTitle title="Configuración" />
      </View>

      <ScrollView style={styles.content}>
        <SettingSection title="Apariencia">
          <ToggleAppMode />
        </SettingSection>

        <SettingSection title="Cuenta">
          <SettingButton
            onPress={() => router.push("/(tabs)/profile")}
            icon="person"
            title="Mi Perfil"
            accessibilityRole="button"
            accessibilityLabel="Ver perfil de usuario"
            iconRight
          />

          <CloseSessionButton />
        </SettingSection>

        <SettingSection title="Información">
          <SettingButton
            onPress={() => router.push("/(tabs)/profile")}
            icon="link"
            title="Acerca de"
            accessibilityRole="button"
            accessibilityLabel="Ver información de la aplicación"
            iconRight
          />
        </SettingSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16
  },
  content: {
    flex: 1,
    paddingHorizontal: 24
  }
});
