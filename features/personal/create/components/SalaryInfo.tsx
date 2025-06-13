import { CustomInput } from "components/ui/inputs/CustomInput";
import { MyCard } from "components/ui/MyCard";
import { Controller } from "react-hook-form";

interface Props {
  readonly control: any;
  readonly errors: any;
}

export const SalaryInfo = ({ control, errors }: Props) => {
  return (
    <MyCard title="Información de Salario">
      <Controller
        control={control}
        name="fixedSalary"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Salario Fijo (Opcional)"
            placeholder="0.00"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            error={errors.fixedSalary?.message}
          />
        )}
      />

      {/* Percent Salary */}
      <Controller
        control={control}
        name="percentSalary"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Salario Porcentaje % (Opcional)"
            placeholder="0"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            error={errors.percentSalary?.message}
          />
        )}
      />
    </MyCard>
  );
};
