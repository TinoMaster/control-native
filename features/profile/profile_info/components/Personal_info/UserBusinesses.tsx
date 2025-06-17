import { MyCard } from "components/ui/cards/MyCard";
import { InfoRow } from "components/ui/InfoRow";
import { EmployeeModel } from "models/api/employee.model";
import { ERole } from "models/api/roles.model";
import { Text } from "react-native";

interface Props {
  readonly employee: EmployeeModel;
}

export function UserBusinesses({ employee }: Props) {
  const { user } = employee;
  const isOwner = user.role === ERole.OWNER;
  const businesses = isOwner ? user.businessesOwned : user.businesses;
  const title = isOwner ? "Negocios Propios" : "Negocios Afiliados";

  if (!businesses || businesses.length === 0) {
    return (
      <MyCard title={title}>
        <Text className="text-sm text-gray-500 dark:text-gray-400 italic">
          No hay negocios para mostrar.
        </Text>
      </MyCard>
    );
  }

  return (
    <MyCard title={title}>
      {businesses.map((business) => (
        <InfoRow
          key={business.id}
          label={business.name}
          value={`${business.address.street}, ${business.address.city}`}
        />
      ))}
    </MyCard>
  );
}
