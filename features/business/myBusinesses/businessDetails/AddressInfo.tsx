import { Ionicons } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { Text, View } from "react-native";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

interface Props {
  readonly business: BusinessModel;
}

export function AddressInfo({ business }: Props) {
  const defaultColors = useColors();

  return (
    <View
      style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }}
      className="m-4 p-4 rounded-xl shadow-sm"
    >
      <View className="flex-row items-center mb-4">
        <Ionicons name="location-outline" size={24} color={defaultColors.primary} />
        <Text style={{ color: defaultColors.text }} className="text-lg font-semibold ml-2">
          Dirección
        </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text style={{ color: defaultColors.text }} className="text-base mb-1">
            {business.address.street} {business.address.number}
          </Text>
          <Text style={{ color: defaultColors.textSecondary }} className="text-base mb-1">
            {business.address.city}, {business.address.municipality}
          </Text>
          <Text style={{ color: defaultColors.textSecondary }} className="text-base">
            CP: {business.address.zip}
          </Text>
        </View>
      </View>
    </View>
  );
}
