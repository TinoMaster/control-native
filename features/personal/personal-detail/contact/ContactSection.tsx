import { Ionicons } from "@expo/vector-icons";
import { MyCard } from "components/ui/MyCard";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { Text, View } from "react-native";

export const ContactSection = ({ employee }: { employee: EmployeeModel }) => {
  const defaultColors = useColors();
  return (
    <MyCard title="Contacto" iconTitle="id-card-outline">
      <View className="flex-row items-center mb-2">
        <Ionicons name="person-outline" size={18} color={defaultColors.textSecondary} />
        <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
          Email: {employee.user.email}
        </Text>
      </View>
      <View className="flex-row items-center mb-2">
        <Ionicons name="call-outline" size={18} color={defaultColors.textSecondary} />
        <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
          Teléfono: {employee.phone}
        </Text>
      </View>
    </MyCard>
  );
};
