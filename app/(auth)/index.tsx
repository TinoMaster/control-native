import { router } from "expo-router";
import { ERole } from "models/api";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuthStore } from "store/auth.store";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      setError("");
      // Aquí deberías hacer la llamada real a tu API
      // Por ahora usamos un token dummy para pruebas
      await login("dummy-token", ERole.SUPERADMIN, "dummy-refresh-token");
      // Solo navegamos si el login fue exitoso
      router.replace("/(tabs)");
    } catch (err) {
      setError("Error al iniciar sesión");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Iniciar Sesión" onPress={handleLogin} />

      <Text
        style={styles.registerText}
        /* onPress={() => router.push("/register")} */
      >
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  registerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#007AFF",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
