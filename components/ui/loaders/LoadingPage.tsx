import useColors from "hooks/useColors";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingPageProps {
  readonly message?: string;
  readonly absolute?: boolean;
}

export default function LoadingPage({ message = "Cargando...", absolute = false }: LoadingPageProps) {
  const colors = useColors();

  if (absolute) {
    return (
      <View style={[styles.absoluteContainer]}>
        <View style={[styles.overlay, { backgroundColor: colors.background + "99" }]}>
          <View style={styles.content}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.text, { color: colors.text }]}>{message}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.text, { color: colors.text }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  absoluteContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 5
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    alignItems: "center",
    padding: 20
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500"
  }
});
