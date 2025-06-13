import { zodResolver } from "@hookform/resolvers/zod";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { useNotification } from "contexts/NotificationContext";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BusinessAddress } from "features-auth/business/components/BusinessAddress";
import { BusinessInfo } from "features-auth/business/components/BusinessInfo";
import { PersonalInfo } from "features-auth/business/components/PersonalInfo";
import {
  registerOwnerSchema,
  TRegisterOwnerDataModel,
  zRegisterDefaultValues
} from "features-auth/business/schemas/registerOwner.schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authService } from "services/auth.service";
import colors from "styles/colors";
import { getEmailExistsErrorMessage, isEmailExistsError } from "utilities/helpers/errorPatterns";

export default function BusinessRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TRegisterOwnerDataModel>({
    resolver: zodResolver(registerOwnerSchema),
    defaultValues: zRegisterDefaultValues
  });

  const onSubmit = async (data: TRegisterOwnerDataModel) => {
    try {
      setIsLoading(true);
      const response = await authService.registerOwner(data);

      if (response.status === 200) {
        showNotification("Negocio registrado exitosamente", "success");
        router.replace("/");
      } else if (response.status === 400) {
        // Check if the error is related to an existing email
        if (isEmailExistsError(response.message)) {
          showNotification(getEmailExistsErrorMessage(), "error");
        } else {
          showNotification("Error al registrar el negocio", "error");
        }
      } else {
        showNotification("Error al registrar el negocio", "error");
      }
    } catch (error) {
      console.error("Error registering business:", error);
      showNotification("Ocurrió un error al registrar el negocio", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1">
      <StatusBar style="light" />

      <GradientBackground
        variant="primary"
        intensity="medium"
        direction="left-right"
        style={{ justifyContent: "center", alignItems: "center", padding: 24 }}
      >
        <SafeAreaView className="flex-1 w-full" style={{ justifyContent: "center", gap: 24 }}>
          <View>
            <Text className="text-3xl font-bold text-center" style={{ color: colors.darkMode.text.light }}>
              Registrar Nuevo Negocio
            </Text>
            <Text className="text-base text-center mb-6" style={{ color: colors.darkMode.textSecondary.light }}>
              Completa la información requerida para registrar tu negocio
            </Text>
          </View>

          {/* Personal Information Section */}
          <PersonalInfo control={control} errors={errors} />

          {/* Business Information Section */}
          <BusinessInfo control={control} errors={errors} />

          {/* Business Address Section */}
          <BusinessAddress control={control} errors={errors} />

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="rounded-xl py-4 w-full items-center justify-center shadow-lg"
            style={{ backgroundColor: colors.primary.dark, opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-white font-semibold">Registrar Negocio</Text>
            )}
          </TouchableOpacity>
          <Pressable
            onPress={() => router.push("/(auth)")}
            className="rounded-xl py-3 border border-opacity-30 w-full items-center justify-center"
            style={{ borderColor: colors.primary.dark }}
          >
            <Text className="text-center font-medium" style={{ color: colors.primary.dark }}>
              Volver al inicio
            </Text>
          </Pressable>
        </SafeAreaView>
      </GradientBackground>
    </ScrollView>
  );
}
