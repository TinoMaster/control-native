import { Ionicons } from "@expo/vector-icons";
import { MyCard } from "components/ui/MyCard";
import { MyModal } from "components/ui/modals/myModal";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { useState } from "react";
import { Text, View } from "react-native";
import { FormEditSalary } from "./FormEditSalary";

interface SalarySectionProps {
  employee: EmployeeModel;
}

export const SalarySection = ({ employee }: SalarySectionProps) => {
  const defaultColors = useColors();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <MyCard
        title="Información Salarial"
        iconTitle="cash-outline"
        iconButton="pencil-outline"
        onPressIcon={() => setModalVisible(true)}
      >
        <View className="flex-row items-center mb-2">
          <Ionicons name="wallet-outline" size={18} color={defaultColors.textSecondary} />
          <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
            Salario fijo: ${employee.fixedSalary.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Ionicons name="trending-up-outline" size={18} color={defaultColors.textSecondary} />
          <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
            Comisión: {employee.percentSalary * 100}%
          </Text>
        </View>
      </MyCard>

      {/* Modal para editar la información salarial */}
      <MyModal isVisible={modalVisible} onClose={() => setModalVisible(false)} title="Editar Información Salarial">
        <FormEditSalary setModalVisible={setModalVisible} employee={employee} />
      </MyModal>
    </>
  );
};
