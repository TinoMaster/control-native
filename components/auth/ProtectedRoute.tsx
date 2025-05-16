import LoadingPage from "components/ui/loaders/LoadingPage";
import { Redirect } from "expo-router";
import { ERole } from "models/api";
import { useAuthStore } from "store/auth.store";

interface ProtectedRouteProps {
  readonly children: React.ReactNode;
  readonly roles?: ERole[];
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { role, isLoading, loadingUser, isLoggedIn } = useAuthStore();

  if (isLoading || loadingUser) {
    return <LoadingPage />;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)" />;
  }

  if (roles && !roles.includes(role)) {
    return <Redirect href="/(tabs)" />;
  }

  return <>{children}</>;
}
