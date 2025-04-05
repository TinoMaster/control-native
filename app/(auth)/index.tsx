import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import {
  loginSchema,
  TLoginSchema,
  zLoginDefaultValues,
} from "models/zod/login.schema";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { authService } from "services/authService";
import { useAuthStore } from "store/auth.store";

export default function LoginScreen() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: zLoginDefaultValues,
  });

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    try {
      setLoading(true);
      setError("");

      const response = await authService.login(data);

      if (response.status === 200 && response.data) {
        if (response.data.active) {
          await login(
            response.data.token,
            response.data.role,
            response.data.refreshToken
          );
          router.replace("/(tabs)");
        } else {
          setError(
            "Tu cuenta está inactiva. Por favor, contacta al administrador."
          );
        }
      } else {
        setError(response.message || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Contraseña"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <Button
        title={loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />

      <Text
        style={styles.registerText}
        /* onPress={() => router.push("/register")} */
      >
        ¿No tienes cuenta? Registra nuevo negocio
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
  inputError: {
    borderColor: "red",
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
