import { Text, View } from "react-native";
import { useBusinessStore } from "store/business.store";

export default function Details() {
  const business = useBusinessStore((state) => state.business);
  const { machines } = business;

  return (
    <View>
      <Text>Details</Text>
    </View>
  );
}
