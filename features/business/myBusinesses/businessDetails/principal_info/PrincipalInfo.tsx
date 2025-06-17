import { Ionicons } from "@expo/vector-icons";
import { MyCard } from "components/ui/cards/MyCard";
import { MiniIconButton } from "components/ui/MIniIconButton";
import { MyModal } from "components/ui/modals/myModal";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import colors from "styles/colors";
import { FormEditBusinessInfo } from "./FormEditBusinessInfo";

interface Props {
  readonly business: BusinessModel;
}

export function PrincipalInfo({ business }: Props) {
  const defaultColors = useColors();
  const [modalVisible, setModalVisible] = useState(false);

  const handlePhoneCall = () => {
    if (business.phone) {
      Linking.openURL(`tel:${business.phone}`);
    }
  };

  return (
    <>
      <MyCard header={false}>
        <View className="flex-row items-center mb-4 pt-4">
          <View className="w-[60px] h-[60px] rounded-full  shadow-sm p-2 justify-center items-center mr-4">
            <Ionicons name="business" size={30} color={colors.primary.light} />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center">
              <Text style={{ color: defaultColors.text }} className="text-2xl font-bold mb-1">
                {business.name}
              </Text>
              <MiniIconButton
                icon="pencil-outline"
                iconSize={16}
                onPress={() => setModalVisible(true)}
              />
            </View>
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
          <View className="px-3 py-1.5 rounded-2xl mr-2 mb-2 bg-amber-600">
            <Text className="text-white font-medium text-xs">
              {business.machines?.length ?? 0} máquinas
            </Text>
          </View>
          <View className="px-3 py-1.5 rounded-2xl mr-2 mb-2 bg-indigo-500">
            <Text className="text-white font-medium text-xs">
              {business.users?.length ?? 0} usuarios
            </Text>
          </View>
        </View>
      </MyCard>

      {/* Modal para editar la información del negocio */}
      <MyModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Editar Información del Negocio"
      >
        <FormEditBusinessInfo setModalVisible={setModalVisible} business={business} />
      </MyModal>
    </>
  );
}
