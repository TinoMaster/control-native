import { Feather } from "@expo/vector-icons";
import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { Slot, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "styles/colors";

export default function TaskDetailLayout() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
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
            <Text style={styles.headerTitle}>Detalle de Tarea</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Contenido de la página actual */}
      <View style={styles.content}>
        <GradientBackground>
          {/* Contenido con SafeAreaView para los bordes inferiores */}
          <SafeAreaView edges={["bottom"]} style={styles.contentContainer}>
            <ContentWrapper withHeader={false}>
              <Slot />
            </ContentWrapper>
          </SafeAreaView>
        </GradientBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
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
  content: {
    flex: 1
  }
});
