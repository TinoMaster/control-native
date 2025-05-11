import { Ionicons } from "@expo/vector-icons";
import { MyCard } from "components/ui/MyCard";
import { MyModal } from "components/ui/modals/myModal";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { useState } from "react";
import { Text, View } from "react-native";
import { FormEditContact } from "./FormEditContact";

export const ContactSection = ({ employee }: { employee: EmployeeModel }) => {
  const defaultColors = useColors();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <MyCard
        title="Contacto"
        iconTitle="id-card-outline"
        iconButton="pencil-outline"
        onPressIcon={() => setModalVisible(true)}
      >
        <View className="flex-row items-center mb-2">
          <Ionicons name="mail-outline" size={18} color={defaultColors.textSecondary} />
          <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
            Email: {employee.user.email}
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Ionicons name="call-outline" size={18} color={defaultColors.textSecondary} />
          <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
            Teléfono: {employee.phone || "No especificado"}
          </Text>
        </View>
      </MyCard>

      {/* Modal para editar la información de contacto */}
      <MyModal isVisible={modalVisible} onClose={() => setModalVisible(false)} title="Editar Información de Contacto">
        <FormEditContact setModalVisible={setModalVisible} employee={employee} />
      </MyModal>
    </>
  );
};
