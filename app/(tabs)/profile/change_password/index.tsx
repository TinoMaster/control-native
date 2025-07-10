import { zodResolver } from "@hookform/resolvers/zod";
import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import { CustomInput } from "components/ui/inputs/CustomInput";
import MyButton from "components/ui/MyButton";
import { router } from "expo-router";
import useColors from "hooks/useColors";
import { ChangePasswordRequest } from "models/api/requests/changePassword.model";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { userService } from "services/user.service";
import { z } from "zod";

// Schema for password validation
const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "La contraseña actual debe tener al menos 6 caracteres"),
    newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "La confirmación debe tener al menos 6 caracteres")
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const defaultColors = useColors();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setIsLoading(true);

      const changePasswordRequest: ChangePasswordRequest = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      };

      const response = await userService.changePassword(changePasswordRequest);

      if (response.status === 200) {
        Alert.alert("Éxito", "Tu contraseña ha sido actualizada correctamente", [
          { text: "OK", onPress: () => router.back() }
        ]);
        reset();
      } else {
        Alert.alert("Error", response.message || "No se pudo cambiar la contraseña");
      }
    } catch (error) {
      Alert.alert("Error", "Ha ocurrido un error al cambiar la contraseña");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GradientBackground>
      <CustomHeader title="Cambiar contraseña" showBackButton />
      <ContentWrapper>
        <View className="p-4">
          <Text
            style={{ color: defaultColors.text }}
            className="text-2xl font-bold mb-6 text-center"
          >
            Actualiza tu contraseña
          </Text>

          <View>
            <Controller
              control={control}
              name="oldPassword"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Contraseña actual"
                  placeholder="••••••••"
                  icon="🔒"
                  value={value}
                  isPassword
                  onChangeText={onChange}
                  error={errors.oldPassword?.message}
                  autoCapitalize="none"
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Nueva contraseña"
                  placeholder="••••••••"
                  icon="🔒"
                  value={value}
                  isPassword
                  onChangeText={onChange}
                  error={errors.newPassword?.message}
                  autoCapitalize="none"
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Confirmar nueva contraseña"
                  placeholder="••••••••"
                  icon="🔒"
                  value={value}
                  isPassword
                  onChangeText={onChange}
                  error={errors.confirmPassword?.message}
                  autoCapitalize="none"
                />
              )}
            />
          </View>

          <MyButton
            label={isLoading ? "Actualizando..." : "Actualizar contraseña"}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ContentWrapper>
    </GradientBackground>
  );
};

export default ChangePasswordScreen;
