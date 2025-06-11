import { zodResolver } from "@hookform/resolvers/zod";
import { ContentWrapper } from "components/ContentWrapper";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { useDebts } from "hooks/api/useDebts";
import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import { EmployeeModel } from "models/api/employee.model";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "store/auth.store";
import { useBusinessStore } from "store/business.store";
import { formatNumericInput } from "utilities/helpers/globals.helpers";
import { DebtFormData, debtSchema } from "../schema/createForm.schema";

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
          <CustomInput
            whiteBackground
            label="Nombre"
            value={value}
            placeholder="Nombre del deudor"
            keyboardType="default"
            error={errors.name?.message}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <CustomInput
            whiteBackground
            label="Descripción (opcional)"
            placeholder="Descripción de la deuda"
            keyboardType="default"
            value={value}
            error={errors.description?.message}
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
          <CustomInput
            whiteBackground
            label="Total de la deuda"
            placeholder="Monto total"
            keyboardType="decimal-pad"
            value={value.toString()}
            error={errors.total?.message}
            onChangeText={(text) => onChange(parseFloat(formatNumericInput(text)) || 0)}
          />
        )}
      />

      <Controller
        control={control}
        name="paid"
        render={({ field: { onChange, value } }) => (
          <CustomInput
            whiteBackground
            label="Monto pagado"
            placeholder="Monto pagado"
            keyboardType="decimal-pad"
            value={value.toString()}
            error={errors.paid?.message}
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
