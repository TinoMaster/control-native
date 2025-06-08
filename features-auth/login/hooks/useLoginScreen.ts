import { useRouter } from "expo-router";
import { TLoginSchema } from "features-auth/login/schemas/login.schema";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { authService } from "services/auth.service";
import { userService } from "services/user.service";
import { useAuthStore } from "store/auth.store";

export const useLoginScreen = () => {
  const [error, setError] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const login = useAuthStore((state) => state.login);

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

  return {
    error,
    isCheckingUser,
    isSubmitting,
    onSubmit
  };
};
