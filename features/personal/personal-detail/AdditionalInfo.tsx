import { MyCard } from "components/ui/MyCard";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { Text } from "react-native";

export const AdditionalInfo = ({ employee }: { employee: EmployeeModel }) => {
  const defaultColors = useColors();
  return (
    <MyCard title="Información Adicional" iconTitle="information-circle-outline">
      {employee.user.createdAt && (
        <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
          Creado: {new Date(employee.user.createdAt).toLocaleDateString()}
        </Text>
      )}
      {employee.user.updatedAt && (
        <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
          Última actualización: {new Date(employee.user.updatedAt).toLocaleDateString()}
        </Text>
      )}
    </MyCard>
  );
};
