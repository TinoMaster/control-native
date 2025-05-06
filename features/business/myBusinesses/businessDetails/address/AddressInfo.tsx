import { Ionicons } from "@expo/vector-icons";
import { MyModal } from "components/ui/modals/myModal";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import { FormEditAddress } from "./FormEditAddress";

interface Props {
  readonly business: BusinessModel;
}

export function AddressInfo({ business }: Props) {
  const defaultColors = useColors();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }}
      className="m-4 p-4 rounded-xl shadow-sm"
    >
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={24} color={defaultColors.primary} />
          <Text style={{ color: defaultColors.text }} className="text-lg font-semibold ml-2">
            Dirección
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="p-2 rounded-full bg-gray-200/30 dark:bg-gray-700/30"
        >
          <Ionicons name="pencil" size={16} color={defaultColors.primary} />
        </TouchableOpacity>
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

      {/* Modal para editar la dirección */}
      <MyModal isVisible={modalVisible} onClose={() => setModalVisible(false)} title="Editar Dirección">
        <FormEditAddress setModalVisible={setModalVisible} business={business} />
      </MyModal>
    </View>
  );
}
