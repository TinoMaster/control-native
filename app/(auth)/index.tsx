import { zodResolver } from "@hookform/resolvers/zod";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { loginSchema, TLoginSchema, zLoginDefaultValues } from "models/zod/login.schema";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Image, Pressable, Text, TextInput, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authService } from "services/auth.service";
import { userService } from "services/user.service";
import { useAuthStore } from "store/auth.store";
import colors from "styles/colors";

export default function LoginScreen() {
  const [error, setError] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const colorScheme = useColorScheme() ?? "dark";

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
      if (!response) {
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
      setIsSubmitting(true);
      const response = await authService.login(data);

      if (response.status === 200 && response.data) {
        if (response.data.active) {
          await login(response.data.token, response.data.role, response.data.refreshToken);
          router.replace("/(tabs)");
        } else {
          const lastLogin = await userService.getLastLogin(data.email);
          console.log(lastLogin);
          if (lastLogin.status === 200 && lastLogin.data) {
            setError("Tu cuenta está inactiva. Por favor, contacta al administrador.");
          } else {
            setError("Tu cuenta está inactiva. Debe esperar a ser autorizado por el administrador.");
          }
        }
      } else {
        setError("Credenciales no validas");
      }
    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <BlurView
          intensity={80}
          tint={colorScheme === "dark" ? "dark" : "light"}
          className="rounded-3xl overflow-hidden w-full max-w-[500px] shadow-xl"
        >
          <View className="px-6 py-8">
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
                  <View className="mb-4">
                    <View
                      className={`flex-row border items-center rounded-xl p-3 ${
                        errors.email ? " border-red-500" : emailFocused ? "" : "border-gray-400 border-opacity-30"
                      }`}
                      style={emailFocused ? { borderColor: colors.primary.dark } : {}}
                    >
                      <View className="mr-3 p-2 rounded-full" style={{ backgroundColor: colors.primary.dark }}>
                        <Text className="text-white font-bold">@</Text>
                      </View>
                      <TextInput
                        className="flex-1 text-base outline-none"
                        style={{ color: colors.darkMode.text.dark }}
                        placeholder="Correo electrónico"
                        placeholderTextColor={colors.darkMode.textSecondary.dark}
                        value={value}
                        onChangeText={onChange}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        editable={!isCheckingUser && !isSubmitting}
                      />
                    </View>
                    {errors.email && <Text className="text-red-500 text-sm ml-2 mt-1">{errors.email.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-6">
                    <View
                      className={`flex-row border items-center rounded-xl p-3 ${
                        errors.password ? " border-red-500" : passwordFocused ? "" : "border-gray-400 border-opacity-30"
                      }`}
                      style={passwordFocused ? { borderColor: colors.primary.dark } : {}}
                    >
                      <View className="mr-3 p-2 rounded-full" style={{ backgroundColor: colors.primary.dark }}>
                        <Text className="text-white font-bold">🔒</Text>
                      </View>
                      <TextInput
                        className="flex-1 text-base outline-none"
                        style={{ color: colors.darkMode.text.dark }}
                        placeholder="Contraseña"
                        placeholderTextColor={colors.darkMode.textSecondary.dark}
                        value={value}
                        onChangeText={onChange}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        secureTextEntry={secureTextEntry}
                        editable={!isCheckingUser && !isSubmitting}
                      />
                      <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)} className="p-2">
                        <Text style={{ color: colors.primary.dark }}>{secureTextEntry ? "👁️" : "🔒"}</Text>
                      </Pressable>
                    </View>
                    {errors.password && (
                      <Text className="text-red-500 text-sm ml-2 mt-1">{errors.password.message}</Text>
                    )}
                  </View>
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
        </BlurView>

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
