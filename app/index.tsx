import { Redirect } from "expo-router";
import { ERole } from "models/api";
import { useAuthStore } from "store/auth.store";

export default function Index() {
  const storeRole = useAuthStore((state) => state.role);

  const privateContainerToRender = () => {
    if (storeRole === ERole.SUPERADMIN) {
      return <Redirect href="/(admin)" />;
    } else {
      return <Redirect href="/(tabs)" />;
    }
  };

  return privateContainerToRender();
}
