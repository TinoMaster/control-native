import { View } from "react-native";
import { Details } from "./_components/details";
import { Workers } from "./_components/workers";

export function Step1Details() {
  return (
    <View className="p-4 space-y-4">
      <Details />
      <Workers />
    </View>
  );
}
