import { CustomInput } from "components/ui/inputs/CustomInput";
import { MyCard } from "components/ui/cards/MyCard";
import { Controller } from "react-hook-form";

interface Props {
  readonly control: any;
  readonly errors: any;
}

export const PasswordSection = ({ control, errors }: Props) => {
  return (
    <MyCard title="Sección de Contraseña" header={false}>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Contraseña"
            placeholder="Ingrese la contraseña"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />

      {/* Confirm Password */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Confirmar Contraseña"
            placeholder="Confirme la contraseña"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={errors.confirmPassword?.message}
          />
        )}
      />
    </MyCard>
  );
};
