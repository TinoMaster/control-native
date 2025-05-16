import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { loginSchema, TLoginSchema, zLoginDefaultValues } from "models/zod/login.schema";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { authService } from "services/auth.service";
import { userService } from "services/user.service";
import { useAuthStore } from "store/auth.store";

export default function LoginScreen() {
  const [error, setError] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: zLoginDefaultValues
  });

  useEffect(() => {
    checkUserExistence();
  }, []);

  const checkUserExistence = async () => {
    try {
      const response = await userService.existAnyUser();
      console.log("User existence response:", response);
      if (!response) {
        // If no users exist, redirect to superadmin registration
        router.replace("/(auth)/superadmin");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      setError("Error al verificar usuarios existentes");
    } finally {
      setIsCheckingUser(false);
    }
  };

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    try {
      setError("");
      const response = await authService.login(data);

      if (response.status === 200 && response.data) {
        if (response.data.active) {
          await login(response.data.token, response.data.role, response.data.refreshToken);
          router.replace("/(tabs)");
        } else {
          setError("Tu cuenta está inactiva. Por favor, contacta al administrador.");
        }
      } else {
        setError(response.message || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión");
    }
  };

  if (isCheckingUser) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>Ingresa tus credenciales para continuar</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Correo electrónico"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                editable={!isCheckingUser}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Contraseña"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                editable={!isCheckingUser}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
          )}
        />

        <Button title="Iniciar Sesión" onPress={handleSubmit(onSubmit)} disabled={isCheckingUser} />

        <Button onPress={() => router.push("/(auth)/business")} title="Registrar Nuevo Negocio" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32
  },
  form: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center"
  },
  inputContainer: {
    marginBottom: 16
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  inputError: {
    borderColor: "#ff3b30"
  },
  error: {
    color: "#ff3b30",
    textAlign: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#ffebee",
    borderRadius: 8
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 8
  },
  secondaryButton: {
    marginTop: 12,
    paddingVertical: 6
  }
});
