import { MyCard } from "components/ui/MyCard";
import { Text } from "react-native";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";

export const AddressSection = ({ employee }: { employee: EmployeeModel }) => {
  const defaultColors = useColors();

  const formatAddress = () => {
    const address = employee.address;
    if (!address) return "No disponible";
    return `${address.street} ${address.number}, ${address.municipality}, ${address.city}, ${address.zip}`;
  };

  return (
    <MyCard title="Dirección" iconTitle="location-outline">
      <Text className="text-sm ml-2 leading-5" style={{ color: defaultColors.textSecondary }}>
        {formatAddress()}
      </Text>
    </MyCard>
  );
};
