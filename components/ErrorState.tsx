import { useRouter } from "expo-router";
import useColors from "hooks/useColors";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ErrorStateProps {
  readonly title: string;
  readonly message: string;
  readonly actionText?: string;
  readonly onAction?: () => void;
  readonly showBackButton?: boolean;
}

export function ErrorState({
  title,
  message,
  actionText = "Volver",
  onAction,
  showBackButton = true
}: ErrorStateProps) {
  const router = useRouter();
  const colors = useColors();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>

        {showBackButton && (
          <Pressable onPress={handleAction} style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.buttonText}>{actionText}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center"
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 24
  },
  button: {
    minWidth: 200,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  }
});
