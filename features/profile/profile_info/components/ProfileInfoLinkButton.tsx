import { SettingButton } from "components/ui/SettingButton";
import { useRouter } from "expo-router";
import React from "react";

export const ProfileInfoLinkButton = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/(tabs)/profile/personal_info");
  };

  return (
    <SettingButton
      onPress={handlePress}
      icon="person"
      title="Información Personal"
      accessibilityRole="button"
      accessibilityLabel="Ver información personal"
      iconRight
    />
  );
};
