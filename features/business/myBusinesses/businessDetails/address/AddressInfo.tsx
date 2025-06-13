import { MyModal } from "components/ui/modals/myModal";
import { MyCard } from "components/ui/cards/MyCard";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { useState } from "react";
import { Text, View } from "react-native";
import { FormEditAddress } from "./FormEditAddress";

interface Props {
  readonly business: BusinessModel;
}

export function AddressInfo({ business }: Props) {
  const defaultColors = useColors();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <MyCard
        title="Dirección"
        iconTitle="location-outline"
        iconButton="pencil"
        onPressIcon={() => setModalVisible(true)}
      >
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
      </MyCard>

      {/* Modal para editar la dirección */}
      <MyModal isVisible={modalVisible} onClose={() => setModalVisible(false)} title="Editar Dirección">
        <FormEditAddress setModalVisible={setModalVisible} business={business} />
      </MyModal>
    </>
  );
}
