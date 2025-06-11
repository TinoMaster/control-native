import { zodResolver } from "@hookform/resolvers/zod";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { GlassCard } from "components/ui/cards/GlassCard";
import { CustomInput } from "components/ui/inputs/CustomInput";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLoginScreen } from "features-auth/login/hooks/useLoginScreen";
import { loginSchema, TLoginSchema, zLoginDefaultValues } from "features-auth/login/schemas/login.schema";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "styles/colors";

export default function LoginScreen() {
  const { isCheckingUser, error, onSubmit, isSubmitting } = useLoginScreen();
  const colorScheme = useColorScheme() ?? "dark";
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: zLoginDefaultValues
  });

  if (isCheckingUser) {
    return <LoadingPage />;
  }

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <GradientBackground
        variant="primary"
        intensity="medium"
        style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}
      >
        {/* Logo Section */}
        <View className="items-center mb-8">
          <Image
            source={require("../../assets/images/logo_png.png")}
            className="rounded-full shadow-xl"
            resizeMode="contain"
            style={{ width: 110, height: 110 }}
          />
          <Text className="text-3xl font-bold text-center" style={{ color: colors.darkMode.text.light }}>
            Control
          </Text>
        </View>

        {/* Main Content with Blur */}
        <GlassCard>
          <Image
            source={require("../../assets/images/logo_png.png")}
            className="rounded-full shadow-xl"
            resizeMode="contain"
            style={{ width: 110, height: 110, position: "absolute", top: -55, opacity: 0.4 }}
          />
          <View className="py-8">
            <Text className="text-2xl font-bold text-center mb-1" style={{ color: colors.darkMode.text.light }}>
              Iniciar Sesión
            </Text>
            <Text className="text-base text-center mb-6" style={{ color: colors.darkMode.textSecondary.light }}>
              Ingresa tus credenciales para continuar
            </Text>

            {error ? (
              <View className="mb-4 p-3 rounded-lg bg-opacity-20 bg-red-500">
                <Text className="text-red-500 text-center">{error}</Text>
              </View>
            ) : null}

            <View className="w-full max-w-md self-center">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    placeholder="Correo Electrónico"
                    icon="@"
                    value={value}
                    onChangeText={onChange}
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    placeholder="Contraseña"
                    icon="🔒"
                    value={value}
                    isPassword
                    onChangeText={onChange}
                    error={errors.password?.message}
                  />
                )}
              />

              <Pressable
                onPress={handleSubmit(onSubmit)}
                disabled={isCheckingUser || isSubmitting}
                className="rounded-xl py-4 mb-4"
                style={{ backgroundColor: colors.primary.dark, opacity: isCheckingUser || isSubmitting ? 0.7 : 1 }}
              >
                <Text className="text-white text-center font-bold">
                  {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/(auth)/business")}
                className="rounded-xl py-3 border border-opacity-30"
                style={{ borderColor: colors.primary.dark }}
              >
                <Text className="text-center font-medium" style={{ color: colors.primary.dark }}>
                  Registrar Nuevo Negocio
                </Text>
              </Pressable>
            </View>
          </View>
        </GlassCard>

        {/* Footer */}
        <View className="mt-8 items-center">
          <Text className="text-xs" style={{ color: colors.darkMode.textSecondary.dark }}>
            © 2025 Control Native
          </Text>
        </View>
      </GradientBackground>
    </SafeAreaView>
  );
}

// Styles are now handled by TailwindCSS/NativeWind
