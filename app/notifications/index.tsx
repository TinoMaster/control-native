import { Feather } from "@expo/vector-icons";
import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { MyScrollView } from "components/ui/MyScrollView";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "styles/colors";

export default function Notifications() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <GradientBackground>
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
            <Text style={styles.headerTitle}>Notificaciones</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Contenido con SafeAreaView para los bordes inferiores */}
      <SafeAreaView edges={["bottom"]} style={styles.contentContainer}>
        <MyScrollView>
          <ContentWrapper withHeader={false}>
            <Text style={{ color: "#FFFFFF" }}>Lista de Notificaciones</Text>
          </ContentWrapper>
        </MyScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
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
