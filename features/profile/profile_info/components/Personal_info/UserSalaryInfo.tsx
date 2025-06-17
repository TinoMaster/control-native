import { MyCard } from "components/ui/cards/MyCard";
import { InfoRow } from "components/ui/InfoRow";
import { formatCurrency, formatPercentToNumber } from "utilities/formatters";

interface UserSalaryInfoProps {
  readonly percentSalary?: number;
  readonly fixedSalary?: number;
}

export const UserSalaryInfo = ({ percentSalary, fixedSalary }: UserSalaryInfoProps) => {
  const hasSalaryInfo = percentSalary !== undefined || fixedSalary !== undefined;

  if (!hasSalaryInfo) return null;

  return (
    <MyCard title="Información Salarial">
      {percentSalary !== undefined && (
        <InfoRow label="Salario Variable (%)" value={`${formatPercentToNumber(percentSalary)}%`} />
      )}
      {fixedSalary !== undefined && (
        <InfoRow label="Salario Fijo ($)" value={`${formatCurrency(fixedSalary)}`} />
      )}
    </MyCard>
  );
};
