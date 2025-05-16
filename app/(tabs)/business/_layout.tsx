import ProtectedRoute from "components/auth/ProtectedRoute";
import { Stack } from "expo-router";
import { ERole } from "models/api";
import { View } from "react-native";

export default function BusinessLayout() {
  return (
    <ProtectedRoute roles={[ERole.OWNER, ERole.ADMIN]}>
      <View className="flex-1">
        <View className="flex-1">
          <Stack
            screenOptions={{
              headerShown: false
            }}
          />
        </View>
      </View>
    </ProtectedRoute>
  );
}
