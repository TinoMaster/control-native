import { Ionicons } from "@expo/vector-icons";
import { MyCard } from "components/ui/cards/MyCard";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { Text, View } from "react-native";

export const BusinessesSection = ({ employee }: { employee: EmployeeModel }) => {
  const defaultColors = useColors();
  return (
    <MyCard title="Negocios Asignados" iconTitle="business-outline">
      {employee.user.businesses && employee.user.businesses.length > 0 ? (
        employee.user.businesses.map((business) => (
          <View key={business.id} className="flex-row items-start mb-1.5">
            <Ionicons name="ellipse" size={8} color={defaultColors.textSecondary} className="mr-2 mt-1.5" />
            <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
              {business.name}
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
          No hay negocios asignados
        </Text>
      )}
    </MyCard>
  );
};
