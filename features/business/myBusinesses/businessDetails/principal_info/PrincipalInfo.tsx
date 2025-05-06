import { Ionicons } from "@expo/vector-icons";
import { MyCard } from "components/ui/MyCard";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { Linking, Text, TouchableOpacity, View } from "react-native";

interface Props {
  readonly business: BusinessModel;
}

export function PrincipalInfo({ business }: Props) {
  const defaultColors = useColors();

  const handlePhoneCall = () => {
    if (business.phone) {
      Linking.openURL(`tel:${business.phone}`);
    }
  };

  return (
    <MyCard header={false}>
      <View className="flex-row items-center mb-4 pt-4">
        <View className="w-[60px] h-[60px] rounded-full bg-slate-900/15 shadow-sm p-2 justify-center items-center mr-4">
          <Ionicons name="business" size={30} color={defaultColors.primary} />
        </View>
        <View className="flex-1">
          <Text style={{ color: defaultColors.text }} className="text-2xl font-bold mb-1">
            {business.name}
          </Text>
          <TouchableOpacity onPress={handlePhoneCall} className="flex-row items-center">
            <Ionicons name="call-outline" size={16} color={defaultColors.primary} />
            <Text style={{ color: defaultColors.text }} className="ml-1.5 text-sm">
              {business.phone}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {Boolean(business.description) && (
        <Text style={{ color: defaultColors.textSecondary }} className="text-base leading-6 mb-4">
          {business.description}
        </Text>
      )}

      {/* Etiquetas de estado */}
      <View className="flex-row flex-wrap mt-2">
        {business.machines && business.machines.length > 0 && (
          <View className="px-3 py-1.5 rounded-2xl mr-2 mb-2 bg-amber-600">
            <Text className="text-white font-medium text-xs">{business.machines.length} máquinas</Text>
          </View>
        )}
        {business.users && business.users.length > 0 && (
          <View className="px-3 py-1.5 rounded-2xl mr-2 mb-2 bg-indigo-500">
            <Text className="text-white font-medium text-xs">{business.users.length} usuarios</Text>
          </View>
        )}
      </View>
    </MyCard>
  );
}
