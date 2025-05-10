import { Ionicons } from "@expo/vector-icons";
import { MyCard } from "components/ui/MyCard";
import { MyModal } from "components/ui/modals/myModal";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { useState } from "react";
import { Text, View } from "react-native";
import { FormEditPrincipalInfo } from "./FormEditPrincipalInfo";

export const PrincipalInfo = ({ employee }: { employee: EmployeeModel }) => {
  const defaultColors = useColors();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <MyCard
        title="Información General"
        iconTitle="person-outline"
        iconButton="pencil-outline"
        onPressIcon={() => setModalVisible(true)}
      >
        <Text className="text-2xl font-bold mb-2" style={{ color: defaultColors.text }}>
          {employee.user.name}
        </Text>
        <View className="flex-row items-center mb-2">
          <Ionicons name="briefcase-outline" size={18} color={defaultColors.textSecondary} />
          <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
            Rol: {employee.user.role}
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Ionicons name="person-outline" size={18} color={defaultColors.textSecondary} />
          <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
            DNI: {employee.dni}
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Ionicons
            name={employee.user.active ? "checkmark-circle-outline" : "close-circle-outline"}
            size={18}
            color={employee.user.active ? "green" : "red"}
          />
          <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
            {employee.user.active ? "Activo" : "Inactivo"}
          </Text>
        </View>
      </MyCard>

      {/* Modal para editar la información principal */}
      <MyModal isVisible={modalVisible} onClose={() => setModalVisible(false)} title="Editar Información General">
        <FormEditPrincipalInfo setModalVisible={setModalVisible} employee={employee} />
      </MyModal>
    </>
  );
};
