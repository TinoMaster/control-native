import { MyCard } from "components/ui/cards/MyCard";
import { InfoRow } from "components/ui/InfoRow";
import { EmployeeModel } from "models/api/employee.model";
import { formatDate } from "utilities/helpers/date.utils";

interface Props {
  readonly employee: EmployeeModel;
}

export const UserPrincipalInfo = ({ employee }: Props) => {
  return (
    <MyCard title="Información Principal">
      <InfoRow label="Nombre" value={employee.user.name} />
      <InfoRow label="DNI" value={employee.dni} />
      <InfoRow label="Rol" value={employee.user.role.toString()} />
      <InfoRow
        label="Creado el"
        value={formatDate(new Date(employee.user.createdAt ?? new Date()))}
      />
    </MyCard>
  );
};
