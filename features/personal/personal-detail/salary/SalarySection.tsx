import { Ionicons } from "@expo/vector-icons";
import { MyCard } from "components/ui/MyCard";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { Text, View } from "react-native";

interface SalarySectionProps {
  employee: EmployeeModel;
}

export const SalarySection = ({ employee }: SalarySectionProps) => {
  const defaultColors = useColors();
  return (
    <MyCard title="Información Salarial" iconTitle="cash-outline">
      <View className="flex-row items-center mb-2">
        <Ionicons name="wallet-outline" size={18} color={defaultColors.textSecondary} />
        <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
          Salario fijo: ${employee.fixedSalary.toFixed(2)}
        </Text>
      </View>
      <View className="flex-row items-center mb-2">
        <Ionicons name="trending-up-outline" size={18} color={defaultColors.textSecondary} />
        <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
          Comisión: {employee.percentSalary}%
        </Text>
      </View>
    </MyCard>
  );
};
