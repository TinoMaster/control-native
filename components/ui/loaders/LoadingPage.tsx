import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import useColors from "hooks/useColors";
import { MotiView } from "moti";

interface LoadingPageProps {
  readonly message?: string;
}

export default function LoadingPage({ message = "Cargando..." }: LoadingPageProps) {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MotiView
        from={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          type: "timing",
          duration: 300
        }}
        style={styles.content}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.text, { color: colors.text }]}>{message}</Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
