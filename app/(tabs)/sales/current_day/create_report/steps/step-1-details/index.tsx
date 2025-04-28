import { Details } from "features/sales/components/step1";
import { Workers } from "features/sales/components/step1/workers";
import { View } from "react-native";

export default function Step1Details() {
  return (
    <View style={{gap: 10, paddingBottom: 20}} className="flex-1">
      <Details />
      <Workers />
    </View>
  );
}
