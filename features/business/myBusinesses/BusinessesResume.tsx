import { Feather } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { Text, View } from "react-native";
import { useBusinessStore } from "store/business.store";

export function BusinessesResume() {
  const defaultColors = useColors();
  const { businessList } = useBusinessStore();
  return (
    <View
      className="rounded-lg p-4 mt-4"
      style={{ backgroundColor: defaultColors.background === "#F5F5F5" ? "#FFFFFF" : "#2A2A2A" }}
    >
      <Text className="text-lg font-semibold mb-3" style={{ color: defaultColors.text }}>
        Resumen
      </Text>

      <View className="flex-row justify-between mb-2">
        <View className="flex-row items-center">
          <Feather name="briefcase" size={16} color={defaultColors.primary} />
          <Text className="ml-2" style={{ color: defaultColors.text }}>
            Total de negocios
          </Text>
        </View>
        <Text className="font-semibold" style={{ color: defaultColors.text }}>
          {businessList.length}
        </Text>
      </View>

      <View className="flex-row justify-between mb-2">
        <View className="flex-row items-center">
          <Feather name="users" size={16} color={defaultColors.primary} />
          <Text className="ml-2" style={{ color: defaultColors.text }}>
            Total de empleados
          </Text>
        </View>
        <Text className="font-semibold" style={{ color: defaultColors.text }}>
          {businessList.reduce((total, business) => total + (business.users?.length ?? 0), 0)}
        </Text>
      </View>

      <View className="flex-row justify-between mb-2">
        <View className="flex-row items-center">
          <Feather name="tool" size={16} color={defaultColors.primary} />
          <Text className="ml-2" style={{ color: defaultColors.text }}>
            Cantidad de maquinas
          </Text>
        </View>
        <Text className="font-semibold" style={{ color: defaultColors.text }}>
          {businessList.reduce((total, business) => total + (business.machines?.length ?? 0), 0)}
        </Text>
      </View>
    </View>
  );
}
