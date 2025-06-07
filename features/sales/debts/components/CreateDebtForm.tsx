import { zodResolver } from "@hookform/resolvers/zod";
import { ContentWrapper } from "components/ContentWrapper";
import GenericInput from "components/forms/generic-input";
import { useDebts } from "hooks/api/useDebts";
import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import { EmployeeModel } from "models/api/employee.model";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "store/auth.store";
import { useBusinessStore } from "store/business.store";
import { formatNumericInput } from "utilities/helpers/globals.helpers";
import { z } from "zod";

const debtSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  total: z.number().min(0.01, "El total debe ser mayor a 0"),
  paid: z.number().min(0, "El pago no puede ser negativo")
});

type DebtFormData = z.infer<typeof debtSchema>;

export function CreateDebtForm() {
  const defaultColors = useColors();
  const { saveDebt, loadingSave } = useDebts();
  const employee = useAuthStore((state) => state.employee);
  const businessId = useBusinessStore((state) => state.businessId);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DebtFormData>({
    resolver: zodResolver(debtSchema),
    defaultValues: {
      name: "",
      description: "",
      total: 0,
      paid: 0
    }
  });

  const onSubmit = (data: DebtFormData) => {
    const newDebt: DebtModel = {
      ...data,
      business: businessId as number,
      employee: employee as EmployeeModel
    };

    saveDebt(newDebt);
    reset();
  };

  return (
    <ContentWrapper>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <GenericInput
            label="Nombre"
            placeholder="Nombre del deudor"
            keyboardType="default"
            watch={value}
            error={errors.name}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <GenericInput
            label="Descripción (opcional)"
            placeholder="Descripción de la deuda"
            keyboardType="default"
            watch={value}
            error={errors.description}
            onChangeText={onChange}
            multiline={true}
            numberOfLines={3}
          />
        )}
      />

      <Controller
        control={control}
        name="total"
        render={({ field: { onChange, value } }) => (
          <GenericInput
            label="Total de la deuda"
            placeholder="Monto total"
            keyboardType="decimal-pad"
            watch={value.toString()}
            error={errors.total}
            onChangeText={(text) => onChange(parseFloat(formatNumericInput(text)) || 0)}
          />
        )}
      />

      <Controller
        control={control}
        name="paid"
        render={({ field: { onChange, value } }) => (
          <GenericInput
            label="Monto pagado"
            placeholder="Monto pagado"
            keyboardType="decimal-pad"
            watch={value.toString()}
            error={errors.paid}
            onChangeText={(text) => onChange(parseFloat(formatNumericInput(text)) || 0)}
          />
        )}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={loadingSave}
        className="mt-4 p-3 rounded-lg"
        style={{ backgroundColor: defaultColors.primary }}
      >
        <Text className="text-center text-white font-semibold">Guardar Deuda</Text>
      </TouchableOpacity>
    </ContentWrapper>
  );
}
