import { Text, TouchableOpacity, View } from "react-native";
import useColors from "hooks/useColors";
import { Ionicons } from "@expo/vector-icons";
import { BusinessModel } from "models/api";
import { useRouter } from "expo-router";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

interface Props {
  readonly business: BusinessModel;
}

export function UsersInfo({ business }: Props) {
  const defaultColors = useColors();
  const router = useRouter();

  const handleViewUsers = () => {
    router.push(`/business/my_businesses/${business.id}/users`);
  };

  return (
    <View
      style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }}
      className="m-4 p-4 rounded-xl shadow-sm"
    >
      <TouchableOpacity onPress={handleViewUsers} className="flex-row items-center mb-2">
        <Ionicons name="people-outline" size={24} color={defaultColors.primary} />
        <Text style={{ color: defaultColors.text }} className="text-lg font-semibold ml-2">
          Usuarios ({business?.users?.length ?? 0})
        </Text>
        <Ionicons name="chevron-forward" size={20} color={defaultColors.primary} className="ml-auto" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleViewUsers} className="mt-2 items-center py-2">
        <Text style={{ color: defaultColors.primary }} className="text-sm font-medium">
          Ver todos los usuarios
        </Text>
      </TouchableOpacity>
    </View>
  );
}


