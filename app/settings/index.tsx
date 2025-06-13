import { Feather } from "@expo/vector-icons";
import { CloseSessionButton } from "components/CloseSessionButton";
import { ContentWrapper } from "components/ContentWrapper";
import { MyScrollView } from "components/ui/MyScrollView";
import { SettingButton } from "components/ui/SettingButton";
import { useRouter } from "expo-router";
import { SettingSection } from "features/settings/components/SettingSection";
import { ToggleAppMode } from "features/settings/components/ToggleAppMode";
import useColors from "hooks/useColors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "styles/colors";

export default function Settings() {
  const router = useRouter();
  const defaultColors = useColors();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      {/* Header con SafeAreaView específico para la parte superior */}
      <View style={[styles.headerContainer, { backgroundColor: colors.background.dark.primary }]}>
        <SafeAreaView edges={["top"]} style={styles.safeHeader}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleGoBack}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Volver atrás"
            >
              <Feather name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Configuración</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Contenido con SafeAreaView para los bordes inferiores */}
      <SafeAreaView edges={["bottom"]} style={styles.contentContainer}>
        <MyScrollView>
          <ContentWrapper>
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
          </ContentWrapper>
        </MyScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    width: "100%",
    zIndex: 10,
    elevation: 3
  },
  safeHeader: {
    width: "100%"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  backButton: {
    padding: 8,
    marginRight: 8
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  },
  contentContainer: {
    flex: 1
  }
});
