import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "context/ThemeContext";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "store/auth.store";

export default function ProfileScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const logout = useAuthStore((state) => state.logout);

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1A1A1A" : "#FFFFFF" },
      ]}
    >
      <View style={styles.content}>
        <Text
          style={[styles.title, { color: isDarkMode ? "#FFFFFF" : "#1F2937" }]}
        >
          Configuración
        </Text>

        <View style={styles.section}>
          <TouchableOpacity style={styles.option} onPress={toggleTheme}>
            <Ionicons
              name={isDarkMode ? "moon" : "sunny"}
              size={24}
              color={isDarkMode ? "#FFFFFF" : "#1F2937"}
            />
            <Text
              style={[
                styles.optionText,
                { color: isDarkMode ? "#FFFFFF" : "#1F2937" },
              ]}
            >
              {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
            <Text style={[styles.optionText, { color: "#FF3B30" }]}>
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
  },
});
