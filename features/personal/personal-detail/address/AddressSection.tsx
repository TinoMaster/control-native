import { Ionicons } from "@expo/vector-icons";
import { MyCard } from "components/ui/cards/MyCard";
import { MyModal } from "components/ui/modals/myModal";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { useState } from "react";
import { Text, View } from "react-native";
import { FormEditAddress } from "./FormEditAddress";

export const AddressSection = ({ employee }: { employee: EmployeeModel }) => {
  const defaultColors = useColors();
  const [modalVisible, setModalVisible] = useState(false);

  // Verificar si la dirección existe
  const hasAddress = Boolean(employee.address);
  const address = employee.address || {
    street: "",
    number: "",
    municipality: "",
    city: "",
    zip: ""
  };

  return (
    <>
      <MyCard
        title="Dirección"
        iconTitle="location-outline"
        iconButton="pencil-outline"
        onPressIcon={() => setModalVisible(true)}
      >
        {!hasAddress ? (
          <View className="flex-row items-center">
            <Ionicons name="alert-circle-outline" size={18} color={defaultColors.textSecondary} />
            <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
              No disponible
            </Text>
          </View>
        ) : (
          <>
            <View className="flex-row items-center mb-2">
              <Ionicons name="home-outline" size={18} color={defaultColors.textSecondary} />
              <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
                Calle: {address.street} {address.number}
              </Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="business-outline" size={18} color={defaultColors.textSecondary} />
              <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
                Municipio: {address.municipality}
              </Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="location-outline" size={18} color={defaultColors.textSecondary} />
              <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
                Ciudad: {address.city}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={18} color={defaultColors.textSecondary} />
              <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
                Código Postal: {address.zip}
              </Text>
            </View>
          </>
        )}
      </MyCard>

      {/* Modal para editar la dirección */}
      <MyModal isVisible={modalVisible} onClose={() => setModalVisible(false)} title="Editar Dirección">
        <FormEditAddress setModalVisible={setModalVisible} employee={employee} />
      </MyModal>
    </>
  );
};
