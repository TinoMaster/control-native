import { SettingButton } from "components/ui/SettingButton";
import { useRouter } from "expo-router";
import React from "react";

export const ChangePasswordLinkButton = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/(tabs)/profile/change_password");
  };

  return (
    <SettingButton
      onPress={handlePress}
      icon="lock-closed-outline"
      title="Cambiar contraseña"
      accessibilityRole="button"
      accessibilityLabel="Cambiar contraseña"
      iconRight
    />
  );
};
