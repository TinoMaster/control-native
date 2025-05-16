import { zodResolver } from "@hookform/resolvers/zod";
import { useNotification } from "contexts/NotificationContext";
import { router } from "expo-router";
import { ERole } from "models/api";
import { SuperAdminModel } from "models/api/superadmin.model";
import {
  createSuperAdminSchema,
  TCreateSuperAdminSchema,
  zCreateSuperAdminDefaultValues
} from "models/zod/superadmin.schema";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { userService } from "services/user.service";

export default function SuperAdminRegistration() {
  const { showNotification } = useNotification();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TCreateSuperAdminSchema>({
    resolver: zodResolver(createSuperAdminSchema),
    defaultValues: zCreateSuperAdminDefaultValues
  });

  const onSubmit = async (data: TCreateSuperAdminSchema) => {
    try {
      const superAdminData: SuperAdminModel = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: ERole.SUPERADMIN
      };

      const response = await userService.createSuperAdmin(superAdminData);

      if (response.status === 200 && response.data) {
        showNotification("Super administrador creado correctamente", "success");
        router.replace("/");
      } else {
        showNotification(response.message || "Error al crear super administrador", "error");
      }
    } catch (error) {
      console.error("Error creating superadmin:", error);
      showNotification("Error al crear super administrador", "error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Super Administrador</Text>
      <Text style={styles.subtitle}>Crea la cuenta de super administrador para comenzar</Text>

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Nombre completo"
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
              />
              {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </View>
          )}
        />

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
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
          )}
        />

        <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting} title="Crear Super Admin" />
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
  }
});
