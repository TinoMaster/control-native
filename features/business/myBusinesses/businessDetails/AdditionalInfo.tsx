import { Ionicons } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { Text, View } from "react-native";
import { formatDate } from "utilities/formatters";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

interface Props {
  readonly business: BusinessModel;
}

export function AdditionalInfo({ business }: Props) {
  const defaultColors = useColors();

  return (
    <View
      style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }}
      className="m-4 p-4 rounded-xl shadow-sm"
    >
      <View className="flex-row items-center mb-2">
        <Ionicons name="information-circle-outline" size={24} color={defaultColors.primary} />
        <Text style={{ color: defaultColors.text }} className="text-lg font-semibold ml-2">
          Información Adicional
        </Text>
      </View>

      {business.createdAt && (
        <Text style={{ color: defaultColors.textSecondary }} className="text-base mb-2">
          Creado: {formatDate(new Date(business.createdAt))}
        </Text>
      )}

      {business.updatedAt && (
        <Text style={{ color: defaultColors.textSecondary }} className="text-base mb-2">
          Última actualización: {formatDate(new Date(business.updatedAt))}
        </Text>
      )}
    </View>
  );
}
