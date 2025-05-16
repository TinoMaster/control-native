import { Redirect } from "expo-router";
import { ERole } from "models/api";
import { useAuthStore } from "store/auth.store";

export default function Index() {
  const { role } = useAuthStore();

  const privateContainerToRender = () => {
    if (role === ERole.SUPERADMIN) {
      return <Redirect href="/(admin)" />;
    } else {
      return <Redirect href="/(tabs)" />;
    }
  };

  return privateContainerToRender();
}
