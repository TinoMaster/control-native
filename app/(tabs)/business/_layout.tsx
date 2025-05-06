import { Stack } from "expo-router";
import { View } from "react-native";

export default function BusinessLayout() {
  return (
    <View className="flex-1">
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false
          }}
        />
      </View>
    </View>
  );
}
