import { Stack } from "expo-router";
import { View } from "react-native";

export default function ProfileLayout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </View>
  );
}
