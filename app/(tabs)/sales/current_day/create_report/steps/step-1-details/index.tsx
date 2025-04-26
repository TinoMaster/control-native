import { View } from "react-native";
import Details from "./_components/details";
import Workers from "./_components/workers";

export default function Step1Details() {
  return (
    <View className="space-y-4">
      <Details />
      <Workers />
    </View>
  );
}
