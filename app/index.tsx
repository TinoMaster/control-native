import { Redirect } from "expo-router";
import { ERole } from "models/api";
import { Text, View } from "react-native";
import { useAuthStore } from "store/auth.store";

export default function Index() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const loadingUser = useAuthStore((state) => state.loadingUser);
  const role = useAuthStore((state) => state.role);

  if (loadingUser) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Text className="text-gray-800 dark:text-gray-100">Cargando...</Text>
      </View>
    );
  }

  const privateContainerToRender = () => {
    if (role === ERole.SUPERADMIN) {
      return <Redirect href="/(admin)" />;
    } else {
      return <Redirect href="/(tabs)" />;
    }
  };

  return isLoggedIn ? privateContainerToRender() : <Redirect href="/(auth)" />;
}
